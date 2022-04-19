import express from "express";
import UserController from "../controllers/userController.js";
import checkToken from "../services/userToken.js";

const router = express.Router();

router  
    .get('/user', checkToken, UserController.listUser)
    .post('/user/register', UserController.registerUser)
    .post('/user/login', UserController.loginUser)
    .delete('/user/delete/:id', checkToken, UserController.deleteUser)

export default router;