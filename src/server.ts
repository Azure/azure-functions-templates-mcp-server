import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Templates are packaged with this server
// When running from dist/, templates folder is at package root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATES_ROOT = path.resolve(__dirname, "..", "..", "templates");

const server = new McpServer({
  name: "azure-functions-templates",
  version: "1.0.0",
});

// Valid languages and their templates (embedded as part of package)
const VALID_LANGUAGES = ["csharp", "java", "python", "typescript"] as const;

const VALID_TEMPLATES: Record<string, string[]> = {
  csharp: [
    "BlobTrigger-CSharp-Isolated", "CosmosDbTrigger-CSharp-Isolated", "DaprPublishOutputBinding-CSharp-Isolated",
    "DaprServiceInvocationTrigger-CSharp-Isolated", "DaprTopicTrigger-CSharp-Isolated", "DurableFunctionsEntityClass-CSharp-Isolated",
    "DurableFunctionsEntityFunction-CSharp-Isolated", "DurableFunctionsOrchestration-CSharp-Isolated", "EventGridBlobTrigger-CSharp-Isolated",
    "EventGridTrigger-CSharp-Isolated", "EventHubTrigger-CSharp-Isolated", "HttpTrigger-CSharp-Isolated",
    "KustoInputBinding-CSharp-Isolated", "KustoOutputBinding-CSharp-Isolated", "MCPToolTrigger-CSharp-Isolated",
    "MySqlInputBinding-CSharp-Isolated", "MySqlOutputBinding-CSharp-Isolated", "MySqlTrigger-CSharp-Isolated",
    "QueueTrigger-CSharp-Isolated", "RabbitMQTrigger-CSharp-Isolated", "ServiceBusQueueTrigger-CSharp-Isolated",
    "ServiceBusTopicTrigger-CSharp-Isolated", "SignalRConnectionInfoHttpTrigger-CSharp-Isolated", "SqlInputBinding-CSharp-Isolated",
    "SqlTrigger-CSharp-Isolated", "TimerTrigger-CSharp-Isolated"
  ],
  java: [
    "BlobTrigger-Java", "DurableFunctions-Java", "EventGridTrigger-Java", "EventHubTrigger-Java",
    "HttpTrigger-Java", "MCPToolTrigger-Java", "QueueTrigger-Java", "ServiceBusQueueTrigger-Java",
    "ServiceBusTopicTrigger-Java", "TimerTrigger-Java"
  ],
  python: [
    "BlobInputBinding", "BlobOutputBinding", "BlobTrigger", "CosmosDBTrigger",
    "EventHubTrigger", "HttpTrigger", "McpTrigger", "QueueTrigger", "TimerTrigger"
  ],
  typescript: [
    "AuthenticationEventsTrigger-TypeScript", "BlobTrigger-TypeScript", "CosmosDbTrigger-TypeScript",
    "DurableFunctionsActivity-TypeScript", "DurableFunctionsEntity-TypeScript", "DurableFunctionsHttpStart-TypeScript",
    "DurableFunctionsOrchestrator-TypeScript", "EventGridBlobTrigger-TypeScript", "EventGridTrigger-TypeScript", 
    "EventHubTrigger-TypeScript", "HttpTrigger-TypeScript", "IoTHubTrigger-TypeScript", "KafkaOutput-TypeScript",
    "MCPToolTrigger-TypeScript", "MySqlInputBinding-Typescript", "MySqlOutputBinding-Typescript", "MySqlTrigger-Typescript",
    "QueueTrigger-TypeScript", "RabbitMQTrigger-TypeScript", "SendGrid-TypeScript", "ServiceBusQueueTrigger-TypeScript",
    "ServiceBusTopicTrigger-TypeScript", "SignalRConnectionInfoHttpTrigger-TypeScript", "SqlInputBinding-Typescript",
    "SqlOutputBinding-Typescript", "SqlTrigger-Typescript", "TimerTrigger-TypeScript"
  ]
};

async function exists(p: string): Promise<boolean> {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

async function listFilesRecursive(dir: string): Promise<string[]> {
  const results: string[] = [];
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const inner = await listFilesRecursive(full);
        results.push(...inner);
      } else if (entry.isFile()) {
        results.push(full);
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }
  return results;
}

