// The Normal format (Sigma)
// const movieTitleInput = document.getElementById("movie-title-input")
// const movieResultContainer = document.getElementById("movie-result")

// async function fetchMovieData(movieTitle) {
//   const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=258a2345`);
//   const data = await response.json();
//   return data;
// }

// function formatMovieData(movieData) {
//   const movieTitle = movieData.Title;
//   const movieYear = movieData.Year;
//   const movieReleased = movieData.Released;
//   const moviePoster = movieData.Poster;
//   const movieDirector = movieData.Director;
//   const movieRatings = movieData.Ratings;
//   const moviePlot = movieData.Plot;
//   const formatedData = `
//     <h2>${movieTitle} (${movieYear})</h2>
//     <img src="${moviePoster}" alt="${movieTitle} poster">
//     <p>Director: ${movieDirector}</p>
//     <p>Released: ${movieReleased}</p>
//     <p>Rating: ${movieRatings[0].Value}</p>
//     <p>The Plot: ${moviePlot}</p>
//     `;
//   return formatedData;
// }

// function displayMovieData(movieTitle){
//   fetchMovieData(movieTitle)
//   .then((movieData) => {
//     const formatedData = formatMovieData(movieData);
//     movieResultContainer.innerHTML = formatedData;
//   })
//   .catch((error) => {
//     movieResultContainer.innerHTML = "Movie not found";
//   });
// }

// function findMovie() {
//   const movieTitle = movieTitleInput.value;
//   displayMovieData(movieTitle);
// }

const movieTitleInput = document.getElementById("movie-title-input");
const movieResultContainer = document.getElementById("movie-result");
const tableHead = document.querySelector("#movieTable thead");

// fetch the data from the API
async function fetchMovieData(movieTitle) {
  const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=258a2345`);
  const data = await response.json();
  return data;
}

function formatMovieData(movieData) {
  const movieTitle = movieData.Title;
  const movieYear = movieData.Year;
  const moviePoster = movieData.Poster;
  const movieReleased = movieData.Released;
  const movieDirector = movieData.Director;
  const movieRatings = movieData.Ratings;
  const moviePlot = movieData.Plot;

  const movieDetails = document.getElementById("movieTable").getElementsByTagName("tbody")[0];
  movieDetails.innerHTML = ""; // To clear the table

  // will show the movie title, year and poster first (outside the table)
  const formatedData = `
    <h2>${movieTitle} (${movieYear})</h2>
    <br>
    <img src="${moviePoster}" alt="${movieTitle} poster">
  `;

  movieResultContainer.innerHTML = formatedData; // Display the first part

  // will show the rest of the detail in the table
  const formatedData2 = document.createElement("tr");
  formatedData2.innerHTML = `
    <td>${movieDirector}</td>
    <td>${movieReleased}</td>
    <td>${movieRatings[0].Value}</td>
    <td>${moviePlot}</td>
  `;
  movieDetails.appendChild(formatedData2); // Display the second part

  // Show the table head after displaying movie details
  tableHead.classList.remove("hidden");
}

function displayMovieData(movieTitle){
  fetchMovieData(movieTitle)
  .then((movieData) => {
    formatMovieData(movieData);
  })
  .catch((error) => {
    movieResultContainer.innerHTML = "Movie not found";
  });
}

function findMovie() {
  const movieTitle = movieTitleInput.value;
  displayMovieData(movieTitle);
}
