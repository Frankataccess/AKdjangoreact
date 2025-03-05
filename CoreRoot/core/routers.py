# core/routers.py
from rest_framework.routers import SimpleRouter
from core.user.viewsets import UserViewSet  # Ensured correct import path
from core.auth.viewsets import LoginViewSet, RegistrationViewSet, RefreshViewSet  # Confirmed correct imports


routes = SimpleRouter()

# AUTHENTICATION ROUTES
# Registers authentication endpoints for login, registration, and token refresh
routes.register(r'auth/login', LoginViewSet, basename='auth-login')
routes.register(r'auth/register', RegistrationViewSet, basename='auth-register')
routes.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

# USER ROUTE
# Registers user-related endpoints
routes.register(r'user', UserViewSet, basename='user')

# URL Patterns
# Expands the routes into urlpatterns
urlpatterns = [
    *routes.urls
]
