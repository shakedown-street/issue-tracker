import graphene
from graphene import relay
from graphene_django import DjangoObjectType

from .models import EmailUser


class EmailUserType(DjangoObjectType):
    pk = graphene.ID(source="pk")

    class Meta:
        model = EmailUser
        exclude = (
            "password",
            "verification_key",
            "reset_password_key",
        )
        filter_fields = ("is_active",)
        interfaces = (relay.Node,)
