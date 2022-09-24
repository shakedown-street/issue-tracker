import graphene

from .exceptions import PermissionDenied
from .models import EmailUser
from .types import EmailUserType


class Query(graphene.ObjectType):
    users = graphene.List(EmailUserType)
    user = graphene.Field(EmailUserType, id=graphene.ID(required=True))
    me = graphene.Field(EmailUserType)

    def resolve_users(root, info):
        return EmailUser.objects.all()

    def resolve_user(root, info, id):
        try:
            return EmailUser.objects.get(id=id)
        except EmailUser.DoesNotExist:
            return None

    def resolve_me(root, info):
        if not info.context.user.is_authenticated:
            raise PermissionDenied()
        return info.context.user
