from graphene_django import DjangoObjectType

from .models import EmailUser


class EmailUserType(DjangoObjectType):
    class Meta:
        model = EmailUser
        exclude = ("password",)
