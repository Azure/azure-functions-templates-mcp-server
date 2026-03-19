# MCP Resource Trigger - Python

This template demonstrates the **MCP Resource Trigger** for exposing resources to AI agents and LLMs via the Model Context Protocol (MCP).

## Overview

The MCP Resource Trigger allows you to expose application resources (files, data, documentation, etc.) that AI agents can discover and access. Unlike the MCP Tool Trigger which exposes callable functions, the Resource Trigger exposes readable content.

## How It Works

```python
RESOURCE_METADATA = '{"author": "John Doe", "version": "1.0"}'

@app.mcp_resource_trigger(
    arg_name="context",
    uri="file://readme.md",
    resource_name="readme",
    description="Project README documentation",
    mime_type="text/plain",
    metadata=RESOURCE_METADATA
)
def mcp_resource_function(context: func.MCPToolContext) -> str:
    return "Resource content here..."
```

## Trigger Properties

| Property | Required | Description |
|----------|----------|-------------|
| `uri` | Yes | The unique identifier URI for the resource (e.g., `file://readme.md`, `config://settings`) |
| `resource_name` | Yes | Human-readable name of the resource |
| `description` | No | Optional description of what the resource contains |
| `mime_type` | No | Optional MIME type (e.g., `text/plain`, `application/json`, `text/markdown`) |
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

- [Connecting to host storage with an identity](https://learn.microsoft.com/azure/azure-functions/functions-reference?tabs=blob&pivots=programming-language-python#connecting-to-host-storage-with-an-identity)

## Local Development

1. Install [Azurite](https://learn.microsoft.com/azure/storage/common/storage-use-azurite) for local storage emulation
2. Ensure `azure-functions>=1.25.0b3` is in your `requirements.txt`
3. Run `func start` to start the function locally
4. Connect an MCP client to discover and access the resource

## Learn More

- [Azure Functions MCP Extension](https://learn.microsoft.com/azure/azure-functions/functions-bindings-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Azure Functions Python Developer Guide](https://learn.microsoft.com/azure/azure-functions/functions-reference-python)
