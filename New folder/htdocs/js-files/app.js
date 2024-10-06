/* eslint-disable unicorn/prefer-spread */
/* eslint-disable unicorn/prefer-array-some */
/* eslint-disable unicorn/prefer-top-level-await */
/* eslint-disable unicorn/prefer-query-selector */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable unicorn/no-negated-condition */
/* eslint-disable unicorn/prefer-number-properties */
/* eslint-disable unicorn/prefer-switch */
// Grabbing some modules we need
import { Movie as movies, shortMovie } from "./movie.js";

// importing the methods that deal with api calls
import {
  getMovie,
  getMovieAverage,
  getMovieRange,
  getMovieID,
  nowPlaying,
  singleMovieRequest,
} from "./testpi.js";

const movieContainer = document.querySelector(".movieContainer");
let movie;
// Getting hold of some UI elements
let display = [];
let searchResults = [];
let checked = false;
const searchButton = document.querySelector(".searchButton");
const searchText = document.querySelector(".searchTerm");
const removeFilter = document.querySelector(".bofa");
let bofa = document.getElementById("min-ratings");
let dofa = document.getElementById("max-ratings");
const filterButton = document.querySelector("#filterbutton");
const filterRemove = document.querySelector("#filterRemove");
const sortButton = document.getElementById("findbutton");
const radioButtons = document.querySelectorAll(
  'input[type="radio"][name="name"]',
);
/**
Initializes the UI by displaying movies set to watch when the page loads.
**/

function firstDisplay() {
  if (localStorage.length === 0) {
    displayError("No Movies set to watch");
    return;
  } else {
    console.log("bsssofa");
    const bofa = JSON.parse(localStorage.toWatch);
    bofa.forEach((item) => {
      renderMovie(item);
    });
  }
}
firstDisplay();
/**
 * Filters the movie display based on a voteAverage range making sure that voteCount > 100.
 * @param {number} bofaValue - The minimum vote average value.
 * @param {number} dofaValue - The maximum vote average value.
 */
function filterVoteAverage(bofaValue, dofaValue) {
  display = display
    .filter(
      (item) => item.voteAverage >= bofaValue && item.voteAverage <= dofaValue,
    )
    .filter((item) => {
      return item.voteCount > 100;
    });
}

