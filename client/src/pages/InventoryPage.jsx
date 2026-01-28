import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getProducts } from "../api/productsApi"
import { getInventory, saveInventory, resetInventory } from "../api/inventoryApi"

const InventoryPage = () => {
    const [selectedProduct, setSelectedProduct] = useState("")
    const [quantity, setQuantity] = useState("")
    const [items, setItems] = useState([])
    const [products, setProducts] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        const load = async () => {
            setError(null)
            try {
                const [inventoryData, productsData] = await Promise.all([
                    getInventory(),
                    getProducts(),
                ])

                setItems(inventoryData)
                setProducts(productsData)
            } catch (error) {
                setError(error.response?.data?.error ?? error.message ?? "Failed to load data")
            }
        }

        load()
    }, [])

    const handleAdd = () => {
        if (!selectedProduct) return
        if (!quantity) return

        setError(null)
        setItems((prev) => [...prev, { name: selectedProduct, quantity: Number(quantity) }])
        setQuantity("")
        setSelectedProduct("")
    }

    const handleRemove = (indexForRemove) => {
        setItems((prev) => prev.filter((_, index) => index !== indexForRemove))
    }

    const handleSave = async () => {
        setError(null)
        
        try {
            const data = await saveInventory(items)
            setItems(data)
        } catch (err) {
            const message = err.response?.data?.error ?? err.message ?? "Save failed"
            setError(message)
        }
    }

    const handleReset = async () => {
        setError(null)
        try {
            await resetInventory()
            setItems([])
        } catch (err) {
            const message = err.response?.data?.error ?? err.message ?? "Reset failed"
            setError(message)
        }
    }

    return (
        <div className="inventory-page">
            <h1>Inventory</h1>

            {error && <p className="error">{error}</p>}

            <h2>Add Item</h2>
            <div className="add-row">
                <select value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
                    <option value="">Choose product</option>
                    {products.map((product) => (
                        <option key={product.name} value={product.name}>
                            {product.name}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <button type="button" className="btn btn-primary btn-add" onClick={handleAdd}>+</button>
            </div>

            <div className="nav-link-wrap">
                <Link to="/create-product">new product</Link>
            </div>

            <h2>Items list</h2>
            <div className="list-card">
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            <span><span className="item-name">{item.name}</span><span className="item-qty">— {item.quantity}</span></span>
                            <button type="button" className="btn-remove" onClick={() => handleRemove(index)}>remove</button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="actions">
                <button type="button" className="btn btn-primary" onClick={handleSave}>save</button>
                <button type="button" className="btn btn-secondary" onClick={handleReset}>Reset inventory</button>
            </div>
        </div>
    )
}

export default InventoryPage
