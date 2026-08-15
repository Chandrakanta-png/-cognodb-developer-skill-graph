from django.core.management.base import BaseCommand
from graph.services.cognodb import graph_db


class Command(BaseCommand):
    help = "Display statistics about developers, skills, and projects"

    def handle(self, *args, **options):
        self.stdout.write("\n" + self.style.SUCCESS("📊 DEVELOPER SKILL GRAPH STATISTICS"))
        self.stdout.write("=" * 70)

        try:
            # Count Developers
            dev_result = graph_db.execute("MATCH (d:Developer) RETURN COUNT(d) AS count")
            dev_count = dev_result[0]['count'] if dev_result else 0
            self.stdout.write(f"\n👥 DEVELOPERS: {self.style.SUCCESS(str(dev_count))}")

            # List Developers
            developers = graph_db.execute(
                """
                MATCH (d:Developer)
                OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
                RETURN d.id, d.name, d.title, d.experience_years, COUNT(DISTINCT s) AS skill_count
                ORDER BY d.name
                """
            )
            for dev in developers:
                self.stdout.write(
                    f"   • {dev['d.name']} ({dev['d.id']}) - {dev['d.title']}, "
                    f"{dev['d.experience_years']}yrs exp, {dev['skill_count']} skills"
                )

            # Count Skills
            skill_result = graph_db.execute("MATCH (s:Skill) RETURN COUNT(s) AS count")
            skill_count = skill_result[0]['count'] if skill_result else 0
            self.stdout.write(f"\n🎯 SKILLS: {self.style.SUCCESS(str(skill_count))}")

            # Top Skills
            top_skills = graph_db.execute(
                """
                MATCH (s:Skill)
                OPTIONAL MATCH (d:Developer)-[:HAS_SKILL]->(s)
                OPTIONAL MATCH (p:Project)-[:USES_SKILL]->(s)
                RETURN s.id, s.name, COUNT(DISTINCT d) AS dev_count, COUNT(DISTINCT p) AS project_count
                ORDER BY dev_count DESC
                LIMIT 15
                """
            )
            self.stdout.write("   Top Skills:")
            for skill in top_skills:
                self.stdout.write(
                    f"   • {skill['s.name']:20s} - {skill['dev_count']} developers, "
                    f"{skill['project_count']} projects"
                )

            # Count Projects
            project_result = graph_db.execute("MATCH (p:Project) RETURN COUNT(p) AS count")
            project_count = project_result[0]['count'] if project_result else 0
            self.stdout.write(f"\n📦 PROJECTS: {self.style.SUCCESS(str(project_count))}")

            # List Projects
            projects = graph_db.execute(
                """
                MATCH (p:Project)
                OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)
                OPTIONAL MATCH (s:Skill)<-[:USES_SKILL]-(p)
                RETURN p.id, p.name, COUNT(DISTINCT d) AS dev_count, COUNT(DISTINCT s) AS skill_count
                ORDER BY dev_count DESC
                """
            )
            for proj in projects:
                self.stdout.write(
                    f"   • {proj['p.name']:40s} - {proj['dev_count']} developers, "
                    f"{proj['skill_count']} skills"
                )

            # Relationship Statistics
            rel_result = graph_db.execute("MATCH ()-[r]->() RETURN COUNT(r) AS count")
            total_rels = rel_result[0]['count'] if rel_result else 0

            has_skill = graph_db.execute("MATCH ()-[r:HAS_SKILL]->() RETURN COUNT(r) AS count")
            has_skill_count = has_skill[0]['count'] if has_skill else 0

            worked_on = graph_db.execute("MATCH ()-[r:WORKED_ON]->() RETURN COUNT(r) AS count")
            worked_on_count = worked_on[0]['count'] if worked_on else 0

            uses_skill = graph_db.execute("MATCH ()-[r:USES_SKILL]->() RETURN COUNT(r) AS count")
            uses_skill_count = uses_skill[0]['count'] if uses_skill else 0

            self.stdout.write(f"\n🔗 RELATIONSHIPS: {self.style.SUCCESS(str(total_rels))}")
            self.stdout.write(f"   • HAS_SKILL: {has_skill_count}")
            self.stdout.write(f"   • WORKED_ON: {worked_on_count}")
            self.stdout.write(f"   • USES_SKILL: {uses_skill_count}")

            # Summary Stats
            self.stdout.write("\n" + "=" * 70)
            self.stdout.write(f"Total Nodes: {dev_count + skill_count + project_count}")
            self.stdout.write(f"Total Edges: {total_rels}")
            if dev_count > 0:
                self.stdout.write(f"Avg Skills per Developer: {has_skill_count / dev_count:.1f}")
            if project_count > 0:
                self.stdout.write(f"Avg Skills per Project: {uses_skill_count / project_count:.1f}")
            if project_count > 0:
                self.stdout.write(f"Avg Developers per Project: {worked_on_count / project_count:.1f}")

            self.stdout.write("=" * 70 + "\n")

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"❌ Error: {str(e)}"))
            raise
