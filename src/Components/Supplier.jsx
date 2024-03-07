import suplierimage from "../images/4-removebg-preview.png";
import { useState, useEffect } from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"
import Sidenav from "./Sidenav";
function Supplier(){

    const images = [
        {
          img: suplierimage 
        }
      ];

      const prams = useParams()//id ga iiqabo


      const navigate = useNavigate()

      const [SupplierID, setSuppId] = useState("")
      const [SupplierName, setSuppName] = useState("")
      const [ContactNumber, setSuppNumber] = useState("")
      const [Email, setEmail] = useState("")
      const [Address, setLocation] = useState("")

      //register
    const handleRegisterSupplier = (e) => {
        e.preventDefault()
        axios.post("https://gas-system-backend.onrender.com/create/supplier", {
            "SupplierID": SupplierID,
            "SupplierName": SupplierName,
            "ContactNumber": ContactNumber,
            "Email": Email,
            "Address": Address
        }).then(() => {
            alert("Supplier has been registered successfully",{
               
            }) 
             navigate("/Supplier")
        }).catch((error) => console.log(error))
    }

    const [supplier, setSupplier] = useState([])
    const [page, setPage] = useState(0)


    //read
    const handleReadData = () =>{
        axios.get(`https://gas-system-backend.onrender.com/allSuppliers?page=${page}`).then((response) =>{
            setSupplier(response.data)
        }).catch((error)=>{
            console.log(error)
        })

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
       // handleRefresh()
    },[page])

    //update
    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put(`https://gas-system-backend.onrender.com/supplier/update/${prams.id}`, {
            "SupplierID": SupplierID,
            "SupplierName": SupplierName,
            "ContactNumber": ContactNumber,
            "Email": Email,
            "Address": Address
        }).then(() => {
            alert("Supplier has been Updated successfully")
            navigate("/Supplier")
        }).catch((error) => console.log(error))
    }

    //delete methode
    const handleDelete = (id)=>{
        axios.delete(`https://gas-system-backend.onrender.com/student/delete/ ${id}`).then(() =>{
            alert("supplier delete succful")
        }).catch((error) =>{
            console.log(error);
        })
    }

    //search
    const handleSearchSuppliers = (id) =>{
        const key = id.target.value
        if(key){
        axios.get(`https://gas-system-backend.onrender.com/search/Supplier/${key}`).then((response) =>{
            setSupplier(response.data)
        }).catch((error) =>{
            console.log(error)
        })
    }
    else{
        handleReadData()
    }
    }

    //get one data API
    const handleSingleData = () =>{
        axios.get(`https://gas-system-backend.onrender.com/supplier/single/${prams.id}`).then((response) =>{
            setSuppId(response.data[0].SupplierID)
            setSuppName(response.data[0].SupplierName)
            setSuppNumber(response.data[0].ContactNumber)
            setEmail(response.data[0].Email)
            setLocation(response.data[0].Address)
            console.log(response.data)
        }).catch((error) => console.log(error))
    }



