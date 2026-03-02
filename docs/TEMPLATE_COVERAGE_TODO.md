# Template Coverage TODO

This document tracks template coverage across all supported languages, based on the
[official Azure Functions supported bindings](https://learn.microsoft.com/azure/azure-functions/functions-triggers-bindings#supported-bindings) and bindings available in GA [extension bundle](https://github.com/Azure/azure-functions-extension-bundles/blob/main/src/Microsoft.Azure.Functions.ExtensionBundle/extensions.json).

Last updated: March 2, 2026
Total templates in CDN manifest: 107

---

## Legend

| Symbol | Meaning |
| ------ | ------- |
| `id` | Template ID from manifest |
| 🔲 | Not implemented |
| ➖ | Not applicable for this language/variant |

**Variants:**
- **Starter** — Function code only (`iac: none`), maintained in this repo
- **AZD Bicep** — Full deployment sample with Bicep IaC, hosted in Azure-Samples repos  
- **AZD Terraform** — Full deployment sample with Terraform IaC

---

## HTTP

| Variant | C# | Java | JavaScript | PowerShell | Python | TypeScript |
| ------- | -- | ---- | ---------- | ---------- | ------ | ---------- |
| **Starter** | `http-trigger-csharp` | `http-trigger-java` | ➖ | ➖ | `http-trigger-python` | `http-trigger-typescript` |
| **AZD Bicep** | `http-trigger-csharp-azd` | `http-trigger-java-azd` | `http-trigger-javascript-azd` | `http-trigger-powershell-azd` | `http-trigger-python-azd` | `http-trigger-typescript-azd` |
| **AZD Terraform** | `http-trigger-csharp-terraform` | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |

---

## Timer

| Variant | C# | Java | JavaScript | PowerShell | Python | TypeScript |
| ------- | -- | ---- | ---------- | ---------- | ------ | ---------- |
| **Starter** | `timer-trigger-csharp` | `timer-trigger-java` | ➖ | ➖ | `timer-trigger-python` | `timer-trigger-typescript` |
| **AZD Bicep** | `timer-trigger-csharp-azd` | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |

---

## Blob Storage

### Triggers

| Variant | C# | Java | JavaScript | PowerShell | Python | TypeScript |
| ------- | -- | ---- | ---------- | ---------- | ------ | ---------- |
| **Starter (Polling)** | `blob-trigger-csharp` | `blob-trigger-java` | ➖ | ➖ | `blob-trigger-python` | `blob-trigger-typescript` |
| **Starter (EventGrid) ⭐** | `blob-eventgrid-trigger-csharp` | 🔲 | ➖ | ➖ | `blob-eventgrid-trigger-python` | `blob-eventgrid-trigger-typescript` |
| **AZD Bicep (EventGrid) ⭐** | `blob-eventgrid-trigger-csharp-azd` | `blob-eventgrid-trigger-java-azd` | `blob-eventgrid-trigger-javascript-azd` | `blob-eventgrid-trigger-powershell-azd` | `blob-eventgrid-trigger-python-azd` | `blob-eventgrid-trigger-typescript-azd` |

> ⭐ **EventGrid blob trigger is preferred** over polling for better scalability and reliability.

### Input/Output Bindings

| Binding | C# | Java | Python | TypeScript |
| ------- | -- | ---- | ------ | ---------- |
| **Input** | `blob-input-csharp` | `blob-input-java` | `blob-input-python` | `blob-input-typescript` |
| **Output** | `blob-output-csharp` | `blob-output-java` | `blob-output-python` | `blob-output-typescript` |

---

## Queue Storage

| Variant | C# | Java | Python | TypeScript |
| ------- | -- | ---- | ------ | ---------- |
| **Trigger** | `queue-trigger-csharp` | `queue-trigger-java` | `queue-trigger-python` | `queue-trigger-typescript` |
| **Output** | 🔲 | 🔲 | 🔲 | 🔲 |

---

## Cosmos DB

| Binding | C# | Java | Python | TypeScript |
| ------- | -- | ---- | ------ | ---------- |
| **Trigger** | `cosmos-trigger-csharp` | `cosmos-trigger-java` | `cosmos-trigger-python` | `cosmos-trigger-typescript` |
| **Input** | `cosmos-input-csharp` | `cosmos-input-java` | `cosmos-input-python` | `cosmos-input-typescript` |
| **Output** | `cosmos-output-csharp` | `cosmos-output-java` | `cosmos-output-python` | `cosmos-output-typescript` |

---

## Event Hubs

| Variant | C# | Java | JavaScript | PowerShell | Python | TypeScript |
| ------- | -- | ---- | ---------- | ---------- | ------ | ---------- |
| **Starter** | `eventhub-trigger-csharp` | `eventhub-trigger-java` | ➖ | ➖ | `eventhub-trigger-python` | `eventhub-trigger-typescript` |
| **AZD Bicep** | `eventhub-trigger-csharp-azd` | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |
| **Output** | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 | 🔲 |

---

## Event Grid

| Variant | C# | Java | Python | TypeScript |
| ------- | -- | ---- | ------ | ---------- |
| **Trigger** | `eventgrid-trigger-csharp` | `eventgrid-trigger-java` | 🔲 | 🔲 |
| **Output** | 🔲 | 🔲 | 🔲 | 🔲 |

---

## Service Bus

| Binding | C# | Java | Python | TypeScript |
| ------- | -- | ---- | ------ | ---------- |
| **Queue Trigger** | `servicebus-queue-trigger-csharp` | `servicebus-queue-trigger-java` | `servicebus-queue-trigger-python` | 🔲 |
| **Topic Trigger** | `servicebus-topic-trigger-csharp` | `servicebus-topic-trigger-java` | `servicebus-topic-trigger-python` | 🔲 |
| **Output** | 🔲 | 🔲 | 🔲 | 🔲 |

---

## MCP (Model Context Protocol)

### Starter Templates

| Trigger Type | C# | Java | Python | TypeScript |
| ------------ | -- | ---- | ------ | ---------- |
| **Tool Trigger** | `mcp-tool-trigger-csharp` | `mcp-tool-trigger-java` | `mcp-tool-trigger-python` | `mcp-tool-trigger-typescript` |
| **Resource Trigger** | `mcp-resource-trigger-csharp` | 🔲 | `mcp-resource-trigger-python` | `mcp-resource-trigger-typescript` |

### AZD Quickstart Templates

| Template Type | C# | Java | Python | TypeScript |
| ------------- | -- | ---- | ------ | ---------- |
| **Remote MCP Server** | `mcp-server-remote-csharp` | `mcp-server-remote-java` | `mcp-server-remote-python` | `mcp-server-remote-typescript` |
| **MCP SDK Hosting** | `mcp-sdk-hosting-csharp` | `mcp-sdk-hosting-java` | `mcp-sdk-hosting-python` | `mcp-sdk-hosting-typescript` |
| **MCP + APIM Gateway** | 🔲 | 🔲 | `mcp-server-apim-python` | 🔲 |

---

## Durable Functions

| Variant | C# | Java | Python | TypeScript |
| ------- | -- | ---- | ------ | ---------- |
| **Orchestration (Starter)** | `durable-orchestration-csharp` | `durable-orchestration-java` | 🔲 | 🔲 |
| **Entity Class (Starter)** | `durable-entity-class-csharp` | 🔲 | 🔲 | 🔲 |
| **Entity Function (Starter)** | `durable-entity-function-csharp` | 🔲 | 🔲 | 🔲 |
| **Order Processing (AZD)** | `durable-order-processing-csharp` | 🔲 | 🔲 | 🔲 |

---

## AI Templates (AZD Bicep)

| Scenario | C# | JavaScript | Python |
| -------- | -- | ---------- | ------ |
| **AI Agent** | `ai-agent-csharp` | 🔲 | `ai-agent-python` |
| **ChatGPT** | 🔲 | `ai-chatgpt-javascript` | `ai-chatgpt-python` |
| **Text Summarization** | `ai-textsummarize-csharp` | 🔲 | `ai-textsummarize-python` |
| **LangChain** | 🔲 | 🔲 | `ai-langchain-python` |

---

## Azure SQL

| Binding | C# | Java | Python | TypeScript |
| ------- | -- | ---- | ------ | ---------- |
| **Trigger** | `sql-trigger-csharp` | 🔲 | 🔲 | 🔲 |
| **Input** | `sql-input-csharp` | 🔲 | 🔲 | 🔲 |
| **Output** | 🔲 | 🔲 | 🔲 | 🔲 |

---

## MySQL

| Binding | C# | Java | Python | TypeScript |
| ------- | -- | ---- | ------ | ---------- |
| **Trigger** | `mysql-trigger-csharp` | 🔲 | 🔲 | 🔲 |
| **Input** | `mysql-input-csharp` | 🔲 | 🔲 | 🔲 |
| **Output** | `mysql-output-csharp` | 🔲 | 🔲 | 🔲 |

---

## Other Triggers

| Resource | C# | Java | Python | TypeScript |
| -------- | -- | ---- | ------ | ---------- |
| **RabbitMQ** | `rabbitmq-trigger-csharp` | 🔲 | 🔲 | 🔲 |
| **SignalR (HTTP)** | `signalr-connection-info-csharp` | 🔲 | 🔲 | 🔲 |
| **Generic** | ➖ | 🔲 | `generic-trigger-python` | `generic-trigger-typescript` |

---

## IaC-Only Templates

| Type | Template ID |
| ---- | ----------- |
| **ARM** | `iac-flex-consumption-arm` |
| **Bicep** | `iac-flex-consumption-bicep` |
| **Terraform (AzAPI)** | `iac-flex-consumption-terraform-azapi` |
| **Terraform (AzureRM)** | `iac-flex-consumption-terraform-azurerm` |

---

## High Priority Gaps

### 1. TypeScript — Service Bus Templates
- [ ] `servicebus-queue-trigger-typescript`
- [ ] `servicebus-topic-trigger-typescript`

### 2. Event Grid — Python & TypeScript
- [ ] `eventgrid-trigger-python`
- [ ] `eventgrid-trigger-typescript`

### 3. Durable Functions — Python & TypeScript
- [ ] Durable orchestration for Python
- [ ] Durable orchestration for TypeScript

---

## Medium Priority Gaps

### 4. Java — Starter EventGrid Blob Trigger
- [ ] `blob-eventgrid-trigger-java` (AZD version exists, starter missing)

### 5. Java — MCP Resource Trigger
- [ ] `mcp-resource-trigger-java`

### 6. Output Bindings
- [ ] Queue Storage output (all languages)
- [ ] Service Bus output (all languages)
- [ ] Event Hubs output (all languages)
- [ ] Event Grid output (all languages)
- [ ] Azure SQL output (all languages)

---

## Low Priority / Future

- MySQL bindings for Java, Python, TypeScript
- RabbitMQ trigger for Java, Python, TypeScript
- SignalR bindings for Java, Python, TypeScript
- Redis triggers and bindings (all languages)
- Table Storage bindings (all languages)
- IoT Hub trigger (all languages)
- Kafka bindings (all languages)
- SendGrid / Twilio output bindings

---

## Out of Scope

- **Dapr** bindings — self-hosted only, limited adoption

---

## References

- [Azure Functions triggers and bindings](https://learn.microsoft.com/azure/azure-functions/functions-triggers-bindings)
- [Supported bindings table](https://learn.microsoft.com/azure/azure-functions/functions-triggers-bindings#supported-bindings)
- [Flex Consumption Samples](https://github.com/Azure-Samples/azure-functions-flex-consumption-samples)
- [Awesome AZD Templates](https://azure.github.io/awesome-azd/?tags=functions)
