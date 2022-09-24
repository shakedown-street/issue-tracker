import uuid
from django.db import models
from django.conf import settings

from issue_tracker.mixins import CreatedModifiedMixin


class Project(CreatedModifiedMixin):
    name = models.CharField(max_length=256)
    description = models.TextField(max_length=1024, blank=True, null=True)
    website = models.URLField(max_length=2048, blank=True, null=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="projects_owned",
        on_delete=models.CASCADE,
    )
    members = models.ManyToManyField(
        settings.AUTH_USER_MODEL, related_name="projects_joined", blank=True
    )

    def __str__(self):
        return "{}".format(self.name)


class Label(CreatedModifiedMixin):
    project = models.ForeignKey(
        Project, related_name="labels", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=128)
    color = models.CharField(max_length=128, blank=True, null=True)

    def __str__(self):
        return "{}: {}".format(self.project.name, self.name)


class Issue(CreatedModifiedMixin):
    project = models.ForeignKey(
        Project, related_name="issues", on_delete=models.CASCADE
    )
    title = models.CharField(max_length=256)
    description = models.TextField(max_length=8192, blank=True, null=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="issues_created",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    assignee = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name="issues_assigned",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    labels = models.ManyToManyField(Label, blank=True)
    due_date = models.DateField(blank=True, null=True)

    def __str__(self):
        return "{}: {}".format(self.project.name, self.title)