// Listening for filter button click
filterButton.addEventListener("click", async function () {
  if (document.querySelector(".error") !== null) {
    document.querySelector(".error").remove();
  }
  if (checked == true) {
    // this is basically so that we dont endlessly filter one search result, once a user searches for something, filters it and then goes back to filter again witha a different range the array theyd be working with gets rollbacked to the array they had before applying the filters
    display = searchResults;
  }

  if (display.length > 0) {
    checked = true;
    // Applying filters based on what the user wants
    checkBoxCheck();

    // Making sure ratings stay between 0 and 10
    const bofa = document.getElementById("min-ratings");
    const dofa = document.getElementById("max-ratings");

    if (bofa.value !== "" && dofa.value !== "") {
      const bofaValue = parseFloat(bofa.value);
      const dofaValue = parseFloat(dofa.value);
      // eslint-disable-next-line unicorn/prefer-ternary
      if (bofaValue > 10 || dofaValue > 10 || bofaValue > dofaValue) {
        display = [];
      } else {
        filterVoteAverage(bofaValue, dofaValue);
      }
    }
  } else {
    // if there are no search results present i.e display is empty that means user is attempting a search without giving us a search element in which case we call a different api
    const toWatch = document.getElementById("toWatch");
    const isFav = document.getElementById("isFav");
    let favs = JSON.parse(localStorage.getItem("Favourites")) ?? [];
    let watchs = JSON.parse(localStorage.getItem("toWatch")) ?? [];
    if (toWatch.checked && isFav.checked) {
      display = watchs;
      // here we first get movies from local storage and then filter them to se if they have the favourite property
      display = display.filter((item) => {
        return favs.includes(item.id);
      });
    } else if (toWatch.checked) {
      display = watchs;
    } else if (isFav.checked) {
      const movieIds = await Promise.all(
        favs.map(async (item) => {
          // api call to get favourtie movies when the user provides us with nothing
          console.log(item);
          // https://stackoverflow.com/questions/40140149/use-async-await-with-array-map
          return getMovieID(item);
        }),
      );
      const temparr = movieIds.map((element) => {
        console.log(element);
        const localToWatch = JSON.parse(localStorage.getItem("toWatch")) || []; // you will see this bit of code all over my page it basically checks if the movie is set to watch or fav in teh local storage to assign it proper properties, i wont add comments for this after this

        const isToWatch = localToWatch.find((movie) => movie.id === element.id)
          ? true
          : false;

        return new shortMovie(element, true, isToWatch);
      });
      display = temparr;
    }
    if (display.length > 0) {
      // over here since we have applied the towatch and isfav filters above display is no longer empty, so if user enters a range now we can just filter from the list that we already got.
      if (bofa.value !== "" && dofa.value !== "") {
        filterVoteAverage(parseFloat(bofa.value), parseFloat(dofa.value));
      }
      console.log(display);
    } else {
      // NOW if display is still empty that means the user made no prior searches and applied no filters before this
      const data = await getMovieRange(
        parseFloat(bofa.value), // async await is actually so easy
        parseFloat(dofa.value),
      );
      const moveiData = data.results; // grabbing results from my api
      if (moveiData.length === 0) {
        console.log("bofa?");
        displayError("No Movies Found.");
      } else {
        display = moveiData.map((element) => {
          console.log(element); // this bit of code goes over the api results, parses it, creates an shortMovie element and adds it to display
          const localFav = JSON.parse(localStorage.getItem("Favourites")) || [];
          const localToWatch =
            JSON.parse(localStorage.getItem("toWatch")) || [];

          const isFav = localFav.includes(element.id);
          const isToWatch = localToWatch.find(
            (movie) => movie.id === element.id,
          )
            ? true
            : false;

          return new shortMovie(element, isFav, isToWatch);
        });
        checkBoxCheck();
      }
    }
  }

  removeContents(); // removes all previous content on the page
  if (display.length === 0) {
    // if we have no search results
    displayError("No movies with those filters");
  }
  addContents(display);
});
/**
 * Checks which filters are applied (to watch and is fav).
 */
function checkBoxCheck() {
  // i was using this bit of code alot before so i made it a function but now i only use it once , all it does is check what filters area applied ( towatch and isfav)
  const toWatch = document.getElementById("toWatch");
  const isFav = document.getElementById("isFav");
  if (toWatch.checked && isFav.checked) {
    display = display.filter(
      (item) => item.isToWatch === true && item.isFavourite === true,
    );
  } else if (toWatch.checked) {
    display = display.filter((item) => item.isToWatch === true);
  } else if (isFav.checked) {
    display = display.filter((item) => item.isFavourite === true);
  }
}

/**
 * Renders a movie card in the UI.
 * @param {Object} movie - The movie object to render.
 */
