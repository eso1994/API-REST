import express from "express";
import ClientController from "../controllers/clientController.js";
import checkToken from "../services/userToken.js";

const router = express.Router();

router
    .post('/client/create', checkToken, ClientController.createClient)
    .get('/client', checkToken, ClientController.searchClient)
    .get('/client/:id', checkToken, ClientController.searchClientById)
    .put('/client/:id', checkToken, ClientController.updateClient)
    .delete('/client/:id', checkToken, ClientController.deleteClient)

export default router;