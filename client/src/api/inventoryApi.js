import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

const getInventory = async () => {
    const response = await axios.get(`${BASE_URL}/inventory`)
    return response.data
}

const saveInventory = async (items) => {
    const response = await axios.post(`${BASE_URL}/inventory`, items, {
        headers: { "Content-Type": "application/json" },
    })
    return response.data
}

const resetInventory = async () => {
    const response = await axios.post(`${BASE_URL}/inventory/reset`)
    return response.data
}

export { getInventory, saveInventory, resetInventory }
