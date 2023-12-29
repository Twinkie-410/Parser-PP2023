from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

api = 'api/'
urlpatterns = [
    path(api + 'admin/', admin.site.urls),
    path(api + 'user/', include("user.urls")),
    # path(r'^auth/', include('djoser.urls')),
]

schema_view = get_schema_view(
    openapi.Info(
        title="Bookexchange API",
        default_version="v1",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)

urlpatterns += [  # SWAGGER
    path(
        api + "",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path(
        api + "redoc/",
        schema_view.with_ui("redoc", cache_timeout=0),
        name="schema-redoc",
    ),
]
