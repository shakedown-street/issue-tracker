import graphene

from apps.users.queries import Query as UsersQuery
from apps.users.mutations import Mutation as UsersMutation
from apps.issues.queries import Query as IssuesQuery
from apps.issues.mutations import Mutation as IssuesMutation


class Query(UsersQuery, IssuesQuery, graphene.ObjectType):
    pass


class Mutation(UsersMutation, IssuesMutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
