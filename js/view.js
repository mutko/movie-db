const id = sel => document.getElementById(sel);

const filmContainer = id('film');
const reviews = id('user-reviews');

const url = "https://baza-filmova.herokuapp.com/pokazi-film/";
const apikey = '2f0dbac0';

let placeholder = id('film');
let godina;
let naziv;
let slika;

let idFilma = location.search.substring(5);

function displayMovie(podatak) {
    console.log(podatak);

    godina = podatak.godina;
    naziv = podatak.naziv;
    slika = podatak.slika;
    placeholder.innerHTML += `
        <div id="movie" class="movie">
            <h3>${naziv} (${godina})</h3>
            <img src=${slika} alt="Movie poster" class="movie-img">
        </div>
    `;
}

function displayComments(movie) {

    let commentsPlaceholder = ``;

    if (movie.comments === undefined && movie.komentari === undefined) {
        reviews.innerHTML = `<p>No user reviews for this movie.</p>`;
    } else if (movie.comments === undefined) {
        movie.komentari.forEach( kom => {
            commentsPlaceholder += `
                <div class="review">
                    <p>Komentar ostavio <span class="user-name">${kom.user}</span></p>
                    <p>${kom.comment}</p>
                </div>
            `;
        });
        reviews.innerHTML = commentsPlaceholder;
    } else if (movie.komentari === undefined) {
        movie.comments.forEach( kom => {
            commentsPlaceholder += `
                <div class="review">
                    <p>Komentar ostavio <span class="user-name">${kom.user}</span></p>
                    <p>${kom.comment}</p>
                </div>
            `;
        });
        reviews.innerHTML = commentsPlaceholder;
    }
}
function displayMoreInfo(omdbInfo) {
    if (omdbInfo.Response === 'False') {
        id('movie').innerHTML += `
            <p>Nema dodatnih informacija o filmu</p>
        `;
    } else {
        let omdb = omdbInfo;
        console.log(omdb);
        let plot = omdb.Plot;
        let runtime = omdb.Runtime;
        let genre = omdb.Genre;
        let rating = omdb.imdbRating;
        let director = omdb.Director;
        let actors = omdb.Actors;
        
        id('movie').innerHTML += `
            <p>${runtime} | ${genre} | IMDB rating: ${rating}</p>
            <p>Storyline ${plot}</p>
            <p>Actors: ${actors}</p>
            <p>Director: ${director}</p>

        `; 
    }
}
fetch(url+idFilma)
    .then(response => response.json())
    .then(response => {
        displayMovie(response);
        displayComments(response);
        fetch(`https://www.omdbapi.com/?t=${naziv}&plot=full&apikey=${apikey}`)
            .then( response => response.json() )
            .then( response => {
                displayMoreInfo(response);
            })
    })