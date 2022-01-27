async function getDataMovies(query) {
    let url = 'https://imdb-api.com/API/AdvancedSearch/k_x2rr85bg?groups=now-playing-us';
        if (query) {
        url = `https://imdb-api.com/API/AdvancedSearch/k_x2rr85bg?title=${query}&count=10`;  // api: [k_042uslfp]  [k_x2rr85bg]
    }

    const res = await fetch(url);
    const data = await res.json();

    document.querySelectorAll('.movie-block').forEach((item) => {
        item.remove();
    });

    data.results.slice(0, 10).forEach((item) => {
        createForm(item);
    });

    addEvent();
}

function createForm(movie) {
    let block = document.createElement('div');
    block.className = 'movie-block';

    block.append(createBackground(movie));
    block.append(getRating(movie));
    block.append(getInfoMovie(movie));

    container.append(block);
}

function createBackground(movie) {
    let background = document.createElement('div');
    background.className = 'movie-block__background';
    background.style.backgroundImage = `url('${movie.image}')`;

    let a = document.createElement('a');
    a.href = `https://www.imdb.com/title/${movie.id}/`;
    a.target = '_blank';
    a.className = 'link-imdb';
    a.append(background);

    return a;
}

function getRating(movie) {
    let rating = document.createElement('div');
    rating.className = 'rating';
    rating.innerHTML = `${movie.imDbRating}`;

    if (Number(movie.imDbRating) >= 7) {
        rating.classList.add('rating-big');
    } else if (Number(movie.imDbRating) >= 5) {
        rating.classList.add('rating-medium');
    } else {
        rating.classList.add('rating-little');
    }

    return rating;
}

function getInfoMovie(movie) {
    let infoMovie = document.createElement('div');

    infoMovie.className = 'info-movie';
    infoMovie.append(getTitle(movie));
    infoMovie.append(getPlotInfo(movie));
    infoMovie.append(getGenres(movie));
    infoMovie.append(getStars(movie));
    infoMovie.append(watchMovie(movie));
    return infoMovie;
}

function getTitle(movie) {
    let h3 = document.createElement('h3');
    h3.className = 'movie-title';
    h3.textContent = `${movie.title}`;
    return h3;
}

function getPlotInfo(movie) {
    let plotInfo = document.createElement('div');
    plotInfo.className = 'plot-info';
    plotInfo.textContent = movie.plot;
    return plotInfo;
}

function getGenres(movie) {
    let genres = document.createElement('p');
    genres.className = 'genres-movie';
    genres.innerHTML = `<span class="genres-title">Genres:</span> <span class="genres-info">${movie.genres}</span>`;
    return genres;
}


function getStars(movie) {
    let stars = document.createElement('p');
    stars.className = 'stars-movie';
    let starList = movie.starList
        .slice(1)
        .map((name) => name.name)
        .join(', ');
    stars.innerHTML = `<span class="stars-title">Stars:</span> <span class="stars-info">${starList}</span>`;

    return stars;
}

function watchMovie(movie) {
    let button = document.createElement('div');
    button.className = 'button-watch-movie';
    button.textContent = 'Watch Movie';

    let a = document.createElement('a');
    a.className = 'link-watch-movie';
    a.href = `https://rezka.ag/search/?do=search&subaction=search&q=${movie.title}`;
    a.target = '_blank';
    a.append(button);

    return a;
}

function addEvent() {
    movieBlocks = document.querySelectorAll('.movie-block');
    movieBlocks.forEach((item) => {
        item.addEventListener('mouseenter', function (e) {
            increaseHeight(e, 'enter');
        });
        item.addEventListener('mouseleave', function (e) {
            increaseHeight(e, 'leave');
        });
    });
}

function increaseHeight(event, mouse) {
    let movieBlock = event.target;
    let info = Array.from(movieBlock.childNodes).find((item) => {
        if (item.classList.contains('info-movie')) return true;
    });
    let heightAdd = info.clientHeight;

    if (mouse === 'enter') {
        movieBlock.style.height = `${heightAdd + 410}px`;
    }

    if (mouse === 'leave') {
        movieBlock.style.height = ``;
    }
}

let queryForm = document.querySelector('.header__search');
let container = document.querySelector('.main__container');
let movieBlocks = 0;

queryForm.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        getDataMovies(queryForm.value);
    }
});

getDataMovies();