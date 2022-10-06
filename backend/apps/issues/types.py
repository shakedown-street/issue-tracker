import graphene
from django.db.models import Q
from graphene import relay
from graphene_django import DjangoObjectType

from .models import (
    Project,
    Label,
    Issue,
)


class ProjectType(DjangoObjectType):
    pk = graphene.ID(source="pk")

    class Meta:
        model = Project
        fields = (
            "id",
            "pk",
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
        filter_fields = ("name",)
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(self, queryset, info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Permission denied")
        if user.is_superuser:
            return queryset.all()
        return queryset.filter(Q(owner__id=user.id) | Q(members__id__in=[user.id]))


class LabelType(DjangoObjectType):
    pk = graphene.ID(source="pk")

    class Meta:
        model = Label
        fields = (
            "id",
            "pk",
            "created_at",
            "modified_at",
            "project",
            "name",
            "color",
        )
        filter_fields = ("project",)
        interfaces = (relay.Node,)


class IssueType(DjangoObjectType):
    pk = graphene.ID(source="pk")

    class Meta:
        model = Issue
        fields = (
            "id",
            "pk",
            "created_at",
            "modified_at",
            "project",
            "title",
            "description",
            "created_by",
            "assignee",
            "labels",
            "due_date",
            "closed_at",
            "closed_by",
        )
        filter_fields = (
            "project",
            "title",
            "assignee",
            "due_date",
        )
        interfaces = (relay.Node,)

    @classmethod
    def get_queryset(self, queryset, info):
        user = info.context.user
        if not user.is_authenticated:
            raise Exception("Permission denied")
        if user.is_superuser:
            return queryset.all()
        return queryset.filter(
            Q(project__owner__id=user.id) | Q(project__members__id__in=[user.id])
        )
