import Sidenav from "./Sidenav"
import employeimage from "../images/PurchseordrFor-smbs-removebg-preview.png";
import { useState, useEffect } from "react";
import axios from 'axios'
import {Link, useNavigate, useParams} from "react-router-dom"

function Purchase(){
    const images = [
        {
          img: employeimage 
        }
      ];

      const [ParchaseID, setParchaseID] = useState("")
      const [tankSize, settankSize] = useState("")
      const [CompanyName, setCompanyName] = useState("")
      const [QuantityOrdered, setQuantityOrdered] = useState("")
      const [Price, setPrice] = useState("")

      //register
    const handleRegisterPurchase = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/register/purchases", {
            "ParchaseID": ParchaseID,
            "tankSize": tankSize,
            "CompanyName": CompanyName,
            "QuantityOrdered": QuantityOrdered,
            "Price": Price
        }).then(() => {
            alert("Purchase has been registered successfully",{
               
            }) 
             navigate("/Purchase")
        }).catch((error) => console.log(error))
    }

      const [supplier, setSupplier] = useState([])

      const [Purchase, setPurchase] = useState([])

        //read
    const handleReadData = () =>{
        axios.get(`http://localhost:5000/allSuppliers`).then((response) =>{
            setSupplier(response.data)
        }).catch((error)=>{
            console.log(error)
        })

    }

    //read
    const handlleReadData = () =>{
        axios.get(`http://localhost:5000/allPurchases`).then((response) =>{
            setPurchase(response.data)
        }).catch((error)=>{
            console.log(error)
        })

    }

    useEffect(()=>{
        handleReadData()
        handlleReadData()
    },[])

    return<div>
        < Sidenav />
        <div className="ml-[22%]">
    <h1 className=" bg-red-500 text-center p-3 text-2xl text-white w-full">Purchase Form</h1>
      <div className=" flex justify-around pt-20 ">
          <from className=" mt-[20px] ">
          <input value={ParchaseID} onChange={(e) => setParchaseID(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-16 mb-1  p-3 text-black" type="text"  placeholder="Enter Id" />
          <input value={QuantityOrdered} onChange={(e) => setQuantityOrdered(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-4 mb-1 text-black" type="text"  placeholder="QuantityOrdered"/>
          <br />
                <label className="font-bold ml-5"> tankSize : </label>
                <select value={tankSize} onChange={(e) => settankSize (e.target.value)} className=" border-2 border-gray-300 mt-5 mr-5 ml-16 font-semibold w-[300px] h-[25px] mb-2 text-black">
                    <option>Select one..</option>
                     <option>10.kg</option>
                     <option>20.kg</option>
                     <option>6.kg</option>
                     <option>5.kg</option>
                     <option>50.kg</option>
                     <option>25.kg</option>
                </select>
                <br/>    
          <label className="font-bold ml-5"> CompanyName : </label>
          <select value={CompanyName} onChange={(e) => setCompanyName (e.target.value)} className=" border-2 border-gray-300 mt-5  ml-6 text-black font-semibold w-[300px] h-[25px] mb-1">
                    <option>Select one..</option>
                    {
                        supplier.map((item) =>{
                            return<option>{item.SupplierName}</option>
                        })
                    }
                </select>              
                <br />
              <br />
              <label className=" font-bold ml-5">Price: </label> <input value={Price} onChange={(e) => setPrice(e.target.value)} className= " text-black p-3 w-[300px] h-[25px] border-2 border-gray-300 rounded  ml-24 pb-4 " type="text"  />
              <br />
              
              <div className=" flex gap-5 pt-5 ml-20">
              <button onClick={handleRegisterPurchase} className="px-4 py-2 text-white text-2xl  bg-blue-500 rounded">Save</button>
              <button /*onClick={handleUpdate}*/ className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Update</button>
              <button /*onClick={handleOrder}*/ className="px-4 py-2 text-white text-2xl  bg-blue-500 rounded">Delete</button>
              </div>
          </from>
          <div className=" mt-[-80px]">
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
            <thead className="  border-t-4 border-gray-600 border-r-4 border-l-4">
                <tr className=" text-1xl border-2 border-gray-400">
                    <th className=" border-2 border-gray-400">ParchaseId</th>
                    <th className=" border-2 border-gray-400">tankSize</th>
                    <th className=" border-2 border-gray-400">SupplirName</th>
                    <th className=" border-2 border-gray-400">QuantityOrdered</th>
                    <th className=" border-2 border-gray-400">Price</th>
                    <th className=" border-2 border-gray-400">PriceOrderDate</th>
                </tr>
            </thead>
            <tbody>
                {
                    Purchase.map((item) =>{
                        return <tr className=" text-center">
                        <td className=" border-2 border-gray-400">{item.ParchaseID}</td>
                        <td className=" border-2 border-gray-400">{item.tankSize}</td>
                        <td className=" border-2 border-gray-400">{item.CompanyName}</td>
                        <td className=" border-2 border-gray-400">{item.Price}</td>
                        <td className=" border-2 border-gray-400">${item.Price}</td>
                        <td className=" border-2 border-gray-400">{item.createdAt}</td>
                    </tr>
                    })
                }
            </tbody>
            </table>
            </div>
            </div>
    </div>
}

export default Purchase