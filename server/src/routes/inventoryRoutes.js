const express = require('express')
const inventoryController = require('../controllers/inventoryController')

const router = express.Router()

router.get('/inventory', inventoryController.getInventory)
router.post('/inventory', inventoryController.saveInventory)
router.post('/inventory/reset', inventoryController.resetInventory)

module.exports = router