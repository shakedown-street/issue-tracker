from django.contrib import admin

from .models import Project, Label, Issue


admin.site.register(Project)
admin.site.register(Label)
admin.site.register(Issue)
