from email.policy import default
from pyexpat import model
from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    movies = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f"{self.username} has {self.movies} movies"


class Movie(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True, related_name="User")
    title = models.TextField()
    imdbid = models.TextField()
    imageurl = models.URLField()
    watched = models.BooleanField(default=False)
    url = models.URLField()
    notes = models.TextField(default="")

    def __str__(self):
        return f"{self.title} is watchlisted by {self.user.username}"

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['user', 'imdbid'], name="unique_movie"),
        ]
