import graphene

from .models import (
    Project,
    Label,
    Issue,
)
from .types import (
    ProjectType,
    LabelType,
    IssueType,
)


class Query(graphene.ObjectType):
    projects = graphene.List(ProjectType)
    project = graphene.Field(ProjectType, id=graphene.UUID(required=True))

    labels = graphene.List(LabelType)
    label = graphene.Field(LabelType, id=graphene.UUID(required=True))

    issues = graphene.List(IssueType)
    issue = graphene.Field(IssueType, id=graphene.UUID(required=True))

    def resolve_projects(root, info):
        return Project.objects.all()

    def resolve_project(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_labels(root, info):
        return Label.objects.all()

    def resolve_label(root, info, id):
        try:
            return Label.objects.get(id=id)
        except Label.DoesNotExist:
            return None

    def resolve_issues(root, info):
        return Issue.objects.all()

    def resolve_issue(root, info, id):
        try:
            return Issue.objects.get(id=id)
        except Issue.DoesNotExist:
            return None
