import binascii
import os
import uuid

from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models

from issue_tracker.mixins import CreatedModifiedMixin
from .managers import EmailUserManager


def email_user_image_upload_to(email_user, filename: str) -> str:
    ext = os.path.splitext(filename)[-1]
    return f"email_users/{email_user.email}/profile{ext}"


class EmailUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    image = models.ImageField(
        blank=True, null=True, upload_to=email_user_image_upload_to
    )
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_developer = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Email verification
    verification_key = models.UUIDField(default=uuid.uuid4, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    # Reset password
    reset_password_key = models.UUIDField(blank=True, null=True)

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = EmailUserManager()

    class Meta:
        verbose_name = "Email User"
        verbose_name_plural = "Email Users"

    def __str__(self):
        return self.email

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def get_full_name(self):
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)


class AuthToken(CreatedModifiedMixin):
    key = models.CharField(max_length=40, primary_key=True)
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        related_name="auth_token",
        on_delete=models.CASCADE,
    )

    def save(self, *args, **kwargs):
        if not self.key:
            self.key = self.generate_key()
        return super().save(*args, **kwargs)

    @classmethod
    def generate_key(cls):
        return binascii.hexlify(os.urandom(20)).decode()

    def __str__(self):
        return self.key
