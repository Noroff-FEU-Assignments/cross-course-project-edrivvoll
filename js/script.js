const url = "http://cms.drivvoll.no/wp-json/wc/store/products/"
const carouselContainer = document.querySelector(".carousel-container")
const movieCategories = ["top rated", "action", "comedy", "horror", "drama", "kids"]
carouselContainer.innerHTML = "";

function createCategories() {
    for (i = 0; i < movieCategories.length; i++) {
        carouselContainer.innerHTML += `
                    <div class="carousel">
                        <h2>${movieCategories[i]}</h2>
                        <ul class="${movieCategories[i].replace(" ", "_")} carousel_ul" >
                        <li><div class="lds-ring"><div></div><div></div><div></div><div></div></div>
                        </ul>
                    </div>` /* Loading wheel from https://loading.io/css/ */
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
    try {
        const response = await fetch(url);
        const results = await response.json();
        cont.innerHTML = `<div class="lds - ring"><div></div><div></div><div></div><div></div></div>`;

        for (let i = 0; i < results.length; i++) {
            if (results[i].attributes[0].terms[0].name.toLowerCase() === cont.className.split(" ")[0]) {
                
                price = results[i].prices.price / 100
                if (results[i].onSale) {
                    price = results[i].prices.sale_price
                }
                
                cont.innerHTML += `
                <li>
                <a href="products/product.html?id=${results[i].id}">
                    <img 
                        src="${results[i].images[0].src}"
                        alt = "${results[i].name}"
                        class="carousel_img full_img" title = "${results[i].name}. ${results[i].images[0].alt} NOK: ${price},-" /> 
                <img
                src="${results[i].images[0].src}"
                alt="${results[i].name}"
                class="carousel_img cut_img" title="${results[i].name}. ${results[i].images[0].alt} NOK: ${price},-" />
                </a >
                </li > `
            }
        }
    }
    catch (error) {
        cont.innerHTML = displayError();
    }
}

async function getTopRated() {
    try {
        const response = await fetch(url);
        const results = await response.json();
        resultsContainerTopRatad.innerHTML = "";

        for (let i = 0; i < results.length; i++) {
            if (parseFloat(results[i].attributes[1].terms[0].name) >= 6) {

                price = results[i].prices.price / 100
                if (results[i].onSale) {
                    price = results[i].prices.sale_price
                }

                resultsContainerTopRatad.innerHTML += `
                <li>
                <a href="products/product.html?id=${results[i].id}">
                    <img
                        src="${results[i].images[0].src}"
                        alt="${results[i].title}"
                        class="carousel_img full_img" title="${results[i].name}. ${results[i].images[0].alt} NOK: ${price},-" />
                    <img
                        src="${results[i].images[0].src}"
                        alt="${results[i].title}"
                        class="carousel_img cut_img" title="${results[i].name}. ${results[i].images[0].alt} NOK: ${price},-" />
                </a>
               </li> `
            }
        }
    }
    catch (error) {
        resultsContainerTopRatad.innerHTML = displayError();
    }
}

function createCarousel() {
    getTopRated();
    makeApiCall(resultsContainerAction);
    makeApiCall(resultsContainerComedy);
    makeApiCall(resultsContainerHorror);
    makeApiCall(resultsContainerDrama);
    makeApiCall(resultsContainerForKids);
}

createCarousel()