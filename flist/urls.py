from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("list", views.list, name="list"),
    path("watched", views.watched, name="watched"),
    path("watchlist", views.watchlist, name="watchlist"),
    path("removewatchlist/<int:movieid>", views.removewatchlist, name="remove"),
    path("addnotes/<int:movieid>", views.addnotes, name="addnotes"),
    path("addwatchedlist/<int:movieid>",
         views.addwatchedlist, name="addwatchedlist"),
    path("removewatched/<int:movieid>",
         views.removewatched, name="removewatched"),

]
