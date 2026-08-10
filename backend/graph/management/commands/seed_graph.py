from django.core.management.base import BaseCommand

from graph.services.cognodb import CognoDBClient


class Command(BaseCommand):
    help = "Seed initial developer skill graph data"

    def handle(self, *args, **options):

        db = CognoDBClient()

        try:
            # -----------------------------
            # Developers
            # -----------------------------
            db.execute_query(
                """
                MERGE (d:Developer {
                    id: $id
                })
                SET
                    d.name = $name,
                    d.title = $title,
                    d.experience_years = $experience_years
                """,
                {
                    "id": "dev-001",
                    "name": "Chandru",
                    "title": "Python Full Stack Developer",
                    "experience_years": 3,
                },
            )

            # -----------------------------
            # Skills
            # -----------------------------
            db.execute_query(
                """
                MERGE (s:Skill {
                    id: $id
                })
                SET s.name = $name
                """,
                {
                    "id": "skill-python",
                    "name": "Python",
                },
            )

            db.execute_query(
                """
                MERGE (s:Skill {
                    id: $id
                })
                SET s.name = $name
                """,
                {
                    "id": "skill-django",
                    "name": "Django",
                },
            )

            db.execute_query(
                """
                MERGE (s:Skill {
                    id: $id
                })
                SET s.name = $name
                """,
                {
                    "id": "skill-react",
                    "name": "React",
                },
            )

            # -----------------------------
            # Technologies
            # -----------------------------
            db.execute_query(
                """
                MERGE (t:Technology {
                    id: $id
                })
                SET t.name = $name
                """,
                {
                    "id": "tech-postgresql",
                    "name": "PostgreSQL",
                },
            )

            db.execute_query(
                """
                MERGE (t:Technology {
                    id: $id
                })
                SET t.name = $name
                """,
                {
                    "id": "tech-docker",
                    "name": "Docker",
                },
            )

            # -----------------------------
            # Project
            # -----------------------------
            db.execute_query(
                """
                MERGE (p:Project {
                    id: $id
                })
                SET
                    p.name = $name,
                    p.description = $description
                """,
                {
                    "id": "project-001",
                    "name": "Developer Skill Graph",
                    "description": (
                        "Developer skill and technology "
                        "relationship graph"
                    ),
                },
            )

            # -----------------------------
            # Developer -> Skills
            # -----------------------------
            db.execute_query(
                """
                MATCH (d:Developer {id: $developer_id})
                MATCH (s:Skill {id: $skill_id})

                MERGE (d)-[:HAS_SKILL]->(s)
                """,
                {
                    "developer_id": "dev-001",
                    "skill_id": "skill-python",
                },
            )

            db.execute_query(
                """
                MATCH (d:Developer {id: $developer_id})
                MATCH (s:Skill {id: $skill_id})

                MERGE (d)-[:HAS_SKILL]->(s)
                """,
                {
                    "developer_id": "dev-001",
                    "skill_id": "skill-django",
                },
            )

            db.execute_query(
                """
                MATCH (d:Developer {id: $developer_id})
                MATCH (s:Skill {id: $skill_id})

                MERGE (d)-[:HAS_SKILL]->(s)
                """,
                {
                    "developer_id": "dev-001",
                    "skill_id": "skill-react",
                },
            )

            # -----------------------------
            # Developer -> Technologies
            # -----------------------------
            db.execute_query(
                """
                MATCH (d:Developer {id: $developer_id})
                MATCH (t:Technology {id: $technology_id})

                MERGE (d)-[:KNOWS_TECH]->(t)
                """,
                {
                    "developer_id": "dev-001",
                    "technology_id": "tech-postgresql",
                },
            )

            db.execute_query(
                """
                MATCH (d:Developer {id: $developer_id})
                MATCH (t:Technology {id: $technology_id})

                MERGE (d)-[:KNOWS_TECH]->(t)
                """,
                {
                    "developer_id": "dev-001",
                    "technology_id": "tech-docker",
                },
            )

            # -----------------------------
            # Developer -> Project
            # -----------------------------
            db.execute_query(
                """
                MATCH (d:Developer {id: $developer_id})
                MATCH (p:Project {id: $project_id})

                MERGE (d)-[:WORKED_ON]->(p)
                """,
                {
                    "developer_id": "dev-001",
                    "project_id": "project-001",
                },
            )

            self.stdout.write(
                self.style.SUCCESS(
                    "Graph seed data created successfully."
                )
            )

        except Exception as exc:

            self.stderr.write(
                self.style.ERROR(
                    f"Failed to seed graph: {exc}"
                )
            )

            raise

        finally:
            db.close()