const ws = new WebSocket('wss://baza-filmova.herokuapp.com')

ws.addEventListener('message', function() {
    document.getElementById('alert').classList.add('active');
    document.getElementById('close').addEventListener('click', function() {
        document.getElementById('alert').classList.remove('active');
    })
})
