import binascii
import os

from .models import AuthToken


def generate_auth_key():
    return binascii.hexlify(os.urandom(20)).decode()


def get_http_authorization(request):
    auth = request.META.get("HTTP_AUTHORIZATION", "").split()

    if len(auth) != 2 or auth[0].lower() != "token":
        return None

    return auth[1]


def get_user_from_token(token):
    if not token:
        return None

    try:
        return AuthToken.objects.get(key=token).user
    except AuthToken.DoesNotExist:
        return None
