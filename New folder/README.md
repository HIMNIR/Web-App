# Moviehouse Project: Winter 2024

## Table of Contents
1. [Project Overview](#project-overview)
2. [Features](#features)
   - [General Features](#general-features)
   - [Admin Site](#admin-site)
   - [Public Site](#public-site)
3. [Tech Stack](#tech-stack)
4. [Setup and Deployment](#setup-and-deployment)
5. [Usage](#usage)
6. [Screenshots](#screenshots)
7. [Contributors](#contributors)

## Project Overview
The **Moviehouse Project** is a comprehensive web application for managing movie theatres, movies, and showtimes. It includes a public-facing movie search system and an admin panel for managing theatre information and showtimes. The project leverages server-side PHP, PDO for database interaction, and front-end technologies for a modern, responsive interface.

The site adheres to academic standards and project specifications, with strict requirements around secure coding practices, session management, and modern PHP techniques.

## Features

### General Features
- The entire project is built without JQuery or React.
- Utilizes secure PHP practices, including prepared statements and `password_hash()` for secure authentication.
- Full database implementation using the **Moviehouse** schema.
- Hosted on **Google Cloud Platform**, with the URL provided in this README.
- Cross-browser compatibility and responsiveness for both mobile and desktop views.

### Admin Site
The admin site is accessible at `/admin.php` and provides the following functionalities:

#### Login Page
- Secure login with PHP session management.
- Server-side validation of login credentials.
- Redirection to a Theatre List Page upon successful login.

#### Theatre List Page
- Displays a sortable list of all theatres in the database.
- Option to view "Now Playing" movies for each theatre.
- Logout feature with session destruction.
- Last login date and time displayed using persistent cookies.

#### Now Playing Page
- Displays movies currently playing in a selected theatre.
- Option to add or remove movies from the list.
- Persistent sorting of movies in alphabetical order.
- Redirection to a custom error page on invalid query strings.
- Markup stored in separate views with at least two partials.

#### Now Playing API
- API available at `/api/playing.php?movie-id={tmdb_id}`.
- Returns valid JSON for theatre and movie information.
- Error handling for missing or invalid movie ids.
- Includes appropriate status codes and detailed messages.

### Public Site
The public-facing site is a single-page application built around **index.html** with dynamic views:

#### Default View
- Search functionality using the TMDB API for movie titles and vote ranges.
- Ability to filter for "Favourites" and "To Watch" movies using local storage.
- Sorting options for title, year, and vote average.
- Clear indicators for empty results and valid input ranges.
- Intuitive layout with movie posters, titles, release years, and average ratings.

#### Single Movie View
- Displays detailed information about a selected movie, including cast, genres, keywords, and overview.
- Links to TMDB and IMDB for additional movie details.
- Dynamic mapping for theatre locations in Calgary where the movie is playing.
- Handles both valid and invalid API responses gracefully.

## Tech Stack
- **Backend**: PHP, PDO for database interactions.
- **Frontend**: HTML5, CSS3, JavaScript (modular and external).
- **Database**: MySQL with Moviehouse schema.
- **Hosting**: Google Cloud Platform.
- **API Consumption**: TMDB API and custom Now Playing API.
