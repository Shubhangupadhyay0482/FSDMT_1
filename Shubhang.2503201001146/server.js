const express = require('express');
const app = express();

app.use(express.json());

let products = [
    {
        id: 301,
        name: "Wireless Mouse",
        category: "Electronics",
        price: 799,
        quantity: 25,
        inStock: true
    },
    {
        id: 302,
        name: "Notebook",
        category: "Stationery",
        price: 60,
        quantity: 100,
        inStock: true
    },
    {
        id: 303,
        name: "USB Keyboard",
        category: "Electronics",
        price: 999,
        quantity: 0,
        inStock: false
    }
];

// GET all products
app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});

// Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});