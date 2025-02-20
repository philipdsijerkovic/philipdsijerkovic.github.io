function addAndDisplay(event) {
    const button = event.currentTarget; // get current element clicked
    const card = button.closest('.card'); // get the parent card of the button
    let itemName = card.querySelector('.item-name').textContent; // take the text of the item-name
    let itemPrice = card.querySelector('.item-price').textContent; // take the text of the item-price

    const cartItem = document.createElement('div'); // create a new div for the cart item
    cartItem.classList.add('shopping-cart-item');  // add the class shopping-cart-item to the div

    const name = document.createElement('p'); // create a new p element for the name
    name.classList.add('item-name', 'roboto-font'); // add item-name and our roboto font to the p tag
    name.textContent = itemName; // copy the name from the initial card to the new one

    const price = document.createElement('p'); // create a new p element for the price
    price.classList.add('item-price', 'roboto-font'); // add item-price and our roboto font to the p tag
    price.textContent = itemPrice; // copy the price from the initial card to the new one

    const deleteButton = document.createElement('button'); // create a new button element for delete
    deleteButton.classList.add('delete-button', 'roboto-font', 'red'); // add delete-button and styling classes to new button
    deleteButton.textContent = 'X'; // set the text of the delete button

    deleteButton.addEventListener('click', () => {
        cartItem.remove();     // add an event listener to the delete button to remove the cart item
    });

    cartItem.appendChild(name);  // add the name to the cart item
    cartItem.appendChild(price); // add the price to the cart item
    cartItem.appendChild(deleteButton); // add the delete button to the cart item

    const shoppingCartList = document.getElementById('shopping-cart-list'); // select the shopping cart list
    shoppingCartList.appendChild(cartItem); // finally, add the cart item to the visual shopping cart
}

function shoppingCart() {
    const addButtons = document.querySelectorAll('.add-button'); // select the add buttons on the page

    addButtons.forEach(button => {
        button.addEventListener('click', addAndDisplay); // add an event listener to each add button
    });
}

shoppingCart();