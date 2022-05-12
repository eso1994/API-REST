import express from 'express';
import user from './userRoute.js';
import client from './clientRoute.js';
import produto from './produtoRoute.js';
import invoice from './invoiceRoute.js';

const routes = (app) => {
    app.use(
        express.json(),
        express.urlencoded({extended: true}),
        user,
        client,
        produto,
        invoice
    )
}

export default routes;