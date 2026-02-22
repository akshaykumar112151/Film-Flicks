let left_btn = document.getElementsByClassName('bi-chevron-left')[0];
let right_btn = document.getElementsByClassName('bi-chevron-right')[0];
let cards = document.getElementsByClassName('cards')[0];
let search = document.getElementsByClassName('search')[0];
let searchInput = document.getElementById('search_input');

left_btn.addEventListener('click', () => {
    cards.scrollLeft -= 140;
});
right_btn.addEventListener('click', () => {
    cards.scrollLeft += 140;
});

let json_url = "movie.json";


fetch(json_url).then((response) => response.json())
    .then((data) => {
        // Populate the cards section
        data.forEach((ele) => {
            let { name, imdb, date, sposter, bposter, genre, bookingURL } = ele; // Destructure bookingURL from ele
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = bookingURL; // Assign bookingURL as the href for the card
            card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card">
                    <img src="${bposter}" alt="${name}">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                        </div>
                    </div>
                </div>
            `;
            cards.appendChild(card);
        });
        

        // Search functionality
        searchInput.addEventListener('input', (e) => {
            let searchTerm = e.target.value.toLowerCase();
            search.innerHTML = ""; // Clear previous search results

            let filteredMovies = data.filter(movie =>
                movie.name.toLowerCase().includes(searchTerm) ||
                movie.genre.toLowerCase().includes(searchTerm)
            );

            // Display matching movies
            filteredMovies.forEach((movie) => {
                let { name, imdb, date, sposter, genre, url } = movie;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = url;
                card.innerHTML = `
                    <img src="${sposter}" alt="${name}">
                    <div class="cont">
                        <h3>${name}</h3>
                        <p>${genre}, ${date} , <span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</p>
                    </div>
                `;
                search.appendChild(card);
            });

            // Show message if no results found
            if (filteredMovies.length === 0) {
                search.innerHTML = "<p>No movies found.</p>";
            }
        });

        searchInput.addEventListener('input', () => {
            let filter = searchInput.value.toUpperCase();
            let movieCards = search.getElementsByTagName('a');
        
            for (let index = 0; index < movieCards.length; index++) {
                let cardContent = movieCards[index].getElementsByClassName('cont')[0];
                let textValue = cardContent.textContent || cardContent.innerText;
        
                if (textValue.toUpperCase().indexOf(filter) > -1) {
                    movieCards[index].style.display = "flex";
                    search.style.visibility = "visible";
                    search.style.opacity = 1;
                } else {
                    movieCards[index].style.display = "none";
                }
            }
        
            // Hide search results if the input is empty
            if (searchInput.value === "") {
                search.style.visibility = "hidden";
                search.style.opacity = 0;
            }
        });
        


        let video = document.getElementsByTagName('video')[0];
        let play = document.getElementById('play'); 
        play.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            play.innerHTML = `Pause <i class="bi bi-pause-fill"></i>`;
        } else {
            video.pause();
            play.innerHTML = `Watch <i class="bi bi-play-fill"></i>`;
         }
    });


    let seriesBtn = document.getElementById('series');
    let moviesBtn = document.getElementById('movies');
    let kidsBtn = document.getElementById('kids');

    seriesBtn.addEventListener('click', () => {
        cards.innerHTML = ''; // Clear cards section
    
        let seriesArray = data.filter(movie => movie.type === 'series');
        if (seriesArray.length === 0) {
            cards.innerHTML = "<p>No series found.</p>"; // Optional message if no series are found
        }
        seriesArray.forEach((ele) => {
            let { name, imdb, date, sposter, bposter, genre, url } = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card">
                    <img src="${bposter}" alt="${name}">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                        </div>
                    </div>
                </div>
            `;
            cards.appendChild(card);
        });
    });
    
    moviesBtn.addEventListener('click', () => {
        cards.innerHTML = ''; // Clear cards section
    
        let moviesArray = data.filter(movie => movie.type === 'movies');
        if (moviesArray.length === 0) {
            cards.innerHTML = "<p>No movies found.</p>"; // Optional message if no movies are found
        }
        moviesArray.forEach((ele) => {
            let { name, imdb, date, sposter, bposter, genre, url } = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card">
                    <img src="${bposter}" alt="${name}">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                        </div>
                    </div>
                </div>
            `;
            cards.appendChild(card);
        });
    });
    
    kidsBtn.addEventListener('click', () => {
        cards.innerHTML = ''; // Clear cards section
    
        let kidsArray = data.filter(movie => movie.type === 'kids');
        if (kidsArray.length === 0) {
            cards.innerHTML = "<p>No kids' content found.</p>"; // Optional message if no kids content is found
        }
        kidsArray.forEach((ele) => {
            let { name, imdb, date, sposter, bposter, genre, url } = ele;
            let card = document.createElement('a');
            card.classList.add('card');
            card.href = url;
            card.innerHTML = `
                <img src="${sposter}" alt="${name}" class="poster">
                <div class="rest_card">
                    <img src="${bposter}" alt="${name}">
                    <div class="cont">
                        <h4>${name}</h4>
                        <div class="sub">
                            <p>${genre}, ${date}</p>
                            <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                        </div>
                    </div>
                </div>
            `;
            cards.appendChild(card);
        });
    });
});    