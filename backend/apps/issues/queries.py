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
    project = graphene.Field(ProjectType, id=graphene.ID(required=True))

    labels = graphene.List(LabelType)
    label = graphene.Field(LabelType, id=graphene.ID(required=True))

    issues = graphene.List(IssueType)
    issue = graphene.Field(IssueType, id=graphene.ID(required=True))

    def resolve_projects(root, info):
        return Project.objects.all()

    def resolve_project(root, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            raise Project.DoesNotExist("Project does not exist")

    def resolve_labels(root, info):
        return Label.objects.all()

    def resolve_label(root, info, id):
        try:
            return Label.objects.get(id=id)
        except Label.DoesNotExist:
            raise Project.DoesNotExist("Label does not exist")

    def resolve_issues(root, info):
        return Issue.objects.all()

    def resolve_issue(root, info, id):
        try:
            return Issue.objects.get(id=id)
        except Issue.DoesNotExist:
            raise Project.DoesNotExist("Issue does not exist")
