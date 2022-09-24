import graphene

from apps.users.models import EmailUser
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


class CreateProjectMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        description = graphene.String()
        website = graphene.String()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, description=None, website=None):
        project = Project.objects.create(
            name=name,
            description=description,
            website=website,
            owner=info.context.user,
        )
        return CreateProjectMutation(project=project)


class UpdateProjectMutation(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        website = graphene.String()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, project_id, name=None, description=None, website=None):
        project = Project.objects.get(id=project_id)
        if name:
            project.name = name
        if description:
            project.description = description
        if website:
            project.website = website
        project.save()
        return UpdateProjectMutation(project=project)


class AddProjectMemberMutation(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        user_id = graphene.ID(required=True)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, project_id, user_id):
        project = Project.objects.get(id=project_id)
        user = EmailUser.objects.get(id=user_id)
        project.members.add(user)
        return AddProjectMemberMutation(project=project)


class RemoveProjectMemberMutation(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        user_id = graphene.ID(required=True)

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, project_id, user_id):
        project = Project.objects.get(id=project_id)
        user = EmailUser.objects.get(id=user_id)
        project.members.remove(user)
        return RemoveProjectMemberMutation(project=project)


class CreateLabelMutation(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        color = graphene.String()

    label = graphene.Field(LabelType)

    @classmethod
    def mutate(cls, root, info, project_id, name, color=None):
        project = Project.objects.get(id=project_id)
        label = Label.objects.create(
            project=project,
            name=name,
            color=color,
        )
        return CreateLabelMutation(label=label)


class UpdateLabelMutation(graphene.Mutation):
    class Arguments:
        label_id = graphene.ID(required=True)
        name = graphene.String(required=True)
        color = graphene.String()

    label = graphene.Field(LabelType)

    @classmethod
    def mutate(cls, root, info, label_id, name, color=None):
        label = Label.objects.get(id=label_id)
        if name:
            label.name = name
        if color:
            label.color = color
        label.save()
        return UpdateLabelMutation(label=label)


class CreateIssueMutation(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        title = graphene.String(required=True)
        description = graphene.String()
        assignee_id = graphene.ID()
        label_ids = graphene.List(graphene.ID)
        due_date = graphene.Date()

    issue = graphene.Field(IssueType)

    @classmethod
    def mutate(
        cls,
        root,
        info,
        project_id,
        title,
        description,
        due_date,
        assignee_id=None,
        label_ids=[],
    ):
        project = Project.objects.get(id=project_id)
        if assignee_id:
            assignee = EmailUser.objects.get(id=assignee_id)
        else:
            assignee = None
        issue = Issue.objects.create(
            project=project,
            created_by=info.context.user,
            title=title,
            description=description,
            assignee=assignee,
            due_date=due_date,
        )
        # Add labels
        for label_id in label_ids:
            label = Label.objects.get(id=label_id)
            issue.labels.add(label)
            issue.save()
        return CreateIssueMutation(issue=issue)


class Mutation(graphene.ObjectType):
    create_project = CreateProjectMutation.Field()
    update_project = UpdateProjectMutation.Field()
    add_project_member = AddProjectMemberMutation.Field()
    remove_project_member = RemoveProjectMemberMutation.Field()

    create_label = CreateLabelMutation.Field()
    update_label = UpdateLabelMutation.Field()

    create_issue = CreateIssueMutation.Field()
