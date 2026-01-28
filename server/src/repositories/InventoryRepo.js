const db = require('../db')

// Get all inventory items
const getInventory = () => {
    return [...db.inventory]
}

const setInventory = (items) => {
    db.inventory.length = 0
    
    items.forEach((item) => {
        db.inventory.push({ name: item.name, quantity: item.quantity })
    })
    return getInventory()
}

// Reset inventory
const resetInventory = () => {
    db.inventory.length = 0
    return []
}

module.exports = { getInventory, setInventory, resetInventory }
