import graphene

from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField

from .types import (
    ProjectType,
    IssueType,
)


class Query(graphene.ObjectType):
    projects = DjangoFilterConnectionField(ProjectType)
    project = relay.Node.Field(ProjectType)

    issues = DjangoFilterConnectionField(IssueType)
    issue = relay.Node.Field(IssueType)
