# MCP Resource Trigger - TypeScript

This template demonstrates the **MCP Resource Trigger** for exposing resources to AI agents and LLMs via the Model Context Protocol (MCP).

## Overview

The MCP Resource Trigger allows you to expose application resources (files, data, documentation, etc.) that AI agents can discover and access. Unlike the MCP Tool Trigger which exposes callable functions, the Resource Trigger exposes readable content.

## How It Works

```typescript
import { app, InvocationContext } from "@azure/functions";

const RESOURCE_METADATA = JSON.stringify({
    author: "John Doe",
    file: {
        version: 1.0,
        releaseDate: "2026-01-01"
    }
});

export async function mcpResourceFunction(
    resourceContext: unknown,
    invocationContext: InvocationContext
): Promise<string> {
    return "Resource content here...";
}

app.mcpResource("mcpResourceFunction", {
    uri: "file://readme.md",
    resourceName: "readme",
    description: "Project README documentation",
    mimeType: "text/plain",
    metadata: RESOURCE_METADATA,
    handler: mcpResourceFunction,
});
```

## Trigger Properties

| Property | Required | Description |
|----------|----------|-------------|
| `uri` | Yes | The unique identifier URI for the resource (e.g., `file://readme.md`, `config://settings`) |
| `resourceName` | Yes | Human-readable name of the resource |
| `description` | No | Optional description of what the resource contains |
| `mimeType` | No | Optional MIME type (e.g., `text/plain`, `application/json`, `text/markdown`) |
| `metadata` | No | Optional JSON-serialized metadata object for additional resource information |
| `title` | No | Optional title for display purposes |
| `size` | No | Optional size of the resource in bytes |

## Use Cases

- **Documentation**: Expose README files, API docs, or guides for AI agents
- **Configuration**: Share application configuration or settings
- **Data Snapshots**: Provide access to current data states
- **Knowledge Bases**: Make internal knowledge accessible to LLMs

## Configuration

### Host Storage Configuration

The `AzureWebJobsStorage` setting is used by the Azure Functions runtime. By default, it uses Azurite for local development:

```json
"AzureWebJobsStorage": "UseDevelopmentStorage=true"
```

For production, configure identity-based connections:

- [Connecting to host storage with an identity](https://learn.microsoft.com/azure/azure-functions/functions-reference?tabs=blob&pivots=programming-language-typescript#connecting-to-host-storage-with-an-identity)

## Local Development

1. Install [Azurite](https://learn.microsoft.com/azure/storage/common/storage-use-azurite) for local storage emulation
2. Ensure `@azure/functions` version `4.12.0-preview.2` or greater is in your `package.json`
3. Run `npm install` to install dependencies
4. Run `npm run build` to compile TypeScript
5. Run `npm start` or `func start` to start the function locally
6. Connect an MCP client to discover and access the resource

## Learn More

- [Azure Functions MCP Extension](https://learn.microsoft.com/azure/azure-functions/functions-bindings-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Azure Functions TypeScript Developer Guide](https://learn.microsoft.com/azure/azure-functions/functions-reference-node?tabs=typescript)
