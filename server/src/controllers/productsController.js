const productsService = require('../services/productsService')

const getAllProducts = (req,res) => {
    try {
        const data = productsService.getAllProducts()
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Server error" })
    }
}

const addProduct = (req,res) => {
    try {
        const { name } = req.body
        const data = productsService.addProduct(name)
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)

        if (error.status) {
            return res.status(error.status).json({ error: error.message });
        }
        
        return res.status(500).json({ message: "Server error" })
    }
}

module.exports = { getAllProducts, addProduct }