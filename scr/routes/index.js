import express from 'express';
import user from './userRoute.js';
import client from './clientRoute.js';

const routes = (app) => {
    app.use(
        express.json(),
        express.urlencoded({extended: true}),
        user,
        client
    )
}

export default routes;