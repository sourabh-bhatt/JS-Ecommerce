const CART_LOCAL_STORAGE_KEY = "cart-items";

const smartphones = [
  {
    id: 1,
    title: "Samsung Galaxy Ultra Pro Max 1",
    image: "./assets/smartphones1.jpg",
    description: "lorem 200",
    rating: 4.2,
    price: 100,
  },
  {
    id: 2,
    title: "Samsung Galaxy Ultra Pro Max 2",
    image: "./assets/smartphones1.jpg",
    description: "lorem 200",
    rating: 4.2,
    price: 98,
  },
  {
    id: 3,
    title: "Samsung Galaxy Ultra Pro Max 3",
    image: "./assets/smartphones1.jpg",
    description: "lorem 200",
    rating: 4.2,
    price: 1700,
  },
];

const watches = [
  {
    id: 4,
    title: "Rado Premium watch 1",
    image: "./assets/watches1.jpg",
    description: "lorem 200",
    rating: 4.2,
    price: 10000,
  },
  {
    id: 5,
    title: "Rado Premium watch 2",
    image: "./assets/watches1.jpg",
    description: "lorem 200",
    rating: 4.2,
    price: 783.0,
  },
  {
    id: 6,
    title: "Rado Premium watch 3",
    image: "./assets/watches1.jpg",
    description: "lorem 200",
    rating: 4.2,
    price: 989.0,
  },
];

const clothes = [
  {
    id: 7,
    title: "Zara Exclusive 1",
    image: "./assets/clothes1.jpg",
    description: "lorem 200",
    rating: 4.2,
    price: 99.876,
  },
  {
    id: 8,
    title: "Zara Exclusive 2",
    image: "./assets/clothes1.jpg",
    description: "lorem 200",
    rating: 4.2,
    price: 140,
  },
  {
    id: 9,
    title: "Zara Exclusive 3",
    image: "./assets/clothes1.jpg",
    description: "lorem 200",
    rating: 4.2,
    price: 150,
  },
];

const smartphonesContainer = document.getElementById("smartphones-container");
const watchesContainer = document.getElementById("watches-container");
const clothesContainer = document.getElementById("clothes-container");

function createCard({ title, image, onClick }) {
  const containerElement = document.createElement("div");
  const titleElement = document.createElement("p");
  const imageElement = document.createElement("img");

  containerElement.className = "w-64 p-2";
  titleElement.className = "bg-green-800 text-white font-bold p-2";
  imageElement.className = "w-full h-48 object-cover";


  titleElement.innerText = title;

  imageElement.setAttribute("src", image);
  imageElement.setAttribute("alt", `${title} image`);

  containerElement.appendChild(imageElement);
  containerElement.appendChild(titleElement);

  containerElement.addEventListener("click", onClick);

  return containerElement;
}

for (const smartphone of smartphones) {
  const handleClick = () => openModal(smartphone);
  const card = createCard({ ...smartphone, onClick: handleClick });
  smartphonesContainer.appendChild(card);
}

for (const watch of watches) {
  const handleClick = () => openModal(watch);
  const card = createCard({ ...watch, onClick: handleClick });
  watchesContainer.appendChild(card);
}

for (const cloth of clothes) {
  const handleClick = () => openModal(cloth);
  const card = createCard({ ...cloth, onClick: handleClick });
  clothesContainer.appendChild(card);
}

function openModal(item) {
  const { title, image, price, rating, description, id } = item;
  const cartItem = (JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)) ?? []).find(item => item && item.id == id);

  const modalContainer = document.createElement("div");
  modalContainer.className =
    "h-[100%] w-[100%] flex items-center justify-center  absolute top-0 bg-gray-100/75 z-1";

  modalContainer.setAttribute("id", "modalContainer");

  const addToCartV1 = `
  <div id="add-to-cart-button-v1" class="${cartItem ? 'hidden' : ''}">
      <button type="button" class="rounded bg-blue-400 text-white p-3 text-lg font-bold" onclick="addItemToCart(${id}, '${title}', '${image}', ${price})">Add to Cart</button>
  </div>
  `;

  const addToCartV2 = `
  <div class="mt-4 flex ${cartItem ? '' : 'hidden'}" id="add-to-cart-button-v2">
        <button type="button" class="rounded bg-blue-400 text-white p-3 text-lg font-bold" onclick="decreaseCartItemQuantity(${id})">-</button>

        <span class="p-3" id="modal-item-quantity">${cartItem ? cartItem.quantity : 1}</span>
        
        <button type="button" class="rounded bg-blue-400 text-white p-3 text-lg font-bold" onclick="increaseCartItemQuantity(${id})">+</button>

  </div>
  `;

  modalContainer.innerHTML = `
        <div class=" relative bg-white" id="modal-content">
            <h1 class="bg-pink-700 text-white font-bold text-2xl">Product Details</h1>
            <p class="absolute right-0 top-0 text-white mr-3 text-2xl " onclick="closeModal()">X</p>
            <div class="below-details flex">
                <div class="lhs-image">
                    <img src="${image}" alt="Smartphone images" class="h-auto w-[250px]">
                </div>
                <div class="rhs-details ml-5">
                    <h1 class="font-bold text-2xl">${title}</h1>
                    <p><span class="font-bold text-1xl">Price: </span> $${price}</p>
                    <p><span class="font-bold text-1xl">Rating: </span>${rating}</p>
                    <p><span class="font-bold text-1xl">Description: </span>${description}</p>
                    ${addToCartV1}
                    ${addToCartV2}
                </div>

            </div>

        </div>
    `;

  modalContainer.addEventListener("click", (e) => {
    const modalContent = document.getElementById("modal-content");
    if (e.target.contains(modalContent)) {
      closeModal();
    }
  });

  document.body.appendChild(modalContainer);
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.remove();
  document.body.style.overflow = 'auto';
}

function addItemToCart(id, title, image, price) {
  
  const cartItems =
    JSON.parse(localStorage.getItem(CART_LOCAL_STORAGE_KEY)) ?? [];

  cartItems.push({ id, title, image, price, quantity: 1 });

  const addToCartv1 = document.getElementById('add-to-cart-button-v1');
  if (addToCartv1) addToCartv1.classList.add('hidden');

  const addToCartv2 = document.getElementById('add-to-cart-button-v2');
  if (addToCartv2) addToCartv2.classList.remove('hidden');

  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cartItems));

  // Add to cart toast
  showAddedToCartToast();

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
      if (currentItem.quantity === 0) {
        const addToCartv1 = document.getElementById('add-to-cart-button-v1');
        if (addToCartv1) addToCartv1.classList.remove('hidden');
      
        const addToCartv2 = document.getElementById('add-to-cart-button-v2');
        if (addToCartv2) addToCartv2.classList.add('hidden');

        // Fail toast
        showRemovedFromCartToast();

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

// Adding taost
function showToast(message, success = true) {
  const toastContainer = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = `bg-${success ? "green" : "red"}-400 p-2 text-white rounded-lg shadow-md mb-2`;
  toast.innerText = message;

  toastContainer.appendChild(toast);

  
  setTimeout(() => {
    toast.remove();
  }, 2000);
}

function showAddedToCartToast() {
  showToast("Item has been added to the cart");
}

function showRemovedFromCartToast() {
  showToast("Item has been removed from the cart", false);
}
