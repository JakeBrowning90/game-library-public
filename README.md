# Game Library - Public Frontend

## Overview
This repo is the public frontend for a library management concept app for use by a board game cafe. It provides a list of all games in the collection which are in circulation, a form to search for games by title, player count, difficulty, and tags(categories) and a detail view with additional info on each game.

Private Frontend Repo: https://github.com/JakeBrowning90/game-library-private
API Repo: https://github.com/JakeBrowning90/game-library-api

As a public-facing tool, this app does not currently use any form of authentication, and its calls to the backend are read-only.

## Technologies
React, React Router, CSS, JavaScript

## Challenges/To-dos
-Paginate search results: The current build returns all search results as a single page. I'd like to modify this to return only 10 or so at time, and let the user advance through the results one page at a time.

-Lock search form to the top of the screen: This should be easily doable, but I'd like additional feedback from users before settling on this design.

-Additional search filters for game search: I'm currently happy with the title, player count, difficulty, and tag search queries, but it may help to offer users additional filters.

-Form input limits and backend validation: the build currently has limited form attributes and should include some placeholders and hard character limits, as well as improved validation on the back end.

-Tag search results: the intended behavior for searching tags was to return all results containing all queries. For example, searching tags A and B would return all games containing both tags, but none that contain only one or the other. The current build has the opposite result, but this may be better, so I'll run additional tests and get feedback from users.

## How to use
Use the "Search" form to filter the displayed list of games. The standard form view allows you to search by Title. Click the arrow in the top-right area of the form to display the advanced search filters: Player count (returns all games with that number in the player range or fixed player amount), difficuly rating, or any number of tags. 

Click the "Detail" link in a game's sumamry to view more detailing information, such as a description paragraph and all applied tags.

## Credits
TBA - Thanks to friends for feedback on design and potential future features.
