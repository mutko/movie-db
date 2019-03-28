const id = s => document.getElementById(s);

const url = 'https://baza-filmova.herokuapp.com/dodaj-film/';

const poster = id('poster-url');
const posterPrev = id('poster-prev');
const submitBtn = id('submit');

poster.addEventListener('input', function() {
    posterPrev.setAttribute('src', poster.value);
});

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const movieData = {
        naziv:  id('title').value,
        godina: id('year').value,
        slika: poster.value
    };

    fetch(url, {
        method: 'POST',
        headers:  {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movieData)
    })
        .then( reply => reply.text() )
        .then( reply => {
            console.log(reply);
            let alertText = reply;
            document.body.insertAdjacentHTML('beforeend', `<div class="alert">${alertText}</div>`)
        })
});


