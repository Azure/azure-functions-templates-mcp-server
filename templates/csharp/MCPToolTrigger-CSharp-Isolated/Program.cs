using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Mcp;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var host = new HostBuilder()
    .ConfigureFunctionsWebApplication()
    .ConfigureServices(services =>
    {
        services.AddApplicationInsightsTelemetryWorkerService();
        services.ConfigureFunctionsApplicationInsights();
    })
    .BuildApplication()
    .EnableMcpToolMetadata()
    .ConfigureMcpTool("get_snippets")
        .WithProperty("snippetname", "string", "The name of the snippet.")
    .Build()
    .Build();

host.Run();
