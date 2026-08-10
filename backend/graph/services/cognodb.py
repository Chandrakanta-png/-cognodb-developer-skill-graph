from django.conf import settings
from neo4j import GraphDatabase


class CognoDBClient:

    def __init__(self):
        self.uri = settings.COGNODB_URI
        self.user = settings.COGNODB_USER
        self.password = settings.COGNODB_PASSWORD

        if not self.uri:
            raise RuntimeError("COGNODB_URI is not configured")

        if not self.password:
            raise RuntimeError("COGNODB_PASSWORD is not configured")

        self.driver = GraphDatabase.driver(
            self.uri,
            auth=(self.user, self.password),
        )

    def verify_connection(self):
        with self.driver.session() as session:
            result = session.run("RETURN 1 AS result")
            record = result.single()
            return record["result"]

    def execute(self, query, parameters=None):
        with self.driver.session() as session:
            result = session.run(query, parameters or {})
            return [record.data() for record in result]

    def execute_write(self, query, parameters=None):
        with self.driver.session() as session:
            result = session.run(query, parameters or {})
            return [record.data() for record in result]

    def close(self):
        self.driver.close()


graph_db = CognoDBClient()