import employeimage from "../images/Gas-Cylinder-Price-removebg-preview (1).png";
import { useState, useEffect } from "react";
import axios from 'axios'
import {Link, useNavigate, useParams} from "react-router-dom"
import Sidenav from "./Sidenav";

function Inventry(){
    const images = [
        {
          img: employeimage 
        }
      ];

      

      const [inventory, setInventory] = useState([])

      const handleInventory = () =>{
        axios.get("http://localhost:5000/allInventory").then((response) => {
            setInventory(response.data)
        }).catch((error) => console.log(error))
      }

      useEffect(() =>{
        handleInventory()
      },[])

    return<div>
        < Sidenav /> 
      <div className="ml-[22%]">
    <h1 className=" bg-red-500 text-center p-3 text-2xl text-white w-full">Inventory Form</h1>
      <div className=" flex justify-around pt-20 ">
          <from className=" mt-[100px]">
          <label className="font-bold "> tankSize : </label>
          <select className=" text-black border-2 border-gray-300 mt-5 mr-5 ml-20 font-semibold w-[300px] h-[25px]">
                    <option>Select one..</option>
                    {
                        inventory.map((data) =>{
                            return<option>{data.TankiSize}</option>
                        })
                    }
                </select>              <br />
              <label className=" font-bold">QuantityAvailable: </label> <input /*value={PrisePerUnit} onChange={(e) => setPrisePerUnit(e.target.value)}*/ className=" w-[300px] h-[25px] border-2 border-gray-300 rounded ml-4 pb-4 " type="text"  />
              <br />
              
              <div className=" flex gap-5 pt-5 ml-20">
              <button /*onClick={handleRegisterProduct}*/ className="px-4 py-2 text-white text-2xl  bg-blue-500 rounded">Save</button>
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
            <thead className=" border-t-4 border-gray-600 border-r-4 border-l-4">
                <tr className=" text-1xl  border-2 border-gray-400">
                    <th className=" border-2 border-gray-400">InventoryID</th>
                    <th className=" border-2 border-gray-400 text-black">tankSize</th>
                    <th className=" border-2 border-gray-400">QuantityAvailable</th>
                    <th className=" border-2 border-gray-400">PrisePerUnit</th>
                </tr>
            </thead>
            <tbody>
                {
                    inventory.map((item) =>{
                        return <tr className=" text-center">
                        <td className="border-2 border-gray-400">{item.InventoryID}</td>
                        <td className="border-2 border-gray-400">{item.TankiSize}</td>
                        <td className="border-2 border-gray-400">{item.QuantityAvailable}</td>
                        <td className="border-2 border-gray-400">{item.PricePerUnit}</td>
                    </tr>
                    })
                }
            </tbody>
          </table>
    </div>
    </div>
    </div>
}

export default Inventry