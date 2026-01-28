import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import InventoryPage from "./pages/InventoryPage"
import CreateProductPage from "./pages/CreateProductPage"

const App = () => {
  
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<InventoryPage/>}/>
                    <Route path="/create-product" element={<CreateProductPage/>}/>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
