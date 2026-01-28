import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const getProducts = async () => {
    const response = await axios.get(`${BASE_URL}/product/all`)
    return response.data
}

const addProduct = async (name) => {
    const response = await axios.put(`${BASE_URL}/product`, { name })
    return response.data
}

export { getProducts, addProduct }
