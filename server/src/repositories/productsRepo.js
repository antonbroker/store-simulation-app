const db = require('../db')

// Get all products
const getAllProducts = () => {
    return [...db.products]
}

// Add product
const addProduct = (name) => {
    db.products.push({ name })
    return getAllProducts()
}

// Check if product exists
const productExists = (name) => {
    return db.products.some((product) => product.name.toLowerCase() === name.toLowerCase())
}

module.exports = { getAllProducts, addProduct, productExists }
