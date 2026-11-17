
const express = require('express');
const app = express();

app.use(express.json());

let products = [
    { id: 301, name: "Wireless Mouse", category: "Electronics", price: 799, quantity: 25, inStock: true },
    { id: 302, name: "Notebook", category: "Stationery", price: 60, quantity: 100, inStock: true },
    { id: 303, name: "USB Keyboard", category: "Electronics", price: 999, quantity: 0, inStock: false }
];


function valid(p) {
    return typeof p.name === 'string' && p.name.trim() !== '' &&
           typeof p.category === 'string' && p.category.trim() !== '' &&
           typeof p.price === 'number' && Number.isFinite(p.price) && p.price >= 0 &&
           Number.isInteger(p.quantity) && p.quantity >= 0 &&
           typeof p.inStock === 'boolean';
}

app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});


app.post('/api/products', (req, res) => {
    if (!valid(req.body))
        return res.status(400).json({ message: "Invalid data" });

    const id = Math.max(300, ...products.map(p => p.id)) + 1;
    const product = { id, ...req.body };

    products.push(product);
    res.status(201).json(product);
});


app.get('/api/products/filter', (req, res) => {
    const category = req.query.category;

    if (typeof category !== 'string' || !category.trim())
        return res.status(400).json({ message: "Category required" });

    const result = products.filter(
        p => p.category.toLowerCase() === category.trim().toLowerCase()
    );

    res.status(200).json(result);
});


app.get('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === Number(req.params.id));

    if (!product)
        return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
});


app.put('/api/products/:id', (req, res) => {
    const product = products.find(p => p.id === Number(req.params.id));

    if (!product)
        return res.status(404).json({ message: "Product not found" });

    if (!valid(req.body))
        return res.status(400).json({ message: "Invalid data" });

    Object.assign(product, req.body);
    res.status(200).json(product);
});


app.delete('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const exists = products.some(p => p.id === id);

    if (!exists)
        return res.status(404).json({ message: "Product not found" });

    products = products.filter(p => p.id !== id);
    res.status(200).json({ message: "Product deleted successfully" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
