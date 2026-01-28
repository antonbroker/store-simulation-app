import { useState } from "react"
import { addProduct } from "../api/productsApi"

const CreateProductPage = () => {
    const [name, setName] = useState("")
    const [error, setError] = useState(null)

    const handleSave = async () => {
        setError(null)
        try {
            await addProduct(name)
            setName("")

        } catch (err) {
            const message = err.response?.data?.error ?? err.message ?? "Something went wrong"
            setError(message)
        }
    }

    return (
        <div className="create-product-page">
            <h1>Create Product</h1>

            <div className="form-group">
                <input
                    type="text"
                    placeholder="Product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <button type="button" className="btn" onClick={handleSave}>save</button>

            {error && <p className="error">{error}</p>}
        </div>
    )
}

export default CreateProductPage
