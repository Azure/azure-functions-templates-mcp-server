import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["dist/src/server.js"],
});

const client = new Client({
  name: "test-client",
  version: "1.0.0",
}, {
  capabilities: {}
});

await client.connect(transport);

// Test Java template with subfolder
const javaResult = await client.request(
  {
    method: "tools/call",
    params: {
      name: "get_azure_functions_templates",
      arguments: {
        language: "java",
        template: "HttpTrigger-Java"
      }
    }
  },
  {
    timeout: 30000
  }
);

console.log("Java Template Result:");
console.log(javaResult.content[0].text.substring(0, 500) + "...");

// Test specific Java source file
const javaFileResult = await client.request(
  {
    method: "tools/call",
    params: {
      name: "get_azure_functions_templates",
      arguments: {
        language: "java",
        template: "HttpTrigger-Java",
        filePath: "src/main/java/com/function/Function.java"
      }
    }
  },
  {
    timeout: 30000
  }
);

console.log("\nJava Source File Result:");
console.log(javaFileResult.content[0].text.substring(0, 300) + "...");

await client.close();