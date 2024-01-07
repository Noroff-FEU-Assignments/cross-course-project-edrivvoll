const productMain = document.querySelector(".product_main");
const querryString = document.location.search;
const params = new URLSearchParams(querryString);
const id = params.get("id");
const url = "https://api.noroff.dev/api/v1/square-eyes/" + id;

async function fetchProduct() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    document.title = `SquareEyes - ${json.title}`;

    price = json.price;
    if (json.onSale) {
      price = json.discountedPrice;
    }

    productMain.innerHTML = "";
    productMain.innerHTML = `
    <h1>product</h1>
      <div class="product_container">
        <div class="product_img" style="background-image: url(${json.image})"></div>
        <div class="product_info">
          <h2 class="h2">${json.title}</h2>
          <p class="p">
          ${json.description}
          <br>
          <br>
          Genre: ${json.genre}<br>
          Released: ${json.released}
          </p>
          <p class="price">NOK: ${price}</p>
          <div class="rating_and_cta">
            <div class="imdb">Rating: ${json.rating}</div>
            <a href="../checkout.html?id=${json.id}" class="cta product_cta">Watch NOW</a>
          </div>
          <div class="back">
            <a href="../movies.html" class="back cta">Back</a>
          </div>
        </div>
      </div>`
  } catch (error) {
    productMain.innerHTML = displayError();
  }
}

fetchProduct();