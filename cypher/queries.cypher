// Multi-hop: Developer -> Skill -> Project -> Skill
MATCH (d:Developer {id:$developer_id})-[:HAS_SKILL]->(s:Skill)<-[:USES_SKILL]-(p:Project)-[:USES_SKILL]->(related:Skill)
RETURN DISTINCT p.name AS project,related.name AS related_skill;

// Graph recommendation
MATCH (d:Developer {id:$developer_id})-[:HAS_SKILL]->(s:Skill)<-[:HAS_SKILL]-(other:Developer)
WHERE other.id <> $developer_id
WITH other,count(DISTINCT s) AS shared_skills,collect(DISTINCT s.name) AS skills
RETURN other.name,shared_skills,skills ORDER BY shared_skills DESC;

// Shortest relationship path
MATCH p=shortestPath((a:Developer {id:$from_id})-[*..6]-(b:Developer {id:$to_id}))
RETURN [n IN nodes(p)|coalesce(n.name,n.title,n.id)] AS path;
