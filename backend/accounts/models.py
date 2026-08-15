from django.contrib.auth.models import User
from django.db import models


class Profile(models.Model):
    """
    Extended user profile with skills and social links.
    Auto-created via signal when User is created.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    
    display_name = models.CharField(
        max_length=255,
        blank=True,
        help_text="Display name for public profile"
    )
    
    bio = models.TextField(
        blank=True,
        help_text="Short biography"
    )
    
    location = models.CharField(
        max_length=255,
        blank=True,
        help_text="User location"
    )
    
    avatar_url = models.URLField(
        blank=True,
        help_text="URL to profile avatar"
    )
    
    github_url = models.URLField(
        blank=True,
        help_text="GitHub profile URL"
    )
    
    linkedin_url = models.URLField(
        blank=True,
        help_text="LinkedIn profile URL"
    )
    
    website = models.URLField(
        blank=True,
        help_text="Personal website URL"
    )
    
    skills = models.JSONField(
        default=list,
        blank=True,
        help_text="List of skills (JSON array of strings)"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "User Profile"
        verbose_name_plural = "User Profiles"
        ordering = ["-created_at"]
    
    def __str__(self):
        return f"Profile of {self.user.username}"
