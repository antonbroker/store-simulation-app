const productsRepo = require('../repositories/productsRepo')

// Get all products
const getAllProducts = () => {
    return productsRepo.getAllProducts()
}

// Add product
const addProduct = (name) => {
    const trimmedName = String(name || "").trim()

    if (!trimmedName) {
        const error = new Error("invalid product, name is missing")
        error.status = 400
        throw error
    }

    if (productsRepo.productExists(trimmedName)) {
        const error = new Error('product name already exists')
        error.status = 400
        throw error
    }

    return productsRepo.addProduct(trimmedName)
}

module.exports = { getAllProducts, addProduct }

