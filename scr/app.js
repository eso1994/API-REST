import express from "express";
import db from "./config/db.js";
import routes from "./routes/index.js"

db.on('error', console.log.bind(console, "Connection error"))
db.once('open', () => console.log('Db has been connected'))

const app = express();
routes(app)

export default app;