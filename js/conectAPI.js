
const getProducts = async () => {

    const response = await fetch('https://673f7bcea9bc276ec4b8b8ad.mockapi.io/products/v1/products');
    console.log(response);

    const products = await response.json();

    return products;
    //console.log(products);
}

export const conectAPI = {

    getProducts
}

//getproducts();