import graphene

from graphene_django.filter import DjangoFilterConnectionField

from .exceptions import PermissionDenied
from .models import EmailUser
from .types import EmailUserType


class Query(graphene.ObjectType):
    me = graphene.Field(EmailUserType)
    users = DjangoFilterConnectionField(EmailUserType)

    def resolve_me(root, info):
        if not info.context.user.is_authenticated:
            raise PermissionDenied()
        return info.context.user
