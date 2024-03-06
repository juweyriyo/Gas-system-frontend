import { Route, Routes } from "react-router-dom"
import Employee from "./Components/Employee"
import Costomars from "./Components/Costomars"
import Sales from "./Components/Sales"
import Sidenav from "./Components/Sidenav"
import Supplier from "./Components/Supplier"
import Logout from "./Components/Logout"
import Users from "./Components/Users"
import Product from "./Components/Product"
import Upload from "./Components/Upload"
import Reports from "./Components/Reports"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Inventry from "./Components/Inventry"
import Dashboard from "./Components/Dashboard"
import Purchase from "./Components/Purchase"
import {CssBaseline, ThemeProvider} from "@mui/material"
import { ColorModeContext , useMode } from "./theme"
function App() {

    const [theme, colorMode] = useMode()
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
    <>

            <Routes>
                    <Route path="/Dashboard" element={<Dashboard />} />
                    <Route path="/Employee" element={<Employee />} />
                    <Route path="/Employee/:id" element={<Employee />} />
                    <Route path="/Costomars" element={< Costomars />} />
                    <Route path="/Costomars/:id" element={< Costomars />} />
                    <Route path="/Supplier/:id" element={< Supplier />} />
                    <Route path="/Supplier" element={< Supplier />} />
                    <Route path="/Product" element={< Product />} />
                    <Route path="/Product/:id" element={< Product />} />
                    <Route path="/Sales" element={<Sales />} />
                    <Route path="/Reports" element={< Reports />} />
                    <Route path="/Upload" element={< Upload />} />
                    <Route path="/Users" element={< Users />} />
                    <Route path="/Users/:id" element={< Users />} />
                    <Route path="/Inventory" element={< Inventry />} />
                    <Route path="/Purchase" element={< Purchase />} />

                    </Routes>
                    
                    <Routes>
                        
                <Route path="/" element={< Logout />} />
            </Routes>

    
    </>
    </ThemeProvider>
    </ColorModeContext.Provider>
    )
}
export default App