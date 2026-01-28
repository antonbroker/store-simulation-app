const inventoryRepo = require('../repositories/InventoryRepo')
const productsRepo = require('../repositories/productsRepo')

// Get all items in inventory
const getInventory = () => {
    return inventoryRepo.getInventory()
}

// Reset inventory
const resetInventory = () => {
    return inventoryRepo.resetInventory()
}

// Save current inventory
const saveInventory = (items) => {
    if (!Array.isArray(items)) {
        const error = new Error('Some of the inventory items are missing attribute: "name" or "quantity"');
        error.status = 400;
        throw error;
    }

    for (const item of items) {
        if (!item || item.name === undefined || item.quantity === undefined) {
            const error = new Error('Some of the inventory items are missing attribute: "name" or "quantity"')
            error.status = 400
            throw error
        }
        
        const q = Number(item.quantity)
        
        if (!Number.isInteger(q) || q < 0) {
            const error = new Error('Some of the inventory items are missing attribute: "name" or "quantity"')
            error.status = 400
            throw error
        }
    }

    const productNames = productsRepo.getAllProducts().map((p) => p.name.toLowerCase())

    for (const item of items) {
        const nameInList = productNames.includes(String(item.name).toLowerCase())

        if (!nameInList) {
            const error = new Error('Some of the inventory items are missing in the products list')
            error.status = 400
            throw error
        }
    }

    const normalized = items.map((item) => ({ name: item.name, quantity: Number(item.quantity) }))
    return inventoryRepo.setInventory(normalized)
}

module.exports = { getInventory, resetInventory, saveInventory }