// Function to create cool movie cards
// just manipulating DOM to create elements using createElements not much inline comments i can add here
function renderMovie(movie) {
  const card = document.createElement("div");
  card.classList.add("movie-card");

  const poster = document.createElement("img");
  poster.src = movie.smallPosterThumbnail;
  poster.alt = movie.title;
  card.append(poster);

  const id = document.createElement("span");
  id.textContent = movie.id;
  id.hidden = true;
  card.append(id);
  const title = document.createElement("h2");
  title.textContent = movie.title;
  card.append(title);

  const releaseYear = document.createElement("p");
  releaseYear.textContent = "Released: " + movie.releaseYear;
  card.append(releaseYear);

  const voteAverage = document.createElement("p");
  voteAverage.textContent = "Rating: " + movie.voteAverage;
  card.append(voteAverage);

  const isFavButton = document.createElement("button");
  isFavButton.classList.add("favButton");
  isFavButton.textContent = movie.isFavourite
    ? "Favourited"
    : "Add to Favourites";
  isFavButton.classList.add(
    movie.isFavourite ? "Favourited-button" : "add-Favourite-button",
  );
  isFavButton.addEventListener("click", function () {
    toggleFavourite(movie.id);
  });
  card.append(isFavButton);

  const toWatchIndicator = document.createElement("button");
  toWatchIndicator.classList.add("toWatchButton");
  toWatchIndicator.textContent = movie.isToWatch ? "To Watch" : "Add to Watch";
  toWatchIndicator.classList.add(
    movie.isToWatch ? "to-watch-button" : "not-to-watch-button",
  );
  toWatchIndicator.addEventListener("click", function () {
    toggleToWatch(movie.id);
  });
  card.append(toWatchIndicator);

  // Append card to movie container
  movieContainer.append(card);
}
/**
 * Adding all those display to the UI
 * takes in an array and calls the rendermovie on each element
 * * @param {Array} array - An array of movie objects to add to the UI.
 * */

function addContents(array) {
  array.forEach((element) => {
    renderMovie(element);
  });
}

// Listening for the sort button click
sortButton.addEventListener("click", function () {
  console.log(display);
  // Finding out which sorting method the user wants
  let idHolder = "";
  radioButtons.forEach((element) => {
    if (element.checked) {
      idHolder = element.id;
    }
  });
  const sortMethod = idHolder;

  // Sorting the display accordingly
  if (sortMethod === "name") {
    removeContents();
    display = display.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    addContents(display);
  } else if (sortMethod === "nameDESC") {
    removeContents();

    display = display.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });

    addContents(display);
  } else if (sortMethod === "rating") {
    removeContents();
    display = display.sort((a, b) => {
      return a.voteAverage - b.voteAverage;
    });

    addContents(display);
  } else if (sortMethod === "ratingDESC") {
    removeContents();
    display = display.sort((a, b) => {
      return b.voteAverage - a.voteAverage;
    });

    addContents(display);
  } else if (sortMethod === "release") {
    removeContents();
    display = display.sort((a, b) => {
      return a.releaseYear - b.releaseYear;
    });

    addContents(display);
  } else if (sortMethod === "releaseDESC") {
    removeContents();
    display = display.sort((a, b) => {
      return b.releaseYear - a.releaseYear;
    });

    addContents(display);
  }

  console.log(display);
});

// Removing old movie cards from the UI
// uses a while to wipe the movie container div
function removeContents() {
  while (movieContainer.firstChild) {
    movieContainer.firstChild.remove();
  }
}
/**
 * Another very fun method
 * i have 2 implementations here
 * one if u just search the number 5 or 6 you wil be able to see results with a user voteaverage of 5 or 6
 * or u can search by title
 * more info below
 */
