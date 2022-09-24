from django.contrib.auth import get_user_model

from .utils import get_http_authorization, get_user_from_token


UserModel = get_user_model()


class TokenAuthBackend:
    """
    Django authentication backend for authenticating user based off the
    HTTP_AUTHORIZATION header
    """

    def authenticate(self, request, **kwargs):
        if request is None:
            return None

        token = get_http_authorization(request)

        if token is not None:
            return get_user_from_token(token)

        return None

    def get_user(self, user_id):
        try:
            return UserModel.objects.get(id=user_id)
        except UserModel.DoesNotExist:
            return None
