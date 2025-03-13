from django.urls import path
from .views import RegisterView, CustomTokenObtainPairView, LogoutView, ActiveSessionsView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('active-sessions/', ActiveSessionsView.as_view(), name='active_sessions')
]