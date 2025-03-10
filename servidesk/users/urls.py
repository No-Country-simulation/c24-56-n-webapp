from dj_rest_auth.registration.views import RegisterView, VerifyEmailView, ConfirmEmailView
from dj_rest_auth.views import LoginView, LogoutView, PasswordResetConfirmView, PasswordResetView
from django.urls import path, re_path

from .views import CustomRegisterView

from dj_rest_auth.registration.views import (
    ResendEmailVerificationView,
)

from users.views import email_confirm_redirect, password_reset_confirm_redirect
urlpatterns = [
    path("register/", CustomRegisterView.as_view(), name="rest_register"),
    path("login/", LoginView.as_view(), name="rest_login"),
    path("logout/", LogoutView.as_view(), name="rest_logout"),
    # path("details/", UserDetailsView.as_view(), name="rest_user_details"),
    path("verify-email/", VerifyEmailView.as_view(), name="rest_verify_email"),
    path('account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    re_path(r'^account-confirm-email/(?P<key>[-:\w]+)/$', VerifyEmailView.as_view(), name='account_confirm_email'),
    # path("register/resend-email/", ResendEmailVerificationView.as_view(), name="rest_resend_email"),
    path("account-confirm-email/<str:key>/", ConfirmEmailView.as_view(), name="account_confirm_email"),
    # path("account-confirm-email/", VerifyEmailView.as_view(), name="account_email_verification_sent"),
]