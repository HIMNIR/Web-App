/**
 * Represents a movie object.
 * @constructor
 * @param {Object} tmdb_details - The details of the movie from TMDB API.
 * @param {Object} tmdb_credits - The credits of the movie from TMDB API.
 * @param {Object} tmdb_keywords - The keywords of the movie from TMDB API.
 * @param {boolean} isFav - Whether the movie is favorited.
 * @param {boolean} toWatch - Whether the movie is marked to watch.
 */

function Movie(tmdb_details, tmdb_credits, tmdb_keywords, isFav, toWatch) {
  this.isFavourite = isFav ?? false;
  this.isToWatch = toWatch ?? false;
  this.id = tmdb_details?.id ?? undefined;
  this.title = tmdb_details?.title ?? "Unknown Title";
  this.genres = tmdb_details?.genres?.map((genre) => genre.name) ?? [];
  this.smallPosterThumbnail = `https://image.tmdb.org/t/p/w500/${
    tmdb_details?.poster_path ?? ""
  }`;
  this.bigPoster = `https://image.tmdb.org/t/p/original/${
    tmdb_details?.poster_path ?? ""
  }`;
  this.releaseYear = tmdb_details?.release_date ?? undefined;
  this.voteAverage = tmdb_details?.vote_average ?? undefined;
  this.voteCount = tmdb_details?.vote_count ?? undefined;
  this.keywords = tmdb_keywords?.keywords?.map((keyword) => keyword.name) ?? [];
  this.runtime = tmdb_details?.runtime ?? undefined;
  this.tagline = tmdb_details?.tagline ?? "";
  this.tmdbLink = `https://www.themoviedb.org/movie/${tmdb_details?.id ?? ""}`;
  this.imdbLink = `https://www.imdb.com/title/${tmdb_details?.imdb_id ?? ""}`;
  this.overview = tmdb_details?.overview ?? "";
  this.cast =
    tmdb_credits?.cast
      ?.map((actor) => ({
        name: actor.name,
        character: actor.character,
        order: actor.order,
      }))
      ?.sort((a, b) => a.order - b.order) ?? [];
}
/**
 * Represents a short version of a movie object.
 * @constructor
 * @param {Object} tmdb_details - The details of the movie from TMDB API.
 * @param {boolean} isFav - Whether the movie is favorited.
 * @param {boolean} toWatch - Whether the movie is marked to watch.
 */
function shortMovie(tmdb_details, isFav, toWatch) {
  this.isFavourite = isFav ?? false;
  this.isToWatch = toWatch ?? false;
  this.id = tmdb_details?.id ?? undefined;
  this.title = tmdb_details?.title ?? "Unknown Title";
  this.genres = tmdb_details?.genres?.map((genre) => genre.name) ?? [];
  this.smallPosterThumbnail = `https://image.tmdb.org/t/p/w500/${
    tmdb_details?.poster_path ?? ""
  }`;
  this.bigPoster = `https://image.tmdb.org/t/p/original/${
    tmdb_details?.poster_path ?? ""
  }`;
  this.voteCount = tmdb_details?.vote_count ?? undefined;

  this.releaseYear = tmdb_details?.release_date ?? undefined;
  this.voteAverage = tmdb_details?.vote_average ?? undefined;
  this.runtime = tmdb_details?.runtime ?? undefined;
  this.tagline = tmdb_details?.tagline ?? "";
  this.tmdbLink = `https://www.themoviedb.org/movie/${tmdb_details?.id ?? ""}`;
  this.imdbLink = `https://www.imdb.com/title/${tmdb_details?.imdb_id ?? ""}`;
  this.overview = tmdb_details?.overview ?? "";
}
export { Movie };
export { shortMovie };
