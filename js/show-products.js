import {conectAPI} from './conectAPI.js';


const d = document; 
const list = d.querySelector('[data-list]');

const createCard = (name, price, img) => {

    const item = d.createElement('div');
    item.className = 'product-box';
    item.innerHTML = `
    
    <img src="${img}" alt="" class="product-img" />

          <h2 class="product-title">${name}</h2>
          <span class="price">$${price}</span>
          <i class="bx bx-shopping-bag add-cart"></i>
    
    
    `;
    
    return item;
}

const listProducts = async () => {

    try{
        const listAPI = await conectAPI.getProducts();

        listAPI.forEach(product => {
    
            list.appendChild(createCard(product.name, product.price, product.img));
        });
    
        ready();

    } catch(error) {

        list.innerHTML = `<p class="error">Error en la solicitud</p>`
    }
   
}

listProducts();