// Single comprehensive tool for Azure Functions templates
server.registerTool(
  "get_azure_functions_templates",
  {
    title: "Get Azure Functions Template",
    description: `Retrieve a complete Azure Functions template with all its files for rapid development and deployment. 
    Clients can tweak the business logic as needed. Mix and Match triggers, bindings as needed.

This tool provides ready-to-use Azure Functions templates across multiple programming languages and trigger types. Each template includes:

File Patterns by Language:
- Python: function_app.py, host.json, local.settings.json, requirements.txt (Azure Functions v2 programming model)
- C#: .cs files, .template.config/template.json (minimal configuration files)
- Java: pom.xml, host.json, src/ directories (includes Maven configuration)
- TypeScript: function.json, index.ts, metadata.json (Node.js based functions)

Perfect for:
- Bootstrapping new Azure Functions projects
- Learning Azure Functions patterns and best practices  
- Creating production-ready serverless applications
- Exploring different trigger types and bindings
- Rapid prototyping and development

The templates cover major Azure services including HTTP APIs, blob storage, cosmos DB, event processing, durable functions, AI/ML integrations, and more.`,
    inputSchema: {
      language: z.enum(VALID_LANGUAGES).describe(`Programming language for the Azure Functions template. Valid values: ${VALID_LANGUAGES.join(", ")}`),
      template: z.string().describe(`Template name. Valid templates vary by language:
      
C# (.NET Isolated): ${VALID_TEMPLATES.csharp.join(", ")}

Java: ${VALID_TEMPLATES.java.join(", ")}

Python: ${VALID_TEMPLATES.python.join(", ")}

TypeScript: ${VALID_TEMPLATES.typescript.join(", ")}`),
      filePath: z.string().optional().describe("Optional: specific file path within the template to retrieve (e.g., 'function_app.py', 'host.json', 'requirements.txt'). If omitted, returns all files in the template as a structured listing.")
    },
  },
  async (args: { language: string; template: string; filePath?: string }) => {
    const { language, template, filePath } = args;
    
    // Validate language
    if (!VALID_LANGUAGES.includes(language as any)) {
      return { 
        content: [{ 
          type: "text", 
          text: `Invalid language: ${language}. Valid languages are: ${VALID_LANGUAGES.join(", ")}` 
        }], 
        isError: true 
      };
    }
    
    // Validate template for the given language
    const validTemplatesForLang = VALID_TEMPLATES[language];
    if (!validTemplatesForLang.includes(template)) {
      return { 
        content: [{ 
          type: "text", 
          text: `Invalid template '${template}' for language '${language}'. Valid templates for ${language} are: ${validTemplatesForLang.join(", ")}` 
        }], 
        isError: true 
      };
    }

    const templateDir = path.join(TEMPLATES_ROOT, language, template);
    if (!(await exists(templateDir))) {
      return { 
        content: [{ 
          type: "text", 
          text: `Template directory not found: ${language}/${template}` 
        }], 
        isError: true 
      };
    }

    // If specific file requested, return that file
    if (filePath) {
      const fullPath = path.resolve(templateDir, filePath);
      
      // Security: prevent path traversal
      if (!fullPath.startsWith(path.resolve(templateDir) + path.sep) && path.resolve(templateDir) !== fullPath) {
        return { 
          content: [{ 
            type: "text", 
            text: "Invalid filePath: path traversal detected" 
          }], 
          isError: true 
        };
      }
      
      if (!(await exists(fullPath))) {
        return { 
          content: [{ 
            type: "text", 
            text: `File not found: ${filePath}` 
          }], 
          isError: true 
        };
      }
      
      const stat = await fs.lstat(fullPath);
      if (!stat.isFile()) {
        return { 
          content: [{ 
            type: "text", 
            text: `Path is not a file: ${filePath}` 
          }], 
          isError: true 
        };
      }
      
      const content = await fs.readFile(fullPath, "utf8");
      return { 
        content: [{ 
          type: "text", 
          text: `=== ${filePath} ===\n${content}` 
        }] 
      };
    }

    // Return all files in the template
    const allFiles = await listFilesRecursive(templateDir);
    const relativeFiles = allFiles.map(f => path.relative(templateDir, f));
    
    let result = `=== Azure Functions Template: ${language}/${template} ===\n\n`;
    result += `Files in this template:\n${relativeFiles.join("\n")}\n\n`;
    
    // Include content of key files based on language patterns and subfolder structures
    let keyFiles: string[] = [];
    
    switch (language) {
      case "python":
        keyFiles = ["function_app.py", "host.json", "local.settings.json", "requirements.txt"];
        break;
      case "csharp":
        keyFiles = [".template.config/template.json", ".template.config/vs-2017.3.host.json", "host.json", "local.settings.json"];
        // Also include .cs files
        const csFiles = relativeFiles.filter(f => f.endsWith(".cs"));
        keyFiles.push(...csFiles.slice(0, 2)); // Include up to 2 .cs files
        break;
      case "java":
        keyFiles = ["pom.xml", "host.json", "local.settings.json"];
        // Include Java source files from src/main/java subdirectory
        const javaSourceFiles = relativeFiles.filter(f => f.includes("src/main/java") && f.endsWith(".java"));
        keyFiles.push(...javaSourceFiles.slice(0, 2)); // Include up to 2 Java source files
        break;
      case "typescript":
        keyFiles = ["function.json", "index.ts", "metadata.json", "package.json", "host.json", "readme.md"];
        break;
      default:
        keyFiles = ["README.md", "package.json", "host.json"];
    }
    
    for (const keyFile of keyFiles) {
      const keyPath = path.join(templateDir, keyFile);
      if (await exists(keyPath)) {
        try {
          const content = await fs.readFile(keyPath, "utf8");
          result += `=== ${keyFile} ===\n${content}\n\n`;
        } catch {
          // Skip files that can't be read
        }
      }
    }
    
    result += `\nTo get a specific file, call this tool again with the 'filePath' parameter set to one of the files listed above.`;
    
    return { 
      content: [{ 
        type: "text", 
        text: result 
      }] 
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  // Write errors to stderr only. Never write to stdout in stdio servers.
  console.error(err);
  process.exit(1);
});
