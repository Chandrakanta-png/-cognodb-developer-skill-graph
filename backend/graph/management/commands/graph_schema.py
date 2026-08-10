from django.core.management.base import BaseCommand

from graph.services.cognodb import graph_db


class Command(BaseCommand):

    help = "Create CognoDB graph schema"

    def handle(self, *args, **options):

        queries = [

            """
            CREATE CONSTRAINT developer_id_unique IF NOT EXISTS
            FOR (d:Developer)
            REQUIRE d.id IS UNIQUE
            """,

            """
            CREATE CONSTRAINT skill_id_unique IF NOT EXISTS
            FOR (s:Skill)
            REQUIRE s.id IS UNIQUE
            """,

            """
            CREATE CONSTRAINT project_id_unique IF NOT EXISTS
            FOR (p:Project)
            REQUIRE p.id IS UNIQUE
            """,

            """
            CREATE CONSTRAINT company_id_unique IF NOT EXISTS
            FOR (c:Company)
            REQUIRE c.id IS UNIQUE
            """,

            """
            CREATE CONSTRAINT category_id_unique IF NOT EXISTS
            FOR (c:SkillCategory)
            REQUIRE c.id IS UNIQUE
            """,
        ]

        for query in queries:
            graph_db.execute(query)

        self.stdout.write(
            self.style.SUCCESS(
                "CognoDB schema created successfully."
            )
        )