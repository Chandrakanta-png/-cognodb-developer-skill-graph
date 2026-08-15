from .cognodb import graph_db


# ============================================================
# HEALTH
# ============================================================

def verify():
    """
    Check whether CognoDB is reachable.
    """
    try:
        return graph_db.verify_connection()
    except Exception:
        return False


# ============================================================
# DEVELOPERS
# ============================================================

def list_developers():
    """
    Return all developers.
    """

    query = """
    MATCH (d:Developer)
    RETURN
        d.id AS id,
        d.name AS name,
        d.email AS email,
        d.location AS location,
        d.experience AS experience,
        d.title AS title,
        d.bio AS bio
    ORDER BY d.name
    """

    return graph_db.execute(query)


# ============================================================
# DEVELOPER DETAIL
# ============================================================

def developer_detail(developer_id):
    """
    Return developer information by ID.
    """

    query = """
    MATCH (d:Developer)
    WHERE d.id = $developer_id

    OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
    OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)

    RETURN
        d.id AS id,
        d.name AS name,
        d.email AS email,
        d.location AS location,
        d.experience AS experience,
        d.title AS title,
        d.bio AS bio,
        collect(DISTINCT {
            id: s.id,
            name: s.name
        }) AS skills,
        collect(DISTINCT {
            id: p.id,
            name: p.name
        }) AS projects
    """

    return graph_db.execute(
        query,
        {
            "developer_id": developer_id
        }
    )


# ============================================================
# SKILLS
# ============================================================

def list_skills():
    """
    Return all skills.
    """

    query = """
    MATCH (s:Skill)

    OPTIONAL MATCH (d:Developer)-[:HAS_SKILL]->(s)

    RETURN
        s.id AS id,
        s.name AS name,
        count(DISTINCT d) AS developer_count

    ORDER BY s.name
    """

    return graph_db.execute(query)


# ============================================================
# PROJECTS
# ============================================================

def list_projects():
    """
    Return all projects.
    """

    query = """
    MATCH (p:Project)

    OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)

    RETURN
        p.id AS id,
        p.name AS name,
        p.description AS description,
        p.technology AS technology,
        count(DISTINCT d) AS developer_count

    ORDER BY p.name
    """

    return graph_db.execute(query)


# ============================================================
# SEARCH
# ============================================================

def search(q):
    """
    Search developers, skills and projects.
    """

    query = """
    CALL {
        MATCH (d:Developer)
        WHERE
            toLower(coalesce(d.name, "")) CONTAINS toLower($q)
            OR toLower(coalesce(d.email, "")) CONTAINS toLower($q)
            OR toLower(coalesce(d.title, "")) CONTAINS toLower($q)
            OR toLower(coalesce(d.location, "")) CONTAINS toLower($q)

        RETURN
            "developer" AS type,
            d.id AS id,
            d.name AS name

        UNION

        MATCH (s:Skill)
        WHERE toLower(coalesce(s.name, "")) CONTAINS toLower($q)

        RETURN
            "skill" AS type,
            s.id AS id,
            s.name AS name

        UNION

        MATCH (p:Project)
        WHERE
            toLower(coalesce(p.name, "")) CONTAINS toLower($q)
            OR toLower(coalesce(p.description, "")) CONTAINS toLower($q)

        RETURN
            "project" AS type,
            p.id AS id,
            p.name AS name
    }

    RETURN type, id, name
    ORDER BY name
    LIMIT 50
    """

    return graph_db.execute(
        query,
        {
            "q": q
        }
    )


# ============================================================
# DEVELOPER GRAPH NODES
# ============================================================

