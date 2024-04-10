require('dotenv').config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const products_routes = require("./routes/products");
const connectDB = require("./db/connect")

app.get("/", (req, res) => {
    res.send("app pages run....1 app.js page")
});

app.use("/api/products", products_routes)

const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URL)
        app.listen(port, () => {
            console.log(`${port} yes i am connected`)
        })

    } catch (error) {
        console.log(error, "No connection")
    }
}

start();
