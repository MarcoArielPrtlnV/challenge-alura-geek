const d = document;

//Cart
let cartIcon = d.getElementById("cart-icon");

const cart = d.querySelector(".cart");

const closeCart = d.getElementById("close-cart");


//Functions

const ready = () => {

    //Remove items from cart 
    let removeCartButtons = d.getElementsByClassName('cart-remove');

    console.log(removeCartButtons);

    for(var contador = 0; contador < removeCartButtons.length; contador++){

        console.log(removeCartButtons.length);
        

        var button = removeCartButtons[contador];

        button.addEventListener('click', removeCartItem);
    }


    //Quantity change

    let quantityInputs = d.getElementsByClassName('cart-quantity');
    for(var contador = 0; contador < quantityInputs.length; contador++){

        let input = quantityInputs[contador];
        input.addEventListener('change', quantityChanged);
    }

    //Add to cart 

    let addCart = d.getElementsByClassName('add-cart');

    for(var contador = 0; contador < addCart.length; contador++){

        let button = addCart[contador];
        button.addEventListener('click', addCartClicked);
    }


        //Buy button

     const buyButtonClicked = () =>{

            alert('Your order is on its way!');
            let cartContent = d.getElementsByClassName('cart-content')[0];
            while (cartContent.hasChildNodes()) {
    
                cartContent.removeChild(cartContent.firstChild);
    
            }
    
            updateTotal();
            updateBuyButtonVisibility();
    }

    //Buy Now Button work
    d.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

   
}


//Open and close cart
cartIcon.addEventListener('click', (e) =>{

    cart.classList.add('active');
});

closeCart.addEventListener('click', (e)=>{

    cart.classList.remove('active');
});


//Page working 

if(d.readyState == 'loading'){

    d.addEventListener('DOMContentLoaded', ready);

} else {

    ready();
}


//Remove items from cart
const removeCartItem = (e) =>{

    let buttonClicked = e.target;

    buttonClicked.parentElement.remove();

    updateTotal();
    updateBuyButtonVisibility();
}

//Quantity changed
const quantityChanged = (e) =>{

    let input = e.target;

    if(isNaN(input.value) || input.value <= 0){

        input.value = 1;
    }

    updateTotal();
    
}


//Add To cart 
const addCartClicked = (e) => {

    let button = e.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
    

}

const updateBuyButtonVisibility = () => {
    const cartContent = document.getElementsByClassName('cart-content')[0];
    const buyButton = document.getElementsByClassName('btn-buy')[0];
    // Muestra el botón solo si hay al menos un producto en el carrito
    if (cartContent.children.length > 0) {
        buyButton.classList.add('visible');
    } else {
        buyButton.classList.remove('visible');
    }
};

const addProductToCart = (title, price, productImg) => {

    let cartShopBox = d.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = d.getElementsByClassName('cart-content')[0];
    let cartItemsNames = cartItems.getElementsByClassName('cart-prodcut-title');
    for(var contador = 0; contador < cartItemsNames.length; contador++){

        if(cartItemsNames[contador].innerText === title){

            alert('You have already add this item to cart');
            return;

        }
    } 

    let cartBoxContent = `
            <img src="${productImg}" alt="" class="cart-img">
            <div class="detail-box"></div>
                <div class="cart-prodcut-title">${title}</div>
                <div class="cart-price">${price}</div>
                <input type="number" value="1" class="cart-quantity">
                <i class="bx bxs-trash-alt cart-remove"></i>
            </div>
            `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);

    updateTotal();
    updateBuyButtonVisibility(); // Actualiza el estado del botón de compra

    
}

//Update Total

const updateTotal = () => {

    let cartContent = d.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    let total = 0;

    for(var contador = 0; contador < cartBoxes.length; contador++){

        let cartBox = cartBoxes[contador];
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total += price * quantity;

    }

    //Price with some cents
    total = Math.round(total * 100) / 100;

    d.getElementsByClassName('total-price')[0].innerText = '$' + total;
   

}


