import express from "express";
import checkToken from "../services/userToken.js";
import InvoiceController from "../controllers/invoiceController.js";

const router = express.Router();

router
    .post('/invoice/create', checkToken, InvoiceController.createInvoice)
    .get('/invoice', checkToken, InvoiceController.searchInvoice)
    .get('/invoice/:id', checkToken, InvoiceController.searchInvoiceById)
    .put('/invoice/:id', checkToken, InvoiceController.updateInvoice)

export default router;
