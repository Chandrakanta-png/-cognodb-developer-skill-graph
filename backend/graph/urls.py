from django.urls import path
from . import views

urlpatterns = [
    # Health check
    path("health/", views.health),

    # Developers - List and Create
    path("developers/", views.developers),

    # Developers - Create
    path("developers/create/", views.create_developer, name="create_developer"),

    # Developers - Detail, Update, Delete
    path("developers/<str:developer_id>/", views.developer),
    path("developers/<str:developer_id>/update/", views.update_developer, name="update_developer"),
    path("developers/<str:developer_id>/delete/", views.delete_developer, name="delete_developer"),

    # Developer Skills
    path("developers/<str:developer_id>/skills/add/", views.developer_add_skill, name="developer_add_skill"),
    path("developers/<str:developer_id>/skills/<str:skill_id>/remove/", views.developer_remove_skill, name="developer_remove_skill"),

    # Developer Projects
    path("developers/<str:developer_id>/projects/add/", views.developer_add_project, name="developer_add_project"),
    path("developers/<str:developer_id>/projects/<str:project_id>/remove/", views.developer_remove_project, name="developer_remove_project"),

    # Skills - List and Create
    path("skills/", views.skills),
    path("skills/create/", views.create_skill, name="create_skill"),

    # Skills - Detail, Update, Delete
    path("skills/<str:skill_id>/", views.skill_detail, name="skill_detail"),
    path("skills/<str:skill_id>/update/", views.update_skill, name="update_skill"),
    path("skills/<str:skill_id>/delete/", views.delete_skill, name="delete_skill"),

    # Projects - List and Create
    path("projects/", views.projects),
    path("projects/create/", views.create_project, name="create_project"),

    # Projects - Detail, Update, Delete
    path("projects/<str:project_id>/", views.project_detail, name="project_detail"),
    path("projects/<str:project_id>/update/", views.update_project, name="update_project"),
    path("projects/<str:project_id>/delete/", views.delete_project, name="delete_project"),

    # Project Skills
    path("projects/<str:project_id>/skills/add/", views.project_add_skill, name="project_add_skill"),
    path("projects/<str:project_id>/skills/<str:skill_id>/remove/", views.project_remove_skill, name="project_remove_skill"),

    # Search
    path("search/", views.search),

    # Graph and Recommendations
    path("graph/developer/<str:developer_id>/", views.graph),
    path("recommendations/<str:developer_id>/", views.recommendations),
]
