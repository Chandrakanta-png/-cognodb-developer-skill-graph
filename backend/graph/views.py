from rest_framework.decorators import api_view
from rest_framework.response import Response

from .services import queries


def call(fn, *args, **kwargs):
    try:
        return fn(*args, **kwargs), None
    except Exception as e:
        return None, str(e)


# ============================================================
# HEALTH
# ============================================================

@api_view(["GET"])
def health(request):

    result, error = call(queries.verify)

    return Response({
        "status": "ok" if not error else "error",
        "cognodb": bool(result) if not error else False,
        "message": error,
    })


# ============================================================
# DEVELOPERS
# ============================================================

@api_view(["GET", "POST"])
def developers(request):

    # ========================================================
    # GET - LIST DEVELOPERS
    # ========================================================

    if request.method == "GET":
        result, error = call(queries.list_developers)

        if error:
            return Response(
                {"error": error},
                status=503
            )

        return Response(result)

    # ========================================================
    # POST - CREATE DEVELOPER
    # ========================================================

    if request.method == "POST":

        developer_data = {
            "id": request.data.get("id"),
            "name": request.data.get("name"),
            "email": request.data.get("email"),
            "title": request.data.get("title"),
            "location": request.data.get("location"),
            "experience": request.data.get("experience"),
            "bio": request.data.get("bio"),
        }

        # Validate required fields
        if not developer_data["id"]:
            return Response(
                {"error": "Developer ID is required"},
                status=400
            )

        if not developer_data["name"]:
            return Response(
                {"error": "Developer name is required"},
                status=400
            )

        result, error = call(
            queries.create_developer,
            developer_data
        )

        if error:
            return Response(
                {"error": error},
                status=503
            )

        return Response(
            result,
            status=201
        )


# ============================================================
# DEVELOPER DETAIL
# ============================================================

@api_view(["GET"])
def developer(request, developer_id):

    result, error = call(
        queries.developer_detail,
        developer_id
    )

    if error:
        return Response(
            {"error": error},
            status=503
        )

    return Response(
        result[0] if result else None
    )


# ============================================================
# SKILLS
# ============================================================

@api_view(["GET"])
def skills(request):

    result, error = call(
        queries.list_skills
    )

    if error:
        return Response(
            {"error": error},
            status=503
        )

    return Response(result)


# ============================================================
# PROJECTS
# ============================================================

@api_view(["GET"])
def projects(request):

    result, error = call(
        queries.list_projects
    )

    if error:
        return Response(
            {"error": error},
            status=503
        )

    return Response(result)


# ============================================================
# SEARCH
# ============================================================

@api_view(["GET"])
def search(request):

    q = request.GET.get("q", "").strip()

    if not q:
        return Response([])

    result, error = call(
        queries.search,
        q
    )

    if error:
        return Response(
            {"error": error},
            status=503
        )

    return Response(result)


# ============================================================
# GRAPH
# ============================================================

@api_view(["GET"])
def graph(request, developer_id):

    nodes, error_nodes = call(
        queries.developer_graph,
        developer_id
    )

    links, error_links = call(
        queries.developer_edges,
        developer_id
    )

    if error_nodes or error_links:
        return Response(
            {
                "error": error_nodes or error_links
            },
            status=503
        )

    return Response({
        "nodes": nodes or [],
        "links": links or [],
    })


# ============================================================
# RECOMMENDATIONS
# ============================================================

@api_view(["GET"])
def recommendations(request, developer_id):

    result, error = call(
        queries.recommendations,
        developer_id
    )

    if error:
        return Response(
            {"error": error},
            status=503
        )

    return Response(result)


# ============================================================
# CRUD - DEVELOPERS
# ============================================================

@api_view(["POST"])
def create_developer(request):
    """Create a new developer"""
    try:
        data = request.data
        required_fields = ['id', 'name', 'email', 'title', 'location', 'experience', 'bio']
        
        if not all(field in data for field in required_fields):
            return Response(
                {"error": f"Missing required fields: {required_fields}"},
                status=400
            )
        
        result, error = call(queries.create_developer, data)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["PUT"])
