const productMain = document.querySelector(".product_main");
const querryString = document.location.search;
const params = new URLSearchParams(querryString);
const id = params.get("id");
const url = "http://cms-ca.local/wp-json/wc/store/products/" + id;

async function fetchProduct() {
  try {
    const response = await fetch(url);
    const json = await response.json();
    document.title = `SquareEyes - ${json.name}`;

    price = json.prices.price / 100;
    if (json.onSale) {
      price = json.prices.sale_price;
    }

    productMain.innerHTML = "";
    productMain.innerHTML = `
    <h1>product</h1>
      <div class="product_container">
        <div class="product_img" style="background-image: url(${json.images[0].src})"></div>
        <div class="product_info">
          <h2 class="h2">${json.name}</h2>
          <p class="p">
          ${json.description}
          <br>
          <br>
          Genre: ${json.attributes[0].terms[0].name}<br>
          Released: ${json.attributes[2].terms[0].name}
          </p>
          <p class="price">NOK: ${price}</p>
          <div class="rating_and_cta">
            <div class="imdb">Rating: ${json.attributes[1].terms[0].name}</div>
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