// const handleRefresh = () =>{
//  if(`/Supplier/:id`){
//      navigate("/Supplier")
//  }
// }

 

    return <div>
        <Sidenav /> 
      <div className="ml-[22%]">
      <h1 className=" bg-teal-500 text-center p-3 text-2xl text-white w-full">Suppliar Form</h1>
        <div className=" flex justify-around pt-20 mt-[-10px]">
              {/* Conditional rendering for form or supplier list */}
        <form>
            <h1>Registering Suppliar</h1>
            {/* Input fields for registering a supplier */}
            <input value={SupplierID} onChange={(e) => setSuppId(e.target.value)} className="w-[150px] h-[25px] border-2 border-gray-300 px-5 py-3 rounded ml-11 mb-4 text-black" type="text"  placeholder="Enter SupplierID"/>
            <input value={SupplierName} onChange={(e) => setSuppName(e.target.value)} className="w-[150px] h-[25px]  p-3 border-2 border-gray-300 rounded ml-4 mb-4 text-black" type="text"  placeholder="Enter SupplierName"/>
            <br />
            <input value={ContactNumber} onChange={(e) => setSuppNumber(e.target.value)} className="w-[150px] h-[25px] border-2 border-gray-300 rounded ml-12 mb-4 text-black" type="text"  placeholder="Enter ContactNumber"/>
            <input value={Email} onChange={(e) => setEmail(e.target.value)} className="w-[150px] h-[25px] border-2 border-gray-300 rounded ml-5 mb-4 text-black" type="text" placeholder="Enter Email"/>
            <br />
            <input value={Address} onChange={(e) => setLocation(e.target.value)} className="w-[300px] h-[25px] border-2 border-gray-300 rounded ml-16 pb-4 text-black p-3 text-center" type="text" placeholder="Enter Address"/>

            <div className="flex gap-5 pt-5 ml-20">
                <button onClick={handleRegisterSupplier} className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Save</button>
                <button onClick={handleUpdate} className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Update</button>
                <button onClick={handleDelete(supplier._id)} className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Delete</button>
            </div>
        </form>
    
        {/* supplier.map((data) => (
            <form key={data._id}>
                <label className="font-bold">SupplierID: </label>
                <h1 className="w-[300px] h-[25px] border-2 border-gray-300 px-5 py-3 rounded ml-11 pb-4" type="text">{data.SupplierID}</h1>
                <br />
                <label className="font-bold">SupplierName: </label>
                <h1 className="w-[300px] h-[25px] border-2 border-gray-300 rounded ml-4 pb-4" type="text">{data.SupplierName}</h1>
                <br />
                <label className="font-bold">ContactNumber: </label>
                <h1 className="w-[300px] h-[25px] border-2 border-gray-300 rounded ml-14 pb-4" type="text">{data.ContactNumber}</h1>
                <br />
                <label className="font-bold">Email: </label>
                <h1 className="w-[300px] h-[25px] border-2 border-gray-300 rounded ml-9 pb-4" type="text">{data.Email}</h1>
                <br />
                <label className="font-bold">Address: </label>
                <h1 className="w-[300px] h-[25px] border-2 border-gray-300 rounded ml-9 pb-4" type="text">{data.Address}</h1>

                <div className="flex gap-5 pt-5 ml-20">
                    <button onClick={handleRegisterSupplier} className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Save</button>
                    <button className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Update</button>
                    <button className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Delete</button>
                </div>
            </form>
        ))
    )} */}
            <div className=" mt-[-110px]">
                {images.map((image, index) => (
                <img key={index} src={image.img}  />
                ))}
            </div>
            </div>
            <form className=" mr-5 ">
                <input onChange={handleSearchSuppliers} className="  w-[300px] h-[25px] border-2 mt-[-15px] border-gray-300 px-5 py-3  rounded absolute  right-4" type="text" placeholder="Searching teacher" />
            </form>
            <div className="mt-5">
            <table className="w-full">
            <thead className=" border-t-4 border-gray-600 border-r-4 border-l-4">
            <tr className="text-1xl border-2 border-gray-400">
                <th className="border-2 border-gray-400">SupplierID</th>
                <th className="border-2 border-gray-400">SupplierName</th>
                <th className="border-2 border-gray-400">ContactNumber</th>
                <th className="border-2 border-gray-400">Email</th>
                <th className="border-2 border-gray-400">Address</th>
            </tr>
            </thead>
            </table>
            {
            
          supplier.map((data) => (
            <Link to={`/Supplier/${data._id}`}>
        <table className="w-full">
    <tbody>

      
          <tr key={data._id} className=" text-center border-2 border-gray-400">
              <td className="border-2 border-gray-400">{data.SupplierID}</td>
              <td className="border-2 border-gray-400">{data.SupplierName}</td>
              <td className="border-2 border-gray-400">{data.ContactNumber}</td>
              <td className="border-2 border-gray-400">{data.Email}</td>
              <td className="border-2 border-gray-400">{data.Address}</td>
          </tr>
            {/* <tr>
          <td colSpan="5" className="text-center text-3xl font-bold">
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

export default Supplier