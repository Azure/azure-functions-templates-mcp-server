import azure.functions as func
import datetime
import json
import logging

app = func.FunctionApp()


@app.cosmos_db_trigger(arg_name="azcosmosdb", container_name="Items",
                        database_name="ToDoDb", connection="CosmosDbConnection")
def cosmosdb_trigger(azcosmosdb: func.DocumentList):
    logging.info('Python CosmosDB triggered.')
