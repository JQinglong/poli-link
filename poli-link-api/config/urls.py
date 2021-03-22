"""config URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from polilink_api.urls import router as polilink_api_router
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='API Lists')

urlpatterns = [
    path('', include('polilink_api.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(polilink_api_router.urls)),
    path('swagger/', schema_view),
]