def developer_graph(developer_id):
    """
    Return nodes connected to a developer.
    """

    query = """
    MATCH (d:Developer)
    WHERE d.id = $developer_id

    OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
    OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)

    WITH d, collect(DISTINCT s) AS skills,
              collect(DISTINCT p) AS projects

    RETURN
        [
            {
                id: d.id,
                label: d.name,
                type: "developer"
            }
        ]
        +
        [
            skill IN skills |
            {
                id: skill.id,
                label: skill.name,
                type: "skill"
            }
        ]
        +
        [
            project IN projects |
            {
                id: project.id,
                label: project.name,
                type: "project"
            }
        ] AS nodes
    """

    result = graph_db.execute(
        query,
        {
            "developer_id": developer_id
        }
    )

    if not result:
        return []

    return result[0].get("nodes", [])


# ============================================================
# DEVELOPER GRAPH EDGES
# ============================================================

def developer_edges(developer_id):
    """
    Return relationships connected to a developer.
    """

    query = """
    MATCH (d:Developer)
    WHERE d.id = $developer_id

    MATCH (d)-[r]->(n)

    RETURN
        d.id AS source,
        n.id AS target,
        type(r) AS relationship
    """

    return graph_db.execute(
        query,
        {
            "developer_id": developer_id
        }
    )


# ============================================================
# RECOMMENDATIONS
# ============================================================

    return graph_db.execute(
        query,
        {
            "developer_id": developer_id
        }
    )


# ============================================================
# CRUD - DEVELOPERS
# ============================================================

def create_developer(developer_data):
    """
    Create a new developer.
    """
    query = """
    MERGE (d:Developer {
        id: $id,
        name: $name,
        email: $email,
        title: $title,
        location: $location,
        experience: $experience,
        bio: $bio
    })
    RETURN d.id AS id, d.name AS name, d.email AS email
    """
    
    return graph_db.execute(query, developer_data)


def update_developer(developer_id, developer_data):
    """
    Update an existing developer.
    """
    query = """
    MATCH (d:Developer {id: $id})
    SET
        d.name = $name,
        d.email = $email,
        d.title = $title,
        d.location = $location,
        d.experience = $experience,
        d.bio = $bio
    RETURN d.id AS id, d.name AS name
    """
    
    developer_data['id'] = developer_id
    return graph_db.execute(query, developer_data)


def delete_developer(developer_id):
    """
    Delete a developer and all relationships.
    """
    query = """
    MATCH (d:Developer {id: $developer_id})
    DETACH DELETE d
    RETURN "deleted" AS status
    """
    
    return graph_db.execute(query, {"developer_id": developer_id})


def add_developer_skill(developer_id, skill_id):
    """
    Add a skill to a developer.
    """
    query = """
    MATCH (d:Developer {id: $developer_id})
    MATCH (s:Skill {id: $skill_id})
    MERGE (d)-[:HAS_SKILL]->(s)
    RETURN d.id AS developer_id, s.id AS skill_id
    """
    
    return graph_db.execute(query, {
        "developer_id": developer_id,
        "skill_id": skill_id
    })


def remove_developer_skill(developer_id, skill_id):
    """
    Remove a skill from a developer.
    """
    query = """
    MATCH (d:Developer {id: $developer_id})-[r:HAS_SKILL]->(s:Skill {id: $skill_id})
    DELETE r
    RETURN "deleted" AS status
    """
    
    return graph_db.execute(query, {
        "developer_id": developer_id,
        "skill_id": skill_id
    })


def add_developer_project(developer_id, project_id):
    """
    Add a project to a developer.
    """
    query = """
    MATCH (d:Developer {id: $developer_id})
    MATCH (p:Project {id: $project_id})
    MERGE (d)-[:WORKED_ON]->(p)
    RETURN d.id AS developer_id, p.id AS project_id
    """
    
    return graph_db.execute(query, {
        "developer_id": developer_id,
        "project_id": project_id
    })


def remove_developer_project(developer_id, project_id):
    """
    Remove a project from a developer.
    """
    query = """
    MATCH (d:Developer {id: $developer_id})-[r:WORKED_ON]->(p:Project {id: $project_id})
    DELETE r
    RETURN "deleted" AS status
    """
    
    return graph_db.execute(query, {
        "developer_id": developer_id,
        "project_id": project_id
    })


