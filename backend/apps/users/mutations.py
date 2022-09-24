import graphene
import uuid

from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.db import IntegrityError
from django.template.loader import get_template
from django.utils import timezone

from .models import AuthToken
from .types import EmailUserType

UserModel = get_user_model()


def send_verify_email(user):
    subject = "Please verify your email"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = user.email
    context = {
        "first_name": user.first_name,
        "verification_key": user.verification_key,
    }
    text_content = get_template("email/verify_email.txt").render(context)
    html_content = get_template("email/verify_email.html").render(context)

    msg = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()


def send_reset_password_email(user):
    subject = "Reset your password"
    from_email = settings.DEFAULT_FROM_EMAIL
    to_email = user.email
    context = {
        "first_name": user.first_name,
        "reset_password_key": user.reset_password_key,
    }
    text_content = get_template("email/reset_password.txt").render(context)
    html_content = get_template("email/reset_password.html").render(context)

    msg = EmailMultiAlternatives(subject, text_content, from_email, [to_email])
    msg.attach_alternative(html_content, "text/html")
    msg.send()


class CreateUserMutation(graphene.Mutation):
    """
    Mutation to create a user and send a verification email
    """

    class Arguments:
        email = graphene.String(required=True)
        password1 = graphene.String(required=True)
        password2 = graphene.String(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, email, password1, password2):
        if password1 != password2:
            raise Exception("Password fields do not match")

        validate_password(password1)

        try:
            user = UserModel.objects.create_user(email, password1)
            send_verify_email(user)
        except IntegrityError:
            raise Exception("Email address already in use")
        return CreateUserMutation(success=True)


class ResendVerifyEmail(graphene.Mutation):
    """
    Mutation to attempt to resend the verification email after
    the user has been created
    """

    class Arguments:
        email = graphene.String(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, email):
        try:
            user = UserModel.objects.get(email=email)

            if user.is_verified:
                raise Exception("That email is already verified")

            send_verify_email(user)
        except UserModel.DoesNotExist:
            raise Exception("A user with that email address does not exist")
        return ResendVerifyEmail(success=True)


class VerifyEmailMutation(graphene.Mutation):
    """
    Mutation to set is_verified on a user using the key they received in their email
    """

    class Arguments:
        verification_key = graphene.String(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, verification_key):
        try:
            user = UserModel.objects.get(verification_key=verification_key)
        except UserModel.DoesNotExist:
            raise Exception("Invalid verification key")

        user.verification_key = None
        user.is_verified = True
        user.save()

        return VerifyEmailMutation(success=True)


class SendPasswordResetEmailMutation(graphene.Mutation):
    """
    Mutation to send a password reset link to a user's email
    """

    class Arguments:
        email = graphene.String(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, email):
        try:
            user = UserModel.objects.get(email=email)

            if user.reset_password_key is None:
                user.reset_password_key = uuid.uuid4()
                user.save()

            send_reset_password_email(user)
        except UserModel.DoesNotExist:
            raise Exception("A user with that email does not exist")
        return SendPasswordResetEmailMutation(success=True)


class ResetPasswordMutation(graphene.Mutation):
    """
    Mutation to set a new password for a user using the key
    they received in their email
    """

    class Arguments:
        reset_password_key = graphene.String(required=True)
        password1 = graphene.String(required=True)
        password2 = graphene.String(required=True)

    success = graphene.Boolean()

    @classmethod
    def mutate(cls, root, info, reset_password_key, password1, password2):
        try:
            user = UserModel.objects.get(reset_password_key=reset_password_key)
        except UserModel.DoesNotExist:
            raise Exception("Invalid reset password key")

        if password1 != password2:
            raise Exception("Password fields do not match")

        validate_password(password1)

        user.set_password(password1)
        user.reset_password_key = None
        user.save()

        return ResetPasswordMutation(success=True)


class TokenAuthMutation(graphene.Mutation):
    """
    Mutation to get or create an auth token for a user using their email and password
    """

    class Arguments:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    token = graphene.String()
    user = graphene.Field(EmailUserType)

    @classmethod
    def mutate(cls, root, info, email, password):
        if email and password:
            user = authenticate(request=info.context, username=email, password=password)

            if not user:
                raise Exception("Unable to log in with provided credentials.")

            if not user.is_verified:
                raise Exception("Email verification required")

            token, created = AuthToken.objects.get_or_create(user=user)
            user.last_login = timezone.now()
            user.save()

            return TokenAuthMutation(token=token.key, user=user)
        else:
            raise Exception('Must include "email" and "password".')


class Mutation(graphene.ObjectType):
    create_user = CreateUserMutation.Field()
    verify_email = VerifyEmailMutation.Field()
    resend_verify_email = ResendVerifyEmail.Field()
    send_password_reset_email = SendPasswordResetEmailMutation.Field()
    reset_password = ResetPasswordMutation.Field()
    token_auth = TokenAuthMutation.Field()
