from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.utils import timezone


class EmailUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of username.
    """

    def _create_user(self, email, password, is_staff, is_superuser, **kwargs):
        if not email:
            raise ValueError("EmailUser must have an 'email'")
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            is_staff=is_staff,
            is_active=True,
            is_superuser=is_superuser,
            date_joined=timezone.now(),
            **kwargs
        )
        user.password = make_password(password)
        user.save()
        return user

    def create_user(self, email, password, **kwargs):
        return self._create_user(email, password, False, False, **kwargs)

    def create_superuser(self, email, password, **kwargs):
        return self._create_user(
            email,
            password,
            True,
            True,
            verification_key=None,
            is_verified=True,
            **kwargs
        )
