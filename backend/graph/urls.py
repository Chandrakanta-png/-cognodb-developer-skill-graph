from django.urls import path
from . import views
urlpatterns=[
 path("health/",views.health),path("developers/",views.developers),
 path("developers/<str:developer_id>/",views.developer),path("skills/",views.skills),
 path("projects/",views.projects),path("search/",views.search),
 path("graph/developer/<str:developer_id>/",views.graph),
 path("recommendations/<str:developer_id>/",views.recommendations)
]
