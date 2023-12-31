const { encryptData } = require("../utils/hash");

const handlerStripe = async (phone = '', email = '', name = '', categoria='', rama='') => {

  const stripeApiBase64 = process.env.STRIPE_SK
  const priceId = process.env.PRODUCT_ID;
  const FRONT_URL = process.env.FRONT;

  console.log(stripeApiBase64)
  console.log(priceId)
  console.log(FRONT_URL)
  console.log(phone)
  console.log(email)
  console.log(name)
  console.log(categoria)
  console.log(rama)

  const URL = `https://api.stripe.com/v1/checkout/sessions`;

  const headerObject = new Headers();
  headerObject.append("Content-Type", "application/x-www-form-urlencoded");
  headerObject.append("Authorization", `Bearer ${stripeApiBase64}`);


  const urlencoded = new URLSearchParams();
  urlencoded.append("line_items[0][price]", priceId);
  urlencoded.append("line_items[0][quantity]", "1");
  urlencoded.append("allow_promotion_codes", "false");
  urlencoded.append("customer_creation", "always");
  urlencoded.append("success_url", `${FRONT_URL}/api/callback?p=${encryptData(`${phone}__success__${email}__${name}__${categoria}__${rama}`)}`);
  urlencoded.append("cancel_url", `${FRONT_URL}/api/callback?p=${encryptData(`${phone}__fail__${email}__${name}`)}`);
  urlencoded.append("mode", "payment");
  urlencoded.append("customer_email", email);
  
  const requestOptions = {
    method: "POST",
    headers: headerObject,
    body: urlencoded,
  };


  const stripeRequest = await fetch(URL, requestOptions);
  const response = await stripeRequest.json();
  return response
};

module.exports = { handlerStripe };
