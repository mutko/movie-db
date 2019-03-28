// login
const userName = id('user');
const password = id('password');
const submitLogin = id('submit-login');
let moviesList = document.getElementsByClassName('movie');
let alertList = 'list';

submitLogin.addEventListener('click', function(e) {
    e.preventDefault();

    if ( userName.value.toLowerCase() === 'admin' ) {
        alert('Logged in!');
        moviesList = [...moviesList];
        moviesList.forEach( x => {
            x.insertAdjacentHTML('afterbegin', `<span class="alert">X</span>`)
        })

        alertList = [...document.getElementsByClassName('alert')];

        alertList.forEach( x => {
            x.onclick = function(e) {
                deleteMovie(e);
            };
        });

    } else {
        alert("Wrong credentials!");
    }; 

});

function deleteMovie(elem) {
    let warning = confirm('Are you sure? This action can NOT be undone!');

    if (warning) {
        let link = elem.target.nextElementSibling;
        let movieId = link.href.substring(link.href.length - 24);

        fetch('https://baza-filmova.herokuapp.com/obrisi-film/', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( {id: movieId} )
        })
            .then( reply => reply.text() )
            .then( reply => {
                console.log(reply);
                alert('The movies is successfully deleted!');
            })

        let target = elem.target.parentNode;
        target.style.display = "none";
    }
}