document.getElementById('toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.getElementById('nav-overlay').classList.toggle('open');
})