# ============================================================
# CRUD - SKILLS
# ============================================================

def create_skill(skill_data):
    """
    Create a new skill.
    """
    query = """
    MERGE (s:Skill {
        id: $id,
        name: $name
    })
    RETURN s.id AS id, s.name AS name
    """
    
    return graph_db.execute(query, skill_data)


def update_skill(skill_id, skill_data):
    """
    Update an existing skill.
    """
    query = """
    MATCH (s:Skill {id: $id})
    SET s.name = $name
    RETURN s.id AS id, s.name AS name
    """
    
    skill_data['id'] = skill_id
    return graph_db.execute(query, skill_data)


def delete_skill(skill_id):
    """
    Delete a skill and all relationships.
    """
    query = """
    MATCH (s:Skill {id: $skill_id})
    DETACH DELETE s
    RETURN "deleted" AS status
    """
    
    return graph_db.execute(query, {"skill_id": skill_id})


def skill_detail(skill_id):
    """
    Return skill information with related developers and projects.
    """
    query = """
    MATCH (s:Skill {id: $skill_id})
    OPTIONAL MATCH (d:Developer)-[:HAS_SKILL]->(s)
    OPTIONAL MATCH (p:Project)-[:USES_SKILL]->(s)
    
    RETURN
        s.id AS id,
        s.name AS name,
        collect(DISTINCT {
            id: d.id,
            name: d.name
        }) AS developers,
        collect(DISTINCT {
            id: p.id,
            name: p.name
        }) AS projects
    """
    
    return graph_db.execute(query, {"skill_id": skill_id})


# ============================================================
# CRUD - PROJECTS
# ============================================================

def create_project(project_data):
    """
    Create a new project.
    """
    query = """
    MERGE (p:Project {
        id: $id,
        name: $name,
        description: $description,
        technology: $technology
    })
    RETURN p.id AS id, p.name AS name
    """
    
    return graph_db.execute(query, project_data)


def update_project(project_id, project_data):
    """
    Update an existing project.
    """
    query = """
    MATCH (p:Project {id: $id})
    SET
        p.name = $name,
        p.description = $description,
        p.technology = $technology
    RETURN p.id AS id, p.name AS name
    """
    
    project_data['id'] = project_id
    return graph_db.execute(query, project_data)


def delete_project(project_id):
    """
    Delete a project and all relationships.
    """
    query = """
    MATCH (p:Project {id: $project_id})
    DETACH DELETE p
    RETURN "deleted" AS status
    """
    
    return graph_db.execute(query, {"project_id": project_id})


def project_detail(project_id):
    """
    Return project information with related developers and skills.
    """
    query = """
    MATCH (p:Project {id: $project_id})
    OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)
    OPTIONAL MATCH (p)-[:USES_SKILL]->(s:Skill)
    
    RETURN
        p.id AS id,
        p.name AS name,
        p.description AS description,
        p.technology AS technology,
        collect(DISTINCT {
            id: d.id,
            name: d.name
        }) AS developers,
        collect(DISTINCT {
            id: s.id,
            name: s.name
        }) AS skills
    """
    
    return graph_db.execute(query, {"project_id": project_id})


def add_project_skill(project_id, skill_id):
    """
    Add a skill to a project.
    """
    query = """
    MATCH (p:Project {id: $project_id})
    MATCH (s:Skill {id: $skill_id})
    MERGE (p)-[:USES_SKILL]->(s)
    RETURN p.id AS project_id, s.id AS skill_id
    """
    
    return graph_db.execute(query, {
        "project_id": project_id,
        "skill_id": skill_id
    })


def remove_project_skill(project_id, skill_id):
    """
    Remove a skill from a project.
    """
    query = """
    MATCH (p:Project {id: $project_id})-[r:USES_SKILL]->(s:Skill {id: $skill_id})
    DELETE r
    RETURN "deleted" AS status
    """
    
    return graph_db.execute(query, {
        "project_id": project_id,
        "skill_id": skill_id
    })