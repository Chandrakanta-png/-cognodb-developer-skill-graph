from django.core.management.base import BaseCommand
from graph.services.cognodb import graph_db


class Command(BaseCommand):
    help = "Create more developers, skills, and projects with relationships"

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS("🚀 Starting data seeding..."))

        try:
            # ==================== ADDITIONAL SKILLS ====================
            skills = [
                ("skill-javascript", "JavaScript"),
                ("skill-typescript", "TypeScript"),
                ("skill-vue", "Vue.js"),
                ("skill-nodejs", "Node.js"),
                ("skill-fastapi", "FastAPI"),
                ("skill-graphql", "GraphQL"),
                ("skill-mongodb", "MongoDB"),
                ("skill-redis", "Redis"),
                ("skill-docker", "Docker"),
                ("skill-kubernetes", "Kubernetes"),
                ("skill-aws", "AWS"),
                ("skill-devops", "DevOps"),
                ("skill-git", "Git"),
                ("skill-testing", "Testing"),
                ("skill-agile", "Agile"),
            ]

            for skill_id, skill_name in skills:
                graph_db.execute(
                    """
                    MERGE (s:Skill {id: $id})
                    SET s.name = $name
                    """,
                    {"id": skill_id, "name": skill_name}
                )
            self.stdout.write(f"✓ Created {len(skills)} skills")

            # ==================== ADDITIONAL PROJECTS ====================
            projects = [
                ("project-001", "CognoDB Developer Graph", "Developer skill and technology relationship graph"),
                ("project-002", "E-Commerce Platform", "Full-stack e-commerce application with payment integration"),
                ("project-003", "Real-time Chat Application", "WebSocket-based messaging platform"),
                ("project-004", "Analytics Dashboard", "Data visualization and analytics platform"),
                ("project-005", "Mobile Weather App", "Cross-platform weather application"),
                ("project-006", "Blog Platform", "Content management system for blogging"),
                ("project-007", "Task Management Tool", "Collaborative task tracking application"),
                ("project-008", "Video Streaming Service", "Video upload, streaming, and recommendation system"),
                ("project-009", "Social Network", "Social media platform with user connections and content sharing"),
                ("project-010", "Machine Learning Pipeline", "Automated ML model training and deployment"),
            ]

            for project_id, project_name, description in projects:
                graph_db.execute(
                    """
                    MERGE (p:Project {id: $id})
                    SET p.name = $name, p.description = $description
                    """,
                    {
                        "id": project_id,
                        "name": project_name,
                        "description": description
                    }
                )
            self.stdout.write(f"✓ Created {len(projects)} projects")

            # ==================== ADDITIONAL DEVELOPERS ====================
            developers = [
                ("dev-001", "Chandru", "Python Full Stack Developer", 3),
                ("dev-002", "Aarav Kumar", "Frontend Developer", 2),
                ("dev-003", "Priya Sharma", "Backend Engineer", 5),
                ("dev-004", "Rahul Singh", "Full Stack Developer", 4),
                ("dev-005", "Neha Gupta", "DevOps Engineer", 3),
                ("dev-006", "Vikram Patel", "Machine Learning Engineer", 2),
                ("dev-007", "Sneha Reddy", "QA Automation Engineer", 1),
                ("dev-008", "Arjun Nair", "Cloud Architect", 6),
                ("dev-009", "Divya Menon", "Frontend React Developer", 2),
                ("dev-010", "Rohan Verma", "Python Developer", 4),
            ]

            for dev_id, name, title, exp_years in developers:
                graph_db.execute(
                    """
                    MERGE (d:Developer {id: $id})
                    SET d.name = $name, d.title = $title, d.experience_years = $experience_years
                    """,
                    {
                        "id": dev_id,
                        "name": name,
                        "title": title,
                        "experience_years": exp_years
                    }
                )
            self.stdout.write(f"✓ Created {len(developers)} developers")

            # ==================== DEVELOPER -> SKILLS RELATIONSHIPS ====================
            dev_skills = [
                ("dev-001", ["skill-python", "skill-django", "skill-react", "skill-nodejs", "skill-graphql"]),
                ("dev-002", ["skill-react", "skill-javascript", "skill-typescript", "skill-vue"]),
                ("dev-003", ["skill-python", "skill-fastapi", "skill-mongodb", "skill-graphql", "skill-testing"]),
                ("dev-004", ["skill-javascript", "skill-nodejs", "skill-react", "skill-mongodb", "skill-aws"]),
                ("dev-005", ["skill-docker", "skill-kubernetes", "skill-aws", "skill-devops", "skill-git"]),
                ("dev-006", ["skill-python", "skill-tensorflow", "skill-pandas", "skill-graphql"]),
                ("dev-007", ["skill-testing", "skill-agile", "skill-git", "skill-javascript", "skill-react"]),
                ("dev-008", ["skill-aws", "skill-kubernetes", "skill-devops", "skill-docker", "skill-terraform"]),
                ("dev-009", ["skill-react", "skill-typescript", "skill-javascript", "skill-vue"]),
                ("dev-010", ["skill-python", "skill-django", "skill-fastapi", "skill-mongodb", "skill-redis"]),
            ]

            skill_links = 0
            for dev_id, skill_ids in dev_skills:
                for skill_id in skill_ids:
                    graph_db.execute(
                        """
                        MATCH (d:Developer {id: $developer_id})
                        MATCH (s:Skill {id: $skill_id})
                        MERGE (d)-[:HAS_SKILL]->(s)
                        """,
                        {"developer_id": dev_id, "skill_id": skill_id}
                    )
                    skill_links += 1
            self.stdout.write(f"✓ Created {skill_links} developer-skill relationships")

            # ==================== PROJECT -> SKILLS RELATIONSHIPS ====================
            project_skills = [
                ("project-001", ["skill-python", "skill-django", "skill-react", "skill-graphql", "skill-mongodb"]),
                ("project-002", ["skill-react", "skill-nodejs", "skill-mongodb", "skill-stripe", "skill-aws"]),
                ("project-003", ["skill-nodejs", "skill-react", "skill-socket-io", "skill-mongodb", "skill-redis"]),
                ("project-004", ["skill-react", "skill-typescript", "skill-graphql", "skill-postgresql"]),
                ("project-005", ["skill-react-native", "skill-firebase", "skill-javascript"]),
                ("project-006", ["skill-django", "skill-react", "skill-postgresql", "skill-redis", "skill-docker"]),
                ("project-007", ["skill-nodejs", "skill-react", "skill-mongodb", "skill-socket-io"]),
                ("project-008", ["skill-python", "skill-fastapi", "skill-ffmpeg", "skill-s3", "skill-redis"]),
                ("project-009", ["skill-react", "skill-nodejs", "skill-mongodb", "skill-graphql", "skill-websocket"]),
                ("project-010", ["skill-python", "skill-tensorflow", "skill-pandas", "skill-docker", "skill-kubernetes"]),
            ]

            project_skill_links = 0
            for project_id, skill_ids in project_skills:
                for skill_id in skill_ids:
                    graph_db.execute(
                        """
                        MATCH (p:Project {id: $project_id})
                        MATCH (s:Skill {id: $skill_id})
                        MERGE (p)-[:USES_SKILL]->(s)
                        """,
                        {"project_id": project_id, "skill_id": skill_id}
                    )
                    project_skill_links += 1
            self.stdout.write(f"✓ Created {project_skill_links} project-skill relationships")

            # ==================== DEVELOPER -> PROJECTS RELATIONSHIPS ====================
            dev_projects = [
                ("dev-001", ["project-001", "project-002"]),
                ("dev-002", ["project-002", "project-004"]),
                ("dev-003", ["project-001", "project-003", "project-006"]),
                ("dev-004", ["project-002", "project-007"]),
                ("dev-005", ["project-001", "project-008", "project-010"]),
                ("dev-006", ["project-010"]),
                ("dev-007", ["project-001", "project-002", "project-004"]),
                ("dev-008", ["project-001", "project-008", "project-010"]),
                ("dev-009", ["project-004", "project-009"]),
                ("dev-010", ["project-001", "project-006"]),
            ]

            dev_project_links = 0
            for dev_id, project_ids in dev_projects:
                for project_id in project_ids:
                    graph_db.execute(
                        """
                        MATCH (d:Developer {id: $developer_id})
                        MATCH (p:Project {id: $project_id})
                        MERGE (d)-[:WORKED_ON]->(p)
                        """,
                        {"developer_id": dev_id, "project_id": project_id}
                    )
                    dev_project_links += 1
            self.stdout.write(f"✓ Created {dev_project_links} developer-project relationships")

            # ==================== STATISTICS ====================
            self.stdout.write("\n" + self.style.SUCCESS("📊 DATABASE STATISTICS"))
            self.stdout.write("=" * 50)

            # Count Developers
            dev_count = graph_db.execute("MATCH (d:Developer) RETURN COUNT(d) AS count")
            self.stdout.write(f"👥 Developers: {dev_count[0]['count'] if dev_count else 0}")

            # Count Skills
            skill_count = graph_db.execute("MATCH (s:Skill) RETURN COUNT(s) AS count")
            self.stdout.write(f"🎯 Skills: {skill_count[0]['count'] if skill_count else 0}")

            # Count Projects
            project_count = graph_db.execute("MATCH (p:Project) RETURN COUNT(p) AS count")
            self.stdout.write(f"📦 Projects: {project_count[0]['count'] if project_count else 0}")

            # Count Relationships
            rel_count = graph_db.execute("MATCH ()-[r]->() RETURN COUNT(r) AS count")
            self.stdout.write(f"🔗 Total Relationships: {rel_count[0]['count'] if rel_count else 0}")

            # Top Skills by Developer Count
            top_skills = graph_db.execute(
                """
                MATCH (s:Skill)<-[:HAS_SKILL]-(d:Developer)
                RETURN s.name AS skill, COUNT(d) AS developer_count
                ORDER BY developer_count DESC
                LIMIT 5
                """
            )
            self.stdout.write("\n🏆 Top 5 Skills:")
            for skill in top_skills:
                self.stdout.write(f"   • {skill['skill']}: {skill['developer_count']} developers")

            # Top Projects by Developer Count
            top_projects = graph_db.execute(
                """
                MATCH (p:Project)<-[:WORKED_ON]-(d:Developer)
                RETURN p.name AS project, COUNT(d) AS developer_count
                ORDER BY developer_count DESC
                LIMIT 5
                """
            )
            self.stdout.write("\n📈 Top 5 Projects by Developer Count:")
            for project in top_projects:
                self.stdout.write(f"   • {project['project']}: {project['developer_count']} developers")

            self.stdout.write("\n" + self.style.SUCCESS("✅ Data seeding completed successfully!"))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Error: {str(e)}"))
            raise
