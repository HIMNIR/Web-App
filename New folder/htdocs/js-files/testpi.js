// all comments in this page is auto generated using chat gpt, the code it self is all mine + what i copied from TMDB API documentation

/**
 * Options object for API requests.
 * @constant
 * @type {Object}
 * @property {string} method - HTTP method for the request.
 * @property {Object} headers - Headers for the request, including authorization token.
 */
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNGZlMjA2NWQzNzI0YWNiMzFhYzgzZDQ5NDY4OWEyYiIsInN1YiI6IjY2MGM2NGUyZDQwMGYzMDE3ZDA1NmJjMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j_Xb3QtG-Lic7Vrj7zQO4PGgZtHsapnuX0DU5PV5OjE",
  },
};

/**
 * Function to retrieve movie data based on a query.
 * @async
 * @param {string} query - Search query for movies.
 * @returns {Promise<Object>} - Promise resolving to movie data.
 */
async function getMovie(query) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}

/**
 * Function to retrieve movie data based on movie ID.
 * @async
 * @param {string} query - Movie ID.
 * @returns {Promise<Object>} - Promise resolving to movie data.
 */
async function getMovieID(query) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${query}`,
      options,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}

/**
 * Function to retrieve movies based on average rating.
 * @async
 * @param {number} avg - Average rating.
 * @returns {Promise<Object>} - Promise resolving to movie data.
 */
async function getMovieAverage(avg) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=title.asc&vote_average.gte=${avg}&vote_average.lte=${avg}&vote_count.gte=100`,
      options,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}

/**
 * Function to retrieve movies within a rating range.
 * @async
 * @param {number} min - Minimum rating.
 * @param {number} max - Maximum rating.
 * @returns {Promise<Object>} - Promise resolving to movie data.
 */
async function getMovieRange(min, max) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=title.asc&vote_average.gte=${min}&vote_average.lte=${max}&vote_count.gte=100`,
      options,
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return { data: [] };
  }
}

/**
 * Function to retrieve detailed information about a single movie.
 * @async
 * @param {string} movieID - ID of the movie.
 * @returns {Promise<Object>} - Promise resolving to detailed movie data.
 */
async function singleMovieRequest(movieID) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}?language=en-US`,
      options,
    );
    const response2 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/credits?language=en-US`,
      options,
    );
    const response3 = await fetch(
      `https://api.themoviedb.org/3/movie/${movieID}/keywords?language=en-US`,
      options,
    );

    if (response.ok && response2.ok && response3.ok) {
      const data1 = await response.json();
      const data2 = await response2.json();
      const data3 = await response3.json();

      return { data1, data2, data3 };
    } else {
      throw new Error("Error fetching data");
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * Function to retrieve information about a currently playing movie.
 * @param {string} id - ID of the movie.
 * @returns {Promise<Object>} - Promise resolving to currently playing movie data.
 */
function nowPlaying(id) {
  return fetch(
    `https://scaling-space-memory-qjgw5x9gw75f9grp-8080.app.github.dev/api/playing.php?movie-id=${id}`,
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }
      return response.json(); // Convert response to JSON
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error(error);
      return -1;
    });
}

// Exporting functions
export { getMovieID };
export { getMovie };
export { nowPlaying };
export { getMovieAverage };
export { getMovieRange };
export { singleMovieRequest };
