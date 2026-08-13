from django.urls import include, path

urlpatterns = [
    path("api/", include("graph.urls")),
    path("api/auth/", include("accounts.urls")),
]