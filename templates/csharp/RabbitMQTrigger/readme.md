# RabbitMQTrigger - CSharp

The `RabbitMQTrigger` makes it incredibly easy to react to new events from a RabbitMQ queue. This sample demonstrates a simple use case of processing data from a given RabbitMQ Queue using C#.

## How it works

For a `RabbitMQTrigger` to work, you must provide a queue name which dictates where the queue messages should be read from.

## Configuration

### RabbitMQ Connection Configuration

The RabbitMQ trigger requires a connection to your RabbitMQ instance. Configure the `RabbitMQConnection` setting:

```json
"RabbitMQConnection": "<RABBITMQ_CONNECTION>"
```

For more information on RabbitMQ connections:

- [RabbitMQ trigger for Azure Functions](https://learn.microsoft.com/en-us/azure/azure-functions/functions-bindings-rabbitmq-trigger?tabs=isolated-process%2Cextensionv2&pivots=programming-language-csharp#connections)

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