searchButton.addEventListener("click", async function () {
  if (document.querySelector(".error") !== null) {
    document.querySelector(".error").remove();
  }

  let input = searchText.value.trim().toLowerCase();

  if (input.length < 3 && isNaN(parseFloat(input))) {
    // Handle short title search (less than 3 characters)
    removeContents();
    displayError("Please enter at least 3 characters for title search.");
    return;
  } else {
    // Valid input: proceed with search
    let isNumeric = !isNaN(parseFloat(input)); // Check if input is a number
    if (isNumeric) {
      removeContents();
      // Numeric input: validate vote average
      if (input < 0 || input > 10) {
        displayError("Please enter a rating between 0 and 10.");
        return; // Exit the function early if invalid rating
      }

      // Filter by vote average
      const data = await getMovieAverage(input); // api call
      let moviesData = data.results;
      console.log(moviesData);
      if (moviesData.length === 0) {
        displayError("No Movies Found.");
      } else {
        display = moviesData.map((element) => {
          console.log(element); // over here we verified that the input is a number so we ignored the <3 limit which only applies to title searches.
          const localFav = JSON.parse(localStorage.getItem("Favourites")) || [];
          const localToWatch =
            JSON.parse(localStorage.getItem("toWatch")) || [];

          const isFav = localFav.includes(element.id);
          const isToWatch = localToWatch.find(
            (movie) => movie.id === element.id,
          )
            ? true
            : false;

          return new shortMovie(element, isFav, isToWatch);
        });
      }
      removeFilter.textContent = `❌ ${input} `;
    } else {
      removeContents();
      // Title search: perform case-insensitive search
      const data = await getMovie(input);
      let movies = data.results;
      if (movies.length === 0) {
        displayError("No Movies Found.");
      } else {
        display = [];
        movies.forEach((element) => {
          const localFav = JSON.parse(localStorage.getItem("Favourites")) || [];
          const localToWatch =
            JSON.parse(localStorage.getItem("toWatch")) || [];

          const isFav = localFav.includes(element.id); // check to see if the element we are iterating has a corresponding id in local storage Returns true if so.

          // check to see if the current movie's ID is present in localStorage toWatch
          const isToWatch = localToWatch.find(
            (movie) => movie.id === element.id,
          )
            ? true
            : false;
          display.push(new shortMovie(element, isFav, isToWatch)); // add a new shortMovie element inside display
        });
      }

      removeFilter.textContent = `❌ ${input} `;
    }

    display = display.filter((item, pos) => {
      // filter duplicates
      return display.indexOf(item) === pos;
    });
    const sorted = display.sort((a, b) => {
      // Sort the movie based on title
      return a.title.localeCompare(b.title);
    });
    console.log(display);
    searchResults = sorted;
    addContents(sorted);
  }
});
/**
 * Displays error messages in the UI.
 * @param {string} errorMessage - The error message to display.
 */
function displayError(errorMessage) {
  if (document.querySelector(".error") === null) {
    const val = document.createElement("h1");
    val.textContent = errorMessage;
    val.classList.add("error");
    document.body.append(val); // simple H1 error message that gets the job done
  } else {
    document.querySelector(".error").textContent = errorMessage;
  }
}
// basically removes everything on screen and resets search content
removeFilter.addEventListener("click", function () {
  removeContents();
  display = [];
  removeFilter.textContent = "";
  searchText.value = "";
});
// similar names but this one is responsible for clearing the filter range inputs
filterRemove.addEventListener("click", function () {
  bofa.value = 0;
  dofa.value = 10;
  // display = display;
  display = [];
});
// similar to render Movie above but with more details and a fancy google api call
// stuff inside is very redundant so not a lot of comments

/**
 * Renders a detailed view of a single movie.
 * @param {Object} movie - The movie object to render detailed view for.
 * Generic DOM manipulation not much to write here
 */
