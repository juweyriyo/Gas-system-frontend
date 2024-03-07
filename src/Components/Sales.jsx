import employeimage from "../images/sakes-removebg-preview.png";
import { Link } from "react-router-dom"
import Sidenav from "./Sidenav"
import { useEffect, useState } from "react";
import axios from "axios";


function Sales(){

    const images = [
        {
          img: employeimage 
        }
      ];
      const [customers, setCustomers] = useState([]);
      const [inventory, setInventory] = useState([]);
      const [selectedTankSize, setSelectedTankSize] = useState("");
      const [quantityOrdered, setQuantityOrdered] = useState(1);
      const [total, setTotal] = useState(3);
    
      const handleReadData = () => {
        axios.get(`https://gas-system-backend.onrender.com/allCustomers`)
          .then((response) => {
            setCustomers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      };
    
      const handleInventory = () => {
        axios.get("https://gas-system-backend.onrender.com/allInventory")
          .then((response) => {
            setInventory(response.data);
          })
          .catch((error) => console.log(error));
      };
    
      const handleTankSizeChange = (e) => {
        const size = e.target.value;
        setSelectedTankSize(size);
        const selectedTank = inventory.find(item => item.tankSize === size);
        if (selectedTank) {
          const total = selectedTank.PricePerUnit * quantityOrdered;
          setTotal(total);
        }
        else {
            setTotal(0);
          }
      };
    
      useEffect(() => {
        handleReadData();
        handleInventory();
      }, []);
    

    return <div>
        < Sidenav/>
        <div className="ml-[22%]">
        <h1 className=" bg-red-500 text-center p-3 text-2xl text-white w-full">Purchase Form</h1>
      <div className=" flex justify-around pt-20 ">
          <from className=" mt-[20px] ">
            <label className="font-bold ml-5"> Customer Name :</label>
            <select className=" border-2 border-gray-300 mt-5 mr-5  ml-5 font-semibold w-[300px] h-[25px] text-black">
                <option>Select one..</option>
                {
                    customers.map((item) =>{
                        return <option>{item.CustomerName}</option>
                         
                    })
                }
            </select>
            <br/>   
            <label className="font-bold ml-5"> tankSize :</label>
            <select className="border-2 border-gray-300 mt-5 mr-5 ml-16 font-semibold w-[300px] h-[25px mb-3  text-black" value={selectedTankSize} onChange={handleTankSizeChange}>
             <option value="">Select one..</option>
                {
                inventory.map((item) => (
                <option className=" text-black" key={item.tankSize} value={item.tankSize}>{item.TankiSize}</option>
            ))}
            </select>
            <br/>
            <label className=" font-bold "> QuantityOrdered :</label><input value={quantityOrdered } onChange={(e) => setQuantityOrdered(e.target.value)} className=" w-[300px] h-[25px] border-2 border-gray-300 rounded ml-10 mb-3 text-black " type="text"  placeholder="QuantityOrdered"/>
            <br/>
            <label className="font-bold ml-5"> Total :</label>
            <label className="px-11 bg-white py-1 border-2 border-gray-300 rounded ml-20 mb-3 text-black ">
            {total}
            </label>
               
              <div className=" flex gap-5 pt-5 ml-20">
              <button /*onClick={handleRegisterPurchase}*/ className="px-4 py-2 text-white text-2xl  bg-blue-500 rounded">Save</button>
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
                <tr className=" text-1xl text-black border-2 border-gray-400">
                    <th className=" border-2 border-gray-400">ParchaseId</th>
                    <th className=" border-2 border-gray-400">tankSize</th>
                    <th className=" border-2 border-gray-400">SupplirName</th>
                    <th className=" border-2 border-gray-400">QuantityOrdered</th>
                    <th className=" border-2 border-gray-400">Price</th>
                    <th className=" border-2 border-gray-400">PriceOrderDate</th>
                </tr>
            </thead>
            {/* <tbody>
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
            </tbody> */}
            </table>
            </div>
        </div>
    </div>
}
export default Sales