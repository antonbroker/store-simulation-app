const inventoryService = require('../services/InventoryService')

const getInventory = (req,res) => {
    const data = inventoryService.getInventory()
    return res.status(200).json(data)
}

const saveInventory = (req, res) => {
    try {
        const data = inventoryService.saveInventory(req.body)
        return res.status(200).json(data)

    } catch (err) {
        const status = err.status || 500
        const message = err.message || "Internal Server Error"
        return res.status(status).json({ error: message })
    }
}

const resetInventory = (req,res) => {
    const data = inventoryService.resetInventory()
    return res.status(200).json(data)
}

module.exports = { getInventory, saveInventory, resetInventory }