def update_developer(request, developer_id):
    """Update a developer"""
    try:
        data = request.data
        result, error = call(queries.update_developer, developer_id, data)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {})
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["DELETE"])
def delete_developer(request, developer_id):
    """Delete a developer"""
    try:
        result, error = call(queries.delete_developer, developer_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response({"status": "deleted"}, status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def developer_add_skill(request, developer_id):
    """Add a skill to a developer"""
    try:
        skill_id = request.data.get('skill_id')
        if not skill_id:
            return Response({"error": "skill_id is required"}, status=400)
        
        result, error = call(queries.add_developer_skill, developer_id, skill_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["DELETE"])
def developer_remove_skill(request, developer_id, skill_id):
    """Remove a skill from a developer"""
    try:
        result, error = call(queries.remove_developer_skill, developer_id, skill_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response({"status": "deleted"}, status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def developer_add_project(request, developer_id):
    """Add a project to a developer"""
    try:
        project_id = request.data.get('project_id')
        if not project_id:
            return Response({"error": "project_id is required"}, status=400)
        
        result, error = call(queries.add_developer_project, developer_id, project_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["DELETE"])
def developer_remove_project(request, developer_id, project_id):
    """Remove a project from a developer"""
    try:
        result, error = call(queries.remove_developer_project, developer_id, project_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response({"status": "deleted"}, status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


# ============================================================
# CRUD - SKILLS
# ============================================================

@api_view(["POST"])
def create_skill(request):
    """Create a new skill"""
    try:
        data = request.data
        required_fields = ['id', 'name']
        
        if not all(field in data for field in required_fields):
            return Response(
                {"error": f"Missing required fields: {required_fields}"},
                status=400
            )
        
        result, error = call(queries.create_skill, data)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
def skill_detail(request, skill_id):
    """Get skill detail with related developers and projects"""
    try:
        result, error = call(queries.skill_detail, skill_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {})
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["PUT"])
def update_skill(request, skill_id):
    """Update a skill"""
    try:
        data = request.data
        result, error = call(queries.update_skill, skill_id, data)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {})
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["DELETE"])
def delete_skill(request, skill_id):
    """Delete a skill"""
    try:
        result, error = call(queries.delete_skill, skill_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response({"status": "deleted"}, status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


# ============================================================
# CRUD - PROJECTS
# ============================================================

@api_view(["POST"])
def create_project(request):
    """Create a new project"""
    try:
        data = request.data
        required_fields = ['id', 'name', 'description', 'technology']
        
        if not all(field in data for field in required_fields):
            return Response(
                {"error": f"Missing required fields: {required_fields}"},
                status=400
            )
        
        result, error = call(queries.create_project, data)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["GET"])
def project_detail(request, project_id):
    """Get project detail with related developers and skills"""
    try:
        result, error = call(queries.project_detail, project_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {})
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["PUT"])
def update_project(request, project_id):
    """Update a project"""
    try:
        data = request.data
        result, error = call(queries.update_project, project_id, data)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {})
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["DELETE"])
def delete_project(request, project_id):
    """Delete a project"""
    try:
        result, error = call(queries.delete_project, project_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response({"status": "deleted"}, status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["POST"])
def project_add_skill(request, project_id):
    """Add a skill to a project"""
    try:
        skill_id = request.data.get('skill_id')
        if not skill_id:
            return Response({"error": "skill_id is required"}, status=400)
        
        result, error = call(queries.add_project_skill, project_id, skill_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response(result[0] if result else {}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=500)


@api_view(["DELETE"])
def project_remove_skill(request, project_id, skill_id):
    """Remove a skill from a project"""
    try:
        result, error = call(queries.remove_project_skill, project_id, skill_id)
        
        if error:
            return Response({"error": error}, status=400)
        
        return Response({"status": "deleted"}, status=204)
    except Exception as e:
        return Response({"error": str(e)}, status=500)