function renderSingleView(movie) {
  nowPlaying(movie.id)
    .then((data) => {
      const singleViewContainer = document.createElement("div");
      singleViewContainer.classList.add("single-view-container");

      const poster = document.createElement("img");
      poster.src = movie.bigPoster;
      poster.alt = movie.title;
      poster.classList.add("single-view-poster");
      singleViewContainer.append(poster);

      const title = document.createElement("h2");
      title.textContent = movie.title;
      singleViewContainer.append(title);

      const runtime = document.createElement("p");
      runtime.textContent = "Runtime: " + movie.runtime + " minutes";
      singleViewContainer.append(runtime);

      const tagline = document.createElement("p");
      tagline.textContent = "Tagline: " + movie.tagline;
      singleViewContainer.append(tagline);

      const tmdbLink = document.createElement("a");
      tmdbLink.href = movie.tmdbLink;
      tmdbLink.textContent = "TMDB Entry";
      tmdbLink.target = "blank";
      singleViewContainer.append(tmdbLink);

      const imdbLink = document.createElement("a");
      imdbLink.href = movie.imdbLink;
      imdbLink.textContent = "IMDB Entry";
      imdbLink.target = "blank";
      singleViewContainer.append(imdbLink);

      const overview = document.createElement("p");
      overview.textContent = "Overview: " + movie.overview;
      singleViewContainer.append(overview);

      const voteAverage = document.createElement("p");
      voteAverage.textContent = "TMDB Vote Average: " + movie.voteAverage;
      singleViewContainer.append(voteAverage);

      const voteCount = document.createElement("p");
      voteCount.textContent = "TMDB Vote Count: " + movie.voteCount;
      singleViewContainer.append(voteCount);

      const keywords = document.createElement("p");
      keywords.textContent = "Keywords: " + movie.keywords.join(", ");
      singleViewContainer.append(keywords);

      const genres = document.createElement("p");
      genres.textContent = "Genres: " + movie.genres.join(", ");
      singleViewContainer.append(genres);

      const castList = document.createElement("ul");
      castList.textContent = "Cast:";
      movie.cast.forEach((actor) => {
        // iterating over the cast array
        const listItem = document.createElement("li");
        listItem.textContent = `${actor.name} - ${actor.character}`;
        castList.append(listItem);
      });
      singleViewContainer.append(castList);

      const localFav = JSON.parse(localStorage.getItem("Favourites")) || [];
      const localToWatch = JSON.parse(localStorage.getItem("toWatch")) || [];

      const favouriteIndicator = document.createElement("p");
      const toWatchIndicator = document.createElement("p");
      const favresults = localFav.includes(movie.id);

      favouriteIndicator.textContent = "Set to Favourites ?  " + favresults;

      const tempVal = localToWatch.find((item) => item.id === movie.id)
        ? true // as explained above just checking local storage of towatc and fav values
        : false;
      toWatchIndicator.textContent = "Set to Watch? :" + tempVal;

      singleViewContainer.append(favouriteIndicator);
      singleViewContainer.append(toWatchIndicator);
      const blank = document.createElement("p");
      const calgaryInfo = document.createElement("p");
      const imgcontainer = document.createElement("div");
      imgcontainer.classList.add("theatre-maps");
      let value = "";
      for (const theatre of data.theatres) {
        // so what we do here is we iterate over the response we get from the now playing api and for earch theatre we find we pass it on to the google staic api and grab those images
        let mapImage = document.createElement("img");
        console.log(theatre.lat, theatre.long);
        mapImage.src = `https://maps.googleapis.com/maps/api/staticmap?center=${theatre.lat},${theatre.long}&zoom=17&size=500x500&key=AIzaSyCSfPTrE0q9xy-lvz5B55h9kVAjPw1Lh_A`;
        mapImage.alt = theatre.name;
        imgcontainer.append(mapImage);
        imgcontainer.append(blank);
        imgcontainer.append(theatre.name);
        value += theatre.name + " , ";
      }

      calgaryInfo.textContent = "Now Playing in Calgary: " + value;
      singleViewContainer.append(imgcontainer);
      singleViewContainer.append(calgaryInfo);

      const closeButton = document.createElement("button"); // this button removes the singlemovie container from the screen and resets the blurr effect we kept on the background
      closeButton.textContent = "Close";
      closeButton.addEventListener("click", function () {
        singleViewContainer.remove();
        const elementsToBlur = document.querySelector(".movieContainer");
        const secondElement = document.querySelector(".search-container");
        secondElement.classList.remove("blur-effect");
        elementsToBlur.classList.remove("blur-effect");
      });
      singleViewContainer.append(closeButton);

      document.body.append(singleViewContainer);
    })
    .catch((error) => {
      console.error("Error fetching Calgary info:", error);
    });
}

