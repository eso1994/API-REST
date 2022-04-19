import express from 'express';
import user from './userRoute.js';

const routes = (app) => {
    app.use(
        express.json(),
        express.urlencoded({extended: true}),
        user
    )
}

export default routes;