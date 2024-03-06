import employeimage from "../images/brothers-gas-lpg-cylinder-supply-overview-1-1024x536-removebg-preview.png";
import { useState, useEffect } from "react";
import axios from 'axios'
import {Link, useNavigate, useParams} from "react-router-dom"
import Sidenav from "./Sidenav";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "./Header";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

function Product(){
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const images = [
        {
          img: employeimage 
        }
      ];

    const [ProductID, setProductId] = useState()
    const [tankSize, setTankSize] = useState()
    const [PrisePerUnit, setPrisePerUnit] = useState()

    const [pruducts, setPruducts] = useState([])
    const [page, setPage] = useState(0)


    const [InventoryID, setInventId] = useState(2)
    const [QuantityAvailable, setQuantityAvailable] = useState(1)


    const prams = useParams()//id ga iiqabo


    
    //regester
    const handleRegisterProduct = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/create/product", {
            "ProductID": ProductID,
            "tankSize": tankSize,
            "PrisePerUnit": PrisePerUnit,
        }).then(() => {
            alert("Product has been registered successfully",{
               
            }) 
            // navigate("/")
        }).catch((error) => console.log(error))
    }
    
    //read
    const handleReadData = () =>{
        axios.get(`http://localhost:5000/allProducts?page=${page}`).then((response) =>{
            setPruducts(response.data)
            // setTankSize(response.data[0].tankSize);
            // setPrisePerUnit(response.data[0].PrisePerUnit);
        }).catch((error)=>{
            console.log(error)
        })

    }

    //update
    const handleUpdate = (e) => {
      e.preventDefault()
      axios.put(`http://localhost:5000/product/update/${prams.id}`, {
        "ProductID": ProductID,
        "tankSize": tankSize,
        "PrisePerUnit": PrisePerUnit,
      }).then(() => {
          alert("Product has been Updated successfully")
          navigate("/Supplier")
      }).catch((error) => console.log(error))
  }
    
    //get one data API
    const handleSingleData = () =>{
      axios.get(`http://localhost:5000/product/single/${prams.id}`).then((response) =>{
          setProductId(response.data[0].ProductID)
          setTankSize(response.data[0].tankSize)
          setPrisePerUnit(response.data[0].PrisePerUnit)
          console.log(response.data)
      }).catch((error) => console.log(error))
  }

    const handleNextButton = () =>{
        setPage(page + 1)
    }
    const handleprev = () =>{
      if(page > 0){
          setPage(page -1)
      }
    }
  
      useEffect(()=>{
          handleReadData()
          handleSingleData()
      },[page])


      const handleOrder = (e) =>{
        e.preventDefault()
        axios.post("http://localhost:5000/register/inventory",{
          "InventoryID": InventoryID,
          "TankiSize":tankSize,
          "QuantityAvailable":QuantityAvailable,
          "PricePerUnit": PrisePerUnit
        }).then(() => alert("Order registering succefull")).catch((error) => {
            console.log(error);
        })
    }

    const hanldeId = () =>{
      setInventId(InventoryID + 1)
  }

    return <div>
      < Sidenav /> 
      <div className="ml-[22%]">
      <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
  
          <Box>
            <Button
              sx={{
                backgroundColor: colors.blueAccent[700],
                color: colors.grey[100],
                fontSize: "14px",
                fontWeight: "bold",
                padding: "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports
            </Button>
          </Box>
        </Box>      
        <div className=" flex justify-around pt-20 ">
          <from className=" mt-[10px]">
          <h1 className=" text-2xl mb-3">Regester <span className=" text-green-200">from</span></h1>
              <input value={ProductID} onChange={(e) => setProductId(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 px-5 py-3  rounded ml-11 pb-4 text-black " type="text" placeholder="Enter Id" />
              <input value={tankSize} onChange={(e) => setTankSize(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 px-5 py-3  rounded ml-11 mb-4 text-black" type="text"  placeholder="Enter tankSize"/>
              <br />
              <input value={PrisePerUnit} onChange={(e) => setPrisePerUnit(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-32  p-3 text-black " type="text"  placeholder="Enter PrisePerUnit"/>
              <br />
              
              <div className=" flex gap-5 pt-5 ml-20">
              <button onClick={handleRegisterProduct} className="px-4 py-2 text-white text-2xl  bg-blue-500 rounded">Save</button>
              <button onClick={handleOrder} className="px-4 py-2  text-2xl   rounded">.</button>
              <button onClick={handleUpdate} className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Update</button>
              </div>
          </from>
          <div className=" mt-[-90px]">
              {images.map((image, index) => (
              <img key={index} src={image.img}  />
              ))}
      </div>
      </div>
      <form className=" mr-5 ">
                <input /*onChange={handleSearchEmp}*/ className="  w-[300px] h-[25px] border-2 mt-[5px] border-gray-300 px-5 py-3  rounded absolute  right-4" type="text" placeholder="Searching teacher" />
            </form>
        <div className=" mt-10 ">
        <table className="w-full">
            <thead className=" border-t-4 border-gray-600 border-r-4 border-l-4">
                <tr className=" text-1xl border-2 border-gray-400">
                    <th className=" border-2 border-gray-400">ProductID</th>
                    <th className=" border-2 border-gray-400">tankSize</th>
                    <th className=" border-2 border-gray-400">PrisePerUnit</th>
                </tr>
            </thead>
          </table>
            
  {
  //pruducts.length > 0 ? (
    pruducts.map((data) => (
        <Link to={`/Product/${data._id}`}>
          <table className=" w-full">
          <tbody>
      <tr className="text-center  border-2 border-gray-400">
        <td className=" border-2 border-gray-400">{data.ProductID}</td>
        <td className=" border-2 border-gray-400">{data.tankSize}</td>
        <td className=" border-2 border-gray-400">{data.PrisePerUnit}</td>
     </tr>
    
  {/* ) : (
    <tr>
      <td colSpan="8" className="text-center text-3xl font-bold">
        There is no data
      </td>
    </tr> */}
  
  </tbody>

    </table>
    </Link>
    ))
  }
      </div>
      <div className=" absolute right-2 text-white">
      <button onClick={handleNextButton} className=" px-5 py-2 bg-blue-400  rounded">Next</button>
      <button onClick={handleprev} className=" px-5 py-2 bg-blue-400  rounded ml-3 mt-3">Prev</button>
      </div>
      </div>
      </div>
}

export default Product