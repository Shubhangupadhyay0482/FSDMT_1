
const express = require('express');
const app = express();

app.use(express.json());

// Initial Product Data
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

// 1. GET - Get all products
app.get('/api/products', (req, res) => {
    res.status(200).json(products);
});

// 2. POST - Add new product
app.post('/api/products', (req, res) => {
    const { name, category, price, quantity, inStock } = req.body;

    // Validation
    if (
        typeof name !== 'string' || name.trim() === '' ||
        typeof category !== 'string' || category.trim() === '' ||
        typeof price !== 'number' || !Number.isFinite(price) || price < 0 ||
        typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0 ||
        typeof inStock !== 'boolean'
    ) {
        return res.status(400).json({
            message: "Invalid product data"
        });
    }

    // Generate unique ID
    const newId = products.length > 0
        ? Math.max(...products.map(p => p.id)) + 1
        : 301;

    const newProduct = {
        id: newId,
        name: name.trim(),
        category: category.trim(),
        price,
        quantity,
        inStock
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});

// 3. GET - Get product by ID
app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
});

// 4. PUT - Update product
app.put('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, category, price, quantity, inStock } = req.body;

    // Validation
    if (
        typeof name !== 'string' || name.trim() === '' ||
        typeof category !== 'string' || category.trim() === '' ||
        typeof price !== 'number' || !Number.isFinite(price) || price < 0 ||
        typeof quantity !== 'number' || !Number.isInteger(quantity) || quantity < 0 ||
        typeof inStock !== 'boolean'
    ) {
        return res.status(400).json({
            message: "Invalid product data"
        });
    }

    product.name = name.trim();
    product.category = category.trim();
    product.price = price;
    product.quantity = quantity;
    product.inStock = inStock;

    res.status(200).json({
        message: "Product updated successfully",
        product: product
    });
});

// 5. DELETE - Delete product
app.delete('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products = products.filter(p => p.id !== id);

    res.status(200).json({
        message: "Product deleted successfully"
    });
});

// 6. GET - Filter products by category
// Keep this route before /api/products/:id
app.get('/api/products/filter', (req, res) => {
    const category = req.query.category;

    if (typeof category !== 'string' || category.trim() === '') {
        return res.status(400).json({
            message: "Please provide a category"
        });
    }

    const filteredProducts = products.filter(
        p => p.category.toLowerCase() === category.trim().toLowerCase()
    );

    res.status(200).json(filteredProducts);
});

// Start Server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
