const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })
const PORT = process.env.PORT

const inventoryRoutes = require('./routes/inventoryRoutes')
const productsRoutes = require('./routes/productsRoutes')

const app = express()

app.use(express.json())
app.use(cors())

app.use(inventoryRoutes)
app.use(productsRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

module.exports = app