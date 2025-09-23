using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Mcp;
using Microsoft.Azure.Functions.Worker.Extensions.Storage.Blobs;
using Microsoft.Extensions.Logging;

namespace Company.Function;

public class McpToolTriggerCSharp
{
    private const string BlobPath = "snippets/{mcptoolargs.snippetname}.txt";
    private readonly ILogger<McpToolTriggerCSharp> _logger;

    public McpToolTriggerCSharp(ILogger<McpToolTriggerCSharp> logger)
    {
        _logger = logger;
    }

    [Function(nameof(SaveSnippet))]
    [BlobOutput(BlobPath)]
    public string SaveSnippet(
        [McpToolTrigger("save_snippet", "Saves a code snippet into your snippet collection.")] ToolInvocationContext context,
        [McpToolProperty("snippetname", "string", "The name of the snippet.")] string name,
        [McpToolProperty("snippet", "string", "The code snippet.")] string snippet)
    {
        _logger.LogInformation("Saving snippet {name}", name);
        return snippet;
    }

    [Function(nameof(GetSnippet))]
    public object GetSnippet(
        [McpToolTrigger("get_snippets", "Gets code snippets from your snippet collection.")] ToolInvocationContext context,
        [BlobInput(BlobPath)] string snippetContent)
    {
        _logger.LogInformation("Getting snippet");
        return snippetContent ?? "";
    }
}
