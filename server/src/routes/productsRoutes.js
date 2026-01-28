const express = require('express')
const productsController = require('../controllers/productsController')

const router = express.Router()

router.get('/product/all', productsController.getAllProducts)
router.put('/product', productsController.addProduct)

module.exports = router