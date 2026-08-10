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

@api_view(["GET"])
def developers(request):

    result, error = call(queries.list_developers)

    if error:
        return Response(
            {"error": error},
            status=503
        )

    return Response(result)


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