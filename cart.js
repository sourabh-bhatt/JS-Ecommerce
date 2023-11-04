const mainContainer = document.getElementById("main-container");
const CART_LOCAL_STORAGE_KEY = "cart-items";


let cartItems = JSON.parse(localStorage.getItem("cart-items"));

if (cartItems === null) {
  const pElement = document.createElement("p");
  pElement.innerText = "Cart is empty";

  mainContainer.appendChild(pElement);
} else {

  const cartItemsCount = cartItems.length;

  const itemCountElement = document.createElement("p");

  itemCountElement.innerHTML = `<span class="font-bold text-xl">${cartItemsCount}</span> Items in your cart`;

  // Insert to DOM
  mainContainer.appendChild(itemCountElement);

  for (const item of cartItems) {
    const element = document.createElement("div");
    element.id = `item-element-${item.id}`
    element.className = "flex justify-between border-2 border-black";
  
    const addToCartV2 = `
    <div class="mt-4 flex" id="add-to-cart-button-v2">
          <button type="button" class="rounded bg-blue-400 text-white p-3 text-lg font-bold" onclick="decreaseCartItemQuantity(${item.id})">-</button>
          <span class="p-3" id="modal-item-quantity">${item.quantity}</span>
          <button type="button" class="rounded bg-blue-400 text-white p-3 text-lg font-bold" onclick="increaseCartItemQuantity(${item.id})">+</button>
    </div>
    `;

    element.innerHTML = `
        <div class="lhs ">
                    <img src="${item.image}" alt="Smartphones">
                </div>
                <div class="rhs mr-[60%] mt-[4rem]">
                    <!-- This title needs to be changed -->
                    <h1>${item.title}</h1>
                    ${addToCartV2}
                    <!-- Price -->
                </div>
                <div class="price-details mr-[4rem] mt-[4rem]">
                    <span class="font-bold text-2xl">Price</span>
                    <p class="bg-gray-400 rounded font-bold p-3" id="price-${item.id}">$${item.price * item.quantity}</p>
                </div>
        `;

    mainContainer.appendChild(element);
  }

  const totalPriceElement = document.createElement("div");
  const totalPriceOfItems = cartItems.reduce(
    (prev, item) => (item.price * item.quantity) + prev,
    0
  );

  totalPriceElement.className =
    "total flex bg-purple-700 text-lg font-bold justify-between items-center pl-2 text-white";

  totalPriceElement.innerHTML = `
  <h1>Grand Total</h1>
  <p class="mr-[4rem] p-3" id="totalPrice">$${totalPriceOfItems}</p>
  `;

  mainContainer.appendChild(totalPriceElement);
}


function increaseCartItemQuantity(itemId) {
  const cartItems = (
    JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)) ?? []
  ).map((currentItem) => {
    if (!currentItem) return null;
    if (currentItem.id === itemId) {
      const modalItemQuantity = document.getElementById('modal-item-quantity');
      currentItem.quantity++;
      modalItemQuantity.innerText = currentItem.quantity;
      const priceContainer = document.getElementById(`price-${currentItem.id}`)
      priceContainer.innerText = currentItem.quantity * currentItem.price;

      const totalPriceContainer = document.getElementById('totalPrice');
      totalPriceContainer.innerText = `$${Number(totalPriceContainer.innerText.replace('$', '')) + currentItem.price}`;
    }
    return currentItem;
  });



  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
}

function decreaseCartItemQuantity(itemId) {
  let cartItems = (
    JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)) ?? []
  ).map((currentItem) => {
    if (!currentItem) return null;
    if (currentItem.id === itemId) {
      const modalItemQuantity = document.getElementById('modal-item-quantity');
      currentItem.quantity--;
      const priceContainer = document.getElementById(`price-${currentItem.id}`)
      priceContainer.innerText = currentItem.quantity * currentItem.price;

      const totalPriceContainer = document.getElementById('totalPrice');
      totalPriceContainer.innerText = `$${Number(totalPriceContainer.innerText.replace('$', '')) - currentItem.price}`;
      if (currentItem.quantity === 0) {
        const addToCartv1 = document.getElementById('add-to-cart-button-v1');
        if (addToCartv1) addToCartv1.classList.remove('hidden');
      
        const addToCartv2 = document.getElementById('add-to-cart-button-v2');
        if (addToCartv2) addToCartv2.classList.add('hidden');

        const cartItemElement = document.getElementById(`item-element-${currentItem.id}`);
        cartItemElement.remove();
        return null;
      }
      modalItemQuantity.innerText = currentItem.quantity;
    }
    return currentItem;
  });

  // Removing null items
  cartItems = cartItems.filter(Boolean);


  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cartItems));


}