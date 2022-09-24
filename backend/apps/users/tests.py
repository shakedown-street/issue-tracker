from django.contrib.auth import authenticate, get_user_model
from django.test import Client, TestCase
from django.test.client import RequestFactory

from graphene_django.utils.testing import GraphQLTestCase

from apps.users.models import AuthToken


class EmailUserManagerTests(TestCase):
    def setUp(self):
        self.UserModel = get_user_model()
        self.normal_user = self.UserModel.objects.create_user(
            email="normal@user.com", password="foo"
        )
        self.super_user = self.UserModel.objects.create_superuser(
            email="super@user.com", password="foo"
        )

    def test_create_user(self):
        self.assertEqual(self.normal_user.email, "normal@user.com")
        self.assertTrue(self.normal_user.is_active)
        self.assertFalse(self.normal_user.is_staff)
        self.assertFalse(self.normal_user.is_superuser)
        with self.assertRaises(TypeError):
            self.UserModel.objects.create_user()
        with self.assertRaises(TypeError):
            self.UserModel.objects.create_user(email="")
        with self.assertRaises(ValueError):
            self.UserModel.objects.create_user(email="", password="foo")

    def test_create_superuser(self):
        self.assertEqual(self.super_user.email, "super@user.com")
        self.assertTrue(self.super_user.is_active)
        self.assertTrue(self.super_user.is_staff)
        self.assertTrue(self.super_user.is_superuser)


class TokenAuthBackendTests(TestCase):
    def setUp(self):
        self.factory = RequestFactory()
        self.UserModel = get_user_model()
        self.user = self.UserModel.objects.create_user(
            email="normal@user.com", password="foo"
        )
        self.token = AuthToken.objects.create(user=self.user)

    def test_authenticate(self):
        """
        Call authenticate with a valid HTTP_AUTHORIZATION header and assert that it
        returns the user associated with the token
        """
        headers = {"HTTP_AUTHORIZATION": f"Token {self.token.key}"}
        request = self.factory.post("/graphql/", **headers)

        authenticate_user = authenticate(request)

        self.assertEqual(self.user.id, authenticate_user.id)

    def test_authenticate_no_header(self):
        """
        Call authenticate without an HTTP_AUTHORIZATION and assert that it returns None
        """
        request = self.factory.post("/graphql/")
        authenticate_user = authenticate(request)

        self.assertIsNone(authenticate_user)

    def test_authenticate_invalid_token(self):
        """
        Call authenticate with a token that isn't associated with any user
        """
        headers = {"HTTP_AUTHORIZATION": f"Token notarealtoken"}
        request = self.factory.post("/graphql/", **headers)

        authenticate_user = authenticate(request)

        self.assertIsNone(authenticate_user)
