from django.contrib.auth import authenticate


class TokenAuthMiddleware:
    """
    graphene middleware for setting info.context.user based off the
    HTTP_AUTHORIZATION header
    """

    def resolve(self, next, root, info, **kwargs):
        user = authenticate(request=info.context, **kwargs)

        if user is not None:
            info.context.user = user

        return next(root, info, **kwargs)
