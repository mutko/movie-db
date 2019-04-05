const id = sel => document.getElementById(sel);

const url = 'https://baza-filmova.herokuapp.com/filmovi/';

const placeholder = id('latest-movies');
const loader = id('loader');

let year;
let title;
let poster;
let movieId;

let allMovies = [];

function displayMovies(moviesArr) {

    moviesArr.sort(sortAddedDown);

    let fill = ``;

    loader.style.display = 'none';
    
    for (let i = 0; i < 10; i += 1) {
        
        year = moviesArr[i].godina;
        title = moviesArr[i].naziv;
        poster = moviesArr[i].slika;
        movieId = moviesArr[i]._id;

        fill += `
            <div class="movie">
                <a href="movie/view.html?_id=${movieId}" title="More info about this movie">
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


function sortAddedDown(b, a) {
    a = a.dodat.substr(0,19);
    b = b.dodat.substr(0,19);
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
}

fetch(url)
    .then( reply => reply.json() )
    .then( reply => {
        allMovies = reply;
        displayMovies(allMovies);        
    })