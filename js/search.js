const id = sel => document.getElementById(sel);

const searchField = id('search');
const yearUp = id('yearUp');
const yearDown = id('yearDown');
const titleUp = id('titleUp');
const titleDown = id('titleDown');
const url = 'https://baza-filmova.herokuapp.com/filmovi/';
const placeholder = document.getElementById('all-movies');

let year;
let title;
let poster;
let movieId;
let allMovies = [];

// let select = id('num-to-display');
// let num = +select.value;

function displayMovies(moviesArr) {

    let fill = ``;

    for (let i = 0; i < moviesArr.length; i += 1) {
        
        year = moviesArr[i].godina;
        title = moviesArr[i].naziv;
        poster = moviesArr[i].slika;
        movieId = moviesArr[i]._id;

        fill += `
            <div class="movie">
                <a href="view.html?_id=${movieId}" title="More info about this movie">
                    <img src=${poster} alt="Movie poster">
                    <div class="movie-overlay">
                        <div class="text-wrapper">
                            <h4>${title}</h4>
                            <p>${year}</p>
                        </div>
                    </div>
                </a>
            </div>
        `
    }

    placeholder.innerHTML = fill;
}

function sortYearUp(a, b) {
    if (a.godina < b.godina)
        return -1;
    if (a.godina > b.godina)
        return 1;
    return 0;
}
function sortYearDown(b, a) {
    if (a.godina < b.godina)
        return -1;
    if (a.godina > b.godina)
        return 1;
    return 0;
}
function sortTitleUp(a, b) {
    if (a.naziv.toLowerCase().trim() < b.naziv.toLowerCase().trim())
      return -1;
    if (a.naziv.toLowerCase().trim() > b.naziv.toLowerCase().trim())
      return 1;
    return 0;
}
function sortTitleDown(b, a) {
    if (a.naziv.toLowerCase().trim() < b.naziv.toLowerCase().trim())
      return -1;
    if (a.naziv.toLowerCase().trim() > b.naziv.toLowerCase().trim())
      return 1;
    return 0;
}

fetch(url)
    .then( reply => reply.json() )
    .then( reply => {
        console.log(reply);
        allMovies = reply;
        displayMovies(allMovies);        
    })

searchField.addEventListener('input', () => {
    let searchResults = allMovies.filter( film => film.naziv.toLowerCase().includes(searchField.value.toLowerCase() ));
    console.log(searchResults);
    displayMovies(searchResults);
});
yearUp.addEventListener('click', () => {
    allMovies.sort(sortYearUp);
    displayMovies(allMovies);
});
yearDown.addEventListener('click', () => {
    allMovies.sort(sortYearDown);
    displayMovies(allMovies);
});
titleUp.addEventListener('click', () => {
    allMovies.sort(sortTitleUp);
    displayMovies(allMovies);
});
titleDown.addEventListener('click', () => {
    allMovies.sort(sortTitleDown);
    displayMovies(allMovies);
});

// select.addEventListener('change', () => {

//     num = +select.value;
//     if (select.value === 'all') {
//         num = allMovies.length;
//     }
//     console.log(num)
//     // displayMovies(num)
// });

//  .catch(reply => console.log('There is error somewhere!') )
