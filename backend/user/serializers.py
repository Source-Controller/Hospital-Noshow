from rest_framework import serializers
from .models import User
import json
from django.contrib import auth
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'manage']

    def validate(self, attrs):
        email = attrs.get('email', '')

        return attrs

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LoginSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=68, min_length=6, write_only=True)
    username = serializers.CharField(max_length=255)


    class Meta:
        model = User
        fields = ['password', 'username', 'manage', 'is_superuser']

    def validate(self, attrs):
        responseData = {}
        username = attrs.get('username', '')
        password = attrs.get('password', '')
        user = auth.authenticate(username=username, password=password)
        print(user)
        if not user:
            raise AuthenticationFailed('Invalid credentials, try again')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        
        if user.is_superuser == True:
            return {
                'username': user.username,
                'manage': True,
                'is_superuser':user.is_superuser
            }
        else:
            return {
                'username': user.username,
                'manage': user.manage,
                'is_superuser':user.is_superuser,
            }


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError:
            self.fail('bad_token')


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'manage', 'rate', 'msg']

