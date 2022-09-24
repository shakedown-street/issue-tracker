from graphene_django import DjangoObjectType

from .models import (
    Project,
    Label,
    Issue,
)


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = (
            "id",
            "created_at",
            "modified_at",
            "name",
            "description",
            "website",
            "owner",
            "members",
            "labels",
            "issues",
        )


class LabelType(DjangoObjectType):
    class Meta:
        model = Label
        fields = (
            "id",
            "created_at",
            "modified_at",
            "project",
            "name",
            "color",
        )


class IssueType(DjangoObjectType):
    class Meta:
        model = Issue
        fields = (
            "id",
            "created_at",
            "modified_at",
            "project",
            "title",
            "description",
            "created_by",
            "assignee",
            "labels",
            "due_date",
        )