// Event delegation to handle Favourite and to watch button clicks
movieContainer.addEventListener("click", function (event) {
  const target = event.target;
  if (target.classList.contains("favButton")) {
    const movieId = parseInt(target.closest(".movie-card").dataset.movieId);
    toggleFavourite(movieId); // if fav button was clicked
  } else if (target.classList.contains("toWatchButton")) {
    const movieId = parseInt(target.closest(".movie-card").dataset.movieId);
    toggleToWatch(movieId); // if watch button
  } else {
    // this means that user clicked on the movie card objects which will redirect them to the single movie view page
    //https://stackoverflow.com/questions/29168719/can-you-target-an-elements-parent-element-using-event-target
    //https://stackoverflow.com/questions/48494416/get-child-element-from-event-target
    const movieName = event.target
      .closest(".movie-card")
      .querySelector("span[hidden]").textContent;
    console.log(movieName);
    singleMovieRequest(movieName).then((data) => {
      movie = new movies(data.data1, data.data2, data.data3);
      console.log(movie);

      console.log("from here");
      const elementsToBlur = document.querySelector(".movieContainer");
      const secondElement = document.querySelector(".search-container");
      elementsToBlur.classList.add("blur-effect");
      secondElement.classList.add("blur-effect");

      renderSingleView(movie);
    });
  }
});

/**
 * Toggles the favourite status of a movie.
 * @param {number} movieId - The ID of the movie to toggle favourite status.
 */
function toggleFavourite(movieId) {
  const movie = display.find((movie) => movie.id === movieId);
  if (movie) {
    movie.isFavourite = !movie.isFavourite;
    if (movie.isFavourite === true) {
      updateLocalStorage();
    } else {
      removeFromFavorites(movie.id);
    }
    // Re-render movie cards
    removeContents();
    addContents(display);
  }
}

/**
 * Toggles the to watch status of a movie.
 * @param {number} movieId - The ID of the movie to toggle to watch status.
 */
function toggleToWatch(movieId) {
  const movie = display.find((movie) => movie.id === movieId);
  if (movie) {
    console.log(movie.isToWatch);
    console.log("inside");
    movie.isToWatch = !movie.isToWatch;
    console.log(movie.isToWatch);

    if (movie.isToWatch === true) {
      updateLocalStorage();
      console.log("itemset");
    } else {
      removeFromToWatch(movie.id);
    }
    // Re-render movie cards
    removeContents();
    addContents(display);
  }
}

// Update local storage with updated favourites and toWatch lists
// This function retrieves movie data from the display array, filters out duplicates,
// and updates the corresponding lists in the local storage.
function updateLocalStorage() {
  let favouritesList = JSON.parse(localStorage.getItem("favourites")) || [];
  const favouritesMovies = display
    .filter((movie) => movie.isFavourite)
    .map((movie) => movie.id)
    .filter((id) => !favouritesList.includes(id));
  favouritesList = favouritesList.concat(favouritesMovies);
  localStorage.setItem("favourites", JSON.stringify(favouritesList));

  let toWatchList = JSON.parse(localStorage.getItem("toWatch")) || [];
  const toWatchMovies = display
    .filter((movie) => movie.isToWatch)
    .filter(
      (movie) =>
        !toWatchList.some((watchedMovie) => watchedMovie.id === movie.id),
    )
    .map((movie) => movie);
  toWatchList = toWatchList.concat(toWatchMovies);
  localStorage.setItem("toWatch", JSON.stringify(toWatchList));
}

/**
 * Removes a movie from the toWatch list in local storage.
 * @param {number} movieId - The ID of the movie to remove from the toWatch list.
 */
function removeFromToWatch(movieId) {
  let toWatchList = JSON.parse(localStorage.getItem("toWatch")) || [];
  const movieIndex = toWatchList.findIndex((movie) => movie.id === movieId);
  if (movieIndex !== -1) {
    toWatchList.splice(movieIndex, 1);
    localStorage.setItem("toWatch", JSON.stringify(toWatchList));
  }
}

/**
 * Removes a movie from the favourites list in local storage.
 * @param {number} movieId - The ID of the movie to remove from the favourites list.
 */
function removeFromFavorites(movieId) {
  let favouritesList = JSON.parse(localStorage.getItem("favourites")) || [];
  const movieIndex = favouritesList.findIndex((movie) => movie.id === movieId);
  if (movieIndex !== -1) {
    favouritesList.splice(movieIndex, 1);
    localStorage.setItem("favourites", JSON.stringify(favouritesList));
  }
}
