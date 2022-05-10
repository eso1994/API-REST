import axios from "axios";

async function apiProduto(id) {

    let produto = (await axios.get('http://makeup-api.herokuapp.com/api/v1/products.json')).data;

    let searchProduto = produto.filter(key => key.id == id);

    return searchProduto[0];

}

export default apiProduto;