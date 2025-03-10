from django.contrib import admin
from django.urls import include, path
from dj_rest_auth.views import PasswordResetConfirmView, PasswordResetView

urlpatterns = [
    path("users/", include("users.urls")),
    path('admin/', admin.site.urls),

     path("password/reset/", PasswordResetView.as_view(), name="rest_password_reset"),
    path(
        "password/reset/confirm/<str:uidb64>/<str:token>/",
        PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    # path("password/reset/confirm/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
]
