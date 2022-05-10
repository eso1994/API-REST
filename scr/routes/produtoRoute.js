import express from "express";
import checkToken from "../services/userToken.js";
import ProdutoController from "../controllers/produtoController.js";

const router = express.Router();

router
    .post('/produto/create', checkToken, ProdutoController.createProduto)
    .get('/produto', checkToken, ProdutoController.searchProduto)
    .get('/produto/:id', checkToken, ProdutoController.searchProdutoById)
    .put('/produto/:id', checkToken, ProdutoController.updateProduto)
    .delete('/produto/:id', checkToken, ProdutoController.deleteProduto)

export default router;