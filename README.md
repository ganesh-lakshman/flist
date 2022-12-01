# Flist

## Introduction

Flist is a curated film collection. Flist is extremely useful for folks who struggle to keep track of movies they've seen or wish to see. It is intended for cinema buffs. The user can save notes on specific films and change them as needed. The user can have two separate lists for seen and wanted-to-watch movies. They can update these lists at any time. Each film's IMDB page may be accessed directly by the user. The user may add films from a large collection to the list, and they will almost certainly discover the film they are looking for. Users may search for and watchlist movies as they appear on the homepage.

## Distinctiveness and Complexity

Flist has created keeps film lovers in mind. Film lovers usually maintain written or typed notes/tasks for films. The struggle is real. No one-place solution exists in the market for watchlisting and adding notes to films. Users can add films to their lists just two clicks away. User can track their film experiences in an integrated note. It's simple and quick.
The organization of these lists may be difficult; however, the complexity is handled on the backend and the user is presented with a clean UI experience. Flist has functionalities like search a film, adding to the watchlist, removing from the watchlist, adding notes to a film, editing notes to a film, adding to the watched-films list, removing from the watched-films list, and visiting the IMDB page of a film.

### Inspiration

Google used to provide a watchlist for movies. But one cannot rely on google for maintaining a watchlist. films have been disappearing constantly from the list. to overcome this problem, Flist stores the list of films on the server. so the films are never lost. a similar but junky solution is letterboxed, but it is more of a social media for reviews. Flist is built for personal reference and research. Flist brings a significant difference.

### Features

- Search through a massive film library.
- Add notes to individual films
- Create two separate lists "watchlist" and "watched list"
- Lists load quickly
- clean UI
- responsive design
- links to useful websites like IMDB

## Flist Design

Flist is designed keeping simplicity in mind. Simplicity shouldn't always be boring. Flist has beautiful animations, it doesn't give the feeling of using a static website. Flist is responsive and scalable. Flist uses IMDB API RapidAPI for getting movie details. Flist stores the data on the servers securely. The homepage is a search page. lists are divided into two categories watchlist and watched list.

### Frontend

on the front end, Flist uses javascript. Flist has some cool animations when the user removes a film from the list. the tiles and albums are of minimalist design using CSS.
the design is aesthetically pleasing and functional. Flist uses mainly PUT requests which have low latency.

### Backend

Flist uses Django on the backend. the whole complex is taken care of on the backend side. The models and views are optimized for faster performance.

## How to use Flist

- on the welcome page you are required to register and sign in.
- then on the home page, you can search for the films you like and watch list them.
- on the watchlist tab, you have all the films that you watchlisted.
- each watchlisted film has three options. Add Notes, Remove watchlist, Add to watched list.
- on the watched list tab, you have all the films that you have watched.
