const productMain = document.querySelector(".product_main");
const querryString = document.location.search;
const params = new URLSearchParams(querryString);
const id = params.get("id");
const url = "https://api.noroff.dev/api/v1/square-eyes/" + id;

async function fetchProduct() {
    try {
        const response = await fetch(url);
        const json = await response.json();
        document.title = `SquareEyes - ${json.title} - Checkout`;

        price = json.price;
        if (json.onSale) {
            price = json.discountedPrice;
        }

        productMain.innerHTML = "";
        productMain.innerHTML = `
        <div class="product_container checkout_success">
        <div class="product_img" style="background-image: url(${json.image})"></div>
        <div class="checkout_form">
          <h1>checkout</h1>
          <form action="checkout.php" method="post">
            <fieldset>
              <legend></legend>
              <label class="" for="first-name">First name:</label>
              <input class="" type="text" id="first-name" name="first-name" />
              <label class="" for="last-name">Last name:</label>
              <input class="" type="text" id="last-name" name="last-name" />
              <label class="" for="email">E-mail:</label>
              <input class="" type="email" id="email" name="email" />
              <label class="" for="phone">Phone number:</label>
              <input class="" type="tel" id="phone" name="phone" />
            </fieldset>
            <fieldset>
              <legend></legend>
              <label for="card-number">Card number:</label>
              <input type="text" id="card-number" name="card-number" />
              <label for="card-name">Cardholder name:</label>
              <input type="text" id="card-name" name="card-name" />
              <label for="expire">Expire date:</label>
              <input type="date" id="expire" name="expire" />
              <label for="cvc">CVC:</label>
              <input type="text" id="cvc" name="cvc" />
            </fieldset>
            <fieldset id="fieldset-pay">
              <legend></legend>
              <p>The card will be charged: <span class="price">nok 49</span></p>
              <a href="#" class="cta checkout_cta">Pay NOW</a>
            </fieldset>
          </form>
        </div>
      </div>
      <div class="box_success">
        <img src="/images/check_sign.jpg" alt="green check sign" />
        <p>Payment sucsessfull!</p>
        <a href="/index.html" class="cta">Start Watching</a>
      </div>`
    } catch (error) {
        productMain.innerHTML = displayError();
    }
}

fetchProduct();