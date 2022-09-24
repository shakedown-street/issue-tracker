# Issue Tracker

A simple django project written just to have a "real-world" problem for implementing
token authentication and registration for graphene-django.

Simply put I can't justify using graphql-django-auth in my projects since my user
model doesn't have a `username` field, I would have to override a lot of the
mutations and to go through all that work it just seems more worth it to write
up custom authentication backend, middleware, queries and mutations to work with
the user model I use in all my projects.

A lot of the backend code here is borrowed straight from django-rest-framework and 
django-graphql-auth.
