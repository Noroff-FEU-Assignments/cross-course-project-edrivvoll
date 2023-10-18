

const url = "https://api.noroff.dev/api/v1/square-eyes"

const resultsContainerTopRatad = document.querySelector(".top_rated");
const resultsContainerAction = document.querySelector(".action");
const resultsContainerComedy = document.querySelector(".comedy");
const resultsContainerHorror = document.querySelector(".horror");
const resultsContainerDrama = document.querySelector(".drama");
const resultsContainerForKids = document.querySelector(".for_kids");
const resultsContainerAllMovies = document.querySelector(".all_movies");

async function makeApiCall(cont) {

    const response = await fetch(url);

    const results = await response.json();

    const facts = results;

    for (let i = 0; i < facts.length; i++) {
        console.log(facts[i].title);
        cont.innerHTML += `<li>
                                            <a href="products/product.html"
                                            ><img
                                                src="${facts[i].image}"
                                                alt="Hobbs and Shaw poster"
                                                class="carousel_img full_img" /><img
                                                src="${facts[i].image}"
                                                alt="Hobbs and Shaw poster"
                                                class="carousel_img cut_img"
                                            /></a>
                                        </li>`
    }

}

makeApiCall(resultsContainerTopRatad);
makeApiCall(resultsContainerAction);
makeApiCall(resultsContainerComedy);
makeApiCall(resultsContainerHorror);
makeApiCall(resultsContainerDrama);
makeApiCall(resultsContainerForKids);
makeApiCall(resultsContainerAllMovies);