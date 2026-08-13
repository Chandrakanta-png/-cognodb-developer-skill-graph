from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [("auth", "0012_alter_user_first_name_max_length")]

    operations = [
        migrations.CreateModel(
            name="Profile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("display_name", models.CharField(blank=True, max_length=100)),
                ("bio", models.TextField(blank=True)),
                ("location", models.CharField(blank=True, max_length=120)),
                ("avatar_url", models.URLField(blank=True)),
                ("github_url", models.URLField(blank=True)),
                ("linkedin_url", models.URLField(blank=True)),
                ("website", models.URLField(blank=True)),
                ("skills", models.JSONField(blank=True, default=list)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
                ("user", models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name="profile", to="auth.user")),
            ],
        ),
    ]

