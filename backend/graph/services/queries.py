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

def recommendations(developer_id):
    """
    Recommend developers who share skills with the
    requested developer.
    """

    query = """
    MATCH (d:Developer)
    WHERE d.id = $developer_id

    MATCH (d)-[:HAS_SKILL]->(s:Skill)<-[:HAS_SKILL]-(other:Developer)

    WHERE other.id <> d.id

    WITH
        other,
        collect(DISTINCT s.name) AS shared_skills,
        count(DISTINCT s) AS score

    RETURN
        other.id AS id,
        other.name AS name,
        other.email AS email,
        other.title AS title,
        other.location AS location,
        shared_skills,
        score

    ORDER BY score DESC, name
    LIMIT 10
    """

    return graph_db.execute(
        query,
        {
            "developer_id": developer_id
        }
    )