from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from django.db import transaction
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ("display_name", "bio", "location", "avatar_url", "github_url", "linkedin_url", "website", "skills", "created_at", "updated_at")
        read_only_fields = ("created_at", "updated_at")

    def validate_skills(self, value):
        if not isinstance(value, list) or not all(isinstance(skill, str) for skill in value):
            raise serializers.ValidationError("Skills must be a list of strings.")
        return value


class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "date_joined", "profile")
        read_only_fields = ("id", "date_joined")


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    first_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    last_name = serializers.CharField(max_length=150, required=False, allow_blank=True)
    profile = ProfileSerializer(required=False)

    def validate_username(self, value):
        if User.objects.filter(username__iexact=value).exists():
            raise serializers.ValidationError("This username is already in use.")
        return value

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("An account already exists for this email address.")
        return value.lower()

    def validate_password(self, value):
        validate_password(value)
        return value

    @transaction.atomic
    def create(self, validated_data):
        profile_data = validated_data.pop("profile", {})
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        profile = user.profile
        for field, value in profile_data.items():
            setattr(profile, field, value)
        profile.save()
        return user


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField(write_only=True)
    username = serializers.CharField(required=False, write_only=True)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields[self.username_field].required = False

    def validate(self, attrs):
        email = attrs.pop("email", "").lower()
        if not attrs.get("username"):
            try:
                attrs["username"] = User.objects.get(email__iexact=email).username
            except User.DoesNotExist:
                attrs["username"] = "__unknown_user__"
        data = super().validate(attrs)
        data["user"] = UserSerializer(self.user).data
        return data

