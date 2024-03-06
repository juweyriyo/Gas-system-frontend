import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import RepoetDesign from "../Components/ReportsDesign"
function Reports() {

    const [getFile, setGetFile] = useState([])

    const handleGetReports = () => {
        axios.get("http://localhost:5000/allReprts").then((res) => {
            setGetFile(res.data)
        }).catch((error) => console.log(error))
    }

    useEffect(() => {
        handleGetReports()
    },[])

    return <div>
        <div className="pt-5">
            <Link to="/Upload" className="bg-blue-400 text-white px-6 py-3  absolute bottom-2 right-2 rounded-full p-5 text-2xl">+</Link>
        </div>

        <div className="grid grid-cols-3 gap-5 pt-20">

        {
            getFile.map((data) => {
                return <RepoetDesign fileName={`http://localhost:5000/allrepot/${data.file}`} />
            })
        }

        </div>
        
    </div>
}

export default Reports