const id = sel => document.getElementById(sel);

const placeholder = id('single-movie');
const reviews = id('user-reviews');

const url = "https://baza-filmova.herokuapp.com/pokazi-film/";
const apikey = '2f0dbac0';

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
        <div id="movie" class="single-movie">
            <img src=${slika} alt="Movie poster" class="movie-img" width="300">
            <div id="content" class="content">
                <h3>${naziv} (${godina})</h3>
            </div>
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
                <dl class="review">
                    <dt class="user-name">${kom.user}</dt>
                    <dd>${kom.comment}</dd>
                </dl>
            `;
        });
        reviews.innerHTML = commentsPlaceholder;
    } else if (movie.komentari === undefined) {
        movie.comments.forEach( kom => {
            commentsPlaceholder += `
                <dl class="review">
                    <dt class="user-name">${kom.user}</dt>
                    <dd>${kom.comment}</dd>
                </dl>
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
        
        id('content').innerHTML += `
            <div class="content-inner">
                <div class="synopsis">
                    <p>Synopsis</p>
                    <p>${plot}</p>
                </div>     
                <ul class="list-info">
                    <li>
                        <span>Running time:</span>
                        <span>${runtime}</span>
                    </li>
                    <li>
                        <span>Genre:</span>
                        <span>${genre}</span>
                    </li>
                    <li>
                        <span>IMDB rating:</span>
                        <span>${rating}</span>
                    </li>
                    <li>
                        <span>Actors:</span>
                        <span>${actors}</span>
                    </li>
                    <li>
                        <span>Director:</span>
                        <span>${director}</span>
                    </li>
                </ul>
            </div>
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