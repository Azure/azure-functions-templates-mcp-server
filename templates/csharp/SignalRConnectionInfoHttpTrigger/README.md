# SignalR Connection Info HTTP Trigger - CSharp

This template demonstrates an Azure Function that provides SignalR connection information via HTTP.

## Configuration

### SignalR Connection Configuration

The SignalR binding requires a connection to your Azure SignalR Service. Configure the `SignalRConnection` setting:

```json
"SignalRConnection": "<SIGNALR_CONNECTION>"
```

For production deployments, use managed identity-based connections instead of connection strings:

- [Managed identity-based connections for SignalR](https://learn.microsoft.com/azure/azure-functions/functions-bindings-signalr-service-trigger?tabs=isolated-process%2Cnodejs-v4&pivots=programming-language-csharp#managed-identity-based-connections)

### Host Storage Configuration

The `AzureWebJobsStorage` setting is used by the Azure Functions runtime. By default, it uses Azurite for local development:

```json
"AzureWebJobsStorage": "UseDevelopmentStorage=true"
```

For production, configure identity-based connections:

- [Connecting to host storage with an identity](https://learn.microsoft.com/azure/azure-functions/functions-reference?tabs=blob&pivots=programming-language-csharp#connecting-to-host-storage-with-an-identity)

## Local Development

1. Install [Azurite](https://learn.microsoft.com/azure/storage/common/storage-use-azurite) for local storage emulation
2. Run `func start` to start the function locally
