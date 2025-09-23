#!/usr/bin/env node

import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

async function test() {
  const transport = new StdioClientTransport({
    command: "node",
    args: ["./dist/server.mjs"],
  });
  
  const client = new Client(
    {
      name: "test-client",
      version: "1.0.0",
    },
    {
      capabilities: {},
    }
  );

  await client.connect(transport);

  try {
    // Test BlobTrigger template
    const result = await client.request(
      {
        method: "tools/call",
        params: {
          name: "get_azure_functions_templates",
          arguments: {
            language: "python",
            template: "BlobTrigger"
          },
        },
      },
      {}
    );

    console.log("=== Python BlobTrigger Template ===");
    console.log(result.content[0].text);
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    await client.close();
  }
}

test().catch(console.error);