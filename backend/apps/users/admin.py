from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .forms import EmailUserCreationForm, EmailUserChangeForm
from .models import EmailUser, AuthToken


@admin.register(EmailUser)
class EmailUserAdmin(UserAdmin):
    add_form = EmailUserCreationForm
    form = EmailUserChangeForm
    list_display = (
        "email",
        "first_name",
        "last_name",
        "is_verified",
        "is_staff",
    )
    list_filter = (
        "is_staff",
        "is_superuser",
        "is_active",
        "groups",
    )
    search_fields = (
        "email",
        "first_name",
        "last_name",
        "email",
    )
    ordering = ("email",)
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "email",
                    "password",
                    "first_name",
                    "last_name",
                    "image",
                )
            },
        ),
        (
            "Verification",
            {
                "fields": (
                    "verification_key",
                    "is_verified",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "is_developer",
                    "groups",
                    "user_permissions",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )


@admin.register(AuthToken)
class AuthTokenAdmin(admin.ModelAdmin):
    list_display = (
        "key",
        "user",
        "created_at",
    )
    fields = ("user",)
    ordering = ("-created_at",)
