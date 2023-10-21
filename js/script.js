

const url = "https://api.noroff.dev/api/v1/square-eyes"

const carousellContainer = document.querySelector(".carousell-container")

const movieCategories = ["top rated", "action", "comedy", "horror", "drama", "kids"]

function createCategories() {

    for (i = 0; i < movieCategories.length; i++) {
        /* console.log(movieCategories[i].replace(" ", "_")) */
        carousellContainer.innerHTML += `
                    <div class="carousel">
                        <h2>${movieCategories[i]}</h2>
                        <ul class="${movieCategories[i].replace(" ", "_")} carousel_ul" >
                        </ul>
                    </div>
        `
    }
}

createCategories();


const resultsContainerTopRatad = document.querySelector(".top_rated");
const resultsContainerAction = document.querySelector(".action");
const resultsContainerComedy = document.querySelector(".comedy");
const resultsContainerHorror = document.querySelector(".horror");
const resultsContainerDrama = document.querySelector(".drama");
const resultsContainerForKids = document.querySelector(".kids");

async function makeApiCall(cont) {

    const response = await fetch(url);
    const results = await response.json();
    const facts = results;

    for (let i = 0; i < facts.length; i++) {
        if (facts[i].genre.toLowerCase() === cont.className.split(" ")[0]) {
            cont.innerHTML +=
                `<li>
                <a href="products/product.html">
                <img
                    src="${facts[i].image}"
                    alt="${facts[i].title}"
                    class="carousel_img full_img" /><img
                    src="${facts[i].image}"
                    alt="${facts[i].title}"
                    class="carousel_img cut_img"/>
                </a>
                </li>`
        }
    }
}

async function getTopRated() {

    const response = await fetch(url);
    const results = await response.json();
    const facts = results;

    for (let i = 0; i < facts.length; i++) {
        if (parseFloat(facts[i].rating) >= 6) {
            resultsContainerTopRatad.innerHTML +=
                `<li>
                <a href="products/product.html">
                <img
                    src="${facts[i].image}"
                    alt="${facts[i].title}"
                    class="carousel_img full_img" /><img
                    src="${facts[i].image}"
                    alt="${facts[i].title}"
                    class="carousel_img cut_img"/>
                </a>
               </li>`
        }

    }
}

getTopRated();

// ------------------------------------------------------

function createCarousel() {
    makeApiCall(resultsContainerTopRatad);
    makeApiCall(resultsContainerAction);
    makeApiCall(resultsContainerComedy);
    makeApiCall(resultsContainerHorror);
    makeApiCall(resultsContainerDrama);
    makeApiCall(resultsContainerForKids);
}

// -------------------------------------------------


createCarousel()

console.log()