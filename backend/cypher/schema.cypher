CREATE INDEX developer_id IF NOT EXISTS FOR (d:Developer) ON (d.id);
CREATE INDEX project_id IF NOT EXISTS FOR (p:Project) ON (p.id);
CREATE INDEX skill_name IF NOT EXISTS FOR (s:Skill) ON (s.name);
