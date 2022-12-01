from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

from .models import User, Movie
# Create your views here.

# list, watched pending


def index(request):
    # print(request.user)
    # print(request.user.movies)
    # movies = Movie.objects.filter(user=request.user)
    # for m in movies:
    #     print(m.notes)
    return render(request, "index.html")


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "login.html")


def logout_view(request):
    pass


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "register.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))

#  use movie model and make a manytomany or oneone in user, in movie keep link thats it. if user unwatchlist a movie delete a movie model etc


# fetch("removewatchlist", {
#     method: 'PUT',
#     body: JSON.stringify({
#         imdbid: "tt0944947"
#     })
# })

@login_required
def watched(request):
    movies = Movie.objects.filter(user=request.user, watched=True)
    return render(request, "watched.html", {
        "movies": movies
    })


@csrf_exempt
@login_required
def removewatched(request, movieid):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required."}, status=400)
    print(movieid)
    movie = Movie.objects.get(id=movieid)
    movie.watched = False
    movie.save()
    return JsonResponse({"message": "movie watchedlisted succesfuly."}, status=201)


@csrf_exempt
@login_required
def addwatchedlist(request, movieid):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required."}, status=400)
    print(movieid)
    movie = Movie.objects.get(id=movieid)
    movie.watched = True
    movie.save()
    return JsonResponse({"message": "movie watchedlisted succesfuly."}, status=201)


@login_required
def list(request):
    movies = Movie.objects.filter(user=request.user)
    return render(request, "list.html", {
        "movies": movies
    })


@csrf_exempt
@login_required
def watchlist(request):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required."}, status=400)

    data = json.loads(request.body)
    imdbid = data.get("imdbid", "")
    imageurl = data.get("imageurl", "")
    print(imageurl)
    title = data.get("title", "")
    print(title)
    userobj = User.objects.get(pk=request.user.id)

    movies = Movie.objects.filter(user=request.user)
    movieslist = []
    for m in movies:
        # print(m.id)
        movieslist.append(m.imdbid)

    if imdbid not in movieslist:
        movie = Movie(
            user=userobj,
            imdbid=imdbid,
            title=title,
            imageurl=imageurl,
            url="https://www.imdb.com/title/" + str(imdbid),
        )
        movie.save()
        userobj.movies += 1
        userobj.save()
    return JsonResponse({"message": "movie watchlisted succesfuly."}, status=201)


@csrf_exempt
@login_required
def removewatchlist(request, movieid):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required."}, status=400)

    movie = Movie.objects.get(id=movieid)
    movie.delete()

    return JsonResponse({"message": "movie unwatchlisted succesfuly."}, status=201)


@csrf_exempt
@login_required
def addnotes(request, movieid):
    if request.method != "PUT":
        return JsonResponse({"error": "PUT request required."}, status=400)
    # print(movieid)

    data = json.loads(request.body)
    note = data.get("notes", "")
    # print(note)
    movie = Movie.objects.get(id=movieid)
    movie.notes = note
    movie.save()
    return JsonResponse({"message": "movie watchedlisted succesfuly."}, status=201)
