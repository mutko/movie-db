const ws = new WebSocket('wss://baza-filmova.herokuapp.com')

ws.addEventListener('message', e => {
    console.log(e)
    console.log(e.data)
    let alertText = e.data
    document.body.insertAdjacentHTML('afterbegin', `<div class="alert">${alertText}</div>`)
})
