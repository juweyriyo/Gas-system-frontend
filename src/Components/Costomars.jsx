import employeimage from "../images/63f36b12950c48f7b702090b_customersupport_5__1_-removebg-preview.png";
import { useState , useEffect} from "react";
import axios from "axios";
import {Link, useNavigate, useParams} from "react-router-dom"
import Sidenav from "./Sidenav";
function Costomars(){
    const images = [
        {
          img: employeimage 
        }
      ];

      const [CustomerID, setCustomerID] = useState()
      const [CustomerName, setCustomerName] = useState()
      const [ContactNumber, setContactNumber] = useState()
      const [Email, setEmail] = useState()
      const [Address, setAddress] = useState()
  
  
      const [Customers, setCustomer] = useState([])
      const [page, setPage] = useState(0)

      const prams = useParams()//id ga iiqabo

  
  
      //read
      const handleReadData = () =>{
          axios.get(`http://localhost:5000/allCustomers?page=${page}`).then((response) =>{
              setCustomer(response.data)
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
      },[page])
  
      //register
      const handleRegisterCustomers = (e) => {
          e.preventDefault()
          axios.post("http://localhost:5000/create/customer", {
              "CustomerID": CustomerID,
              "CustomerName": CustomerName,
              "ContactNumber": ContactNumber,
              "Email": Email,
              "Address": Address
          }).then(() => {
              alert("Customers has been registered successfully",{
                 
              }) 
              // navigate("/")
          }).catch((error) => console.log(error))
      }

      //update
    const handleUpdate = (e) => {
      e.preventDefault()
      axios.put(`http://localhost:5000/customer/update/${prams.id}`, {
        "CustomerID": CustomerID,
        "CustomerName": CustomerName,
        "ContactNumber": ContactNumber,
        "Email": Email,
        "Address": Address
      }).then(() => {
          alert("Customer has been Updated successfully")
          navigate("/Customer")
      }).catch((error) => console.log(error))
  }

    //delete methode
    const handleDelete = (id)=>{
      axios.delete(`localhost:5000/customer/delete/ ${id}`).then(() =>{
          alert("customer delete succful")
      }).catch((error) =>{
          console.log(error);
      })
  }

      //search
    //   const handleSearchEmp = (id) =>{
    //     const key = id.target.value
    //     if(key){
    //     axios.get(`http://localhost:5000/search/Employee/${key}`).then((response) =>{
    //         setEmployees(response.data)
    //     }).catch((error) =>{
    //         console.log(error)
    //     })
    // }
    // else{
    //     handleReadData()
    // }
    // }

    //get one data API
    const handleSingleData = () =>{
      axios.get(`http://localhost:5000/customer/single/${prams.id}`).then((response) =>{
          setCustomerID(response.data[0].CustomerID)
          setCustomerName(response.data[0].CustomerName)
          setContactNumber(response.data[0].ContactNumber)
          setEmail(response.data[0].Email)
          setAddress(response.data[0].Address)
          console.log(response.data)
      }).catch((error) => console.log(error))
  }


    return <div>
      <Sidenav /> 
      <div className="ml-[22%]">
      <h1 className=" bg-teal-500 text-center p-3 text-2xl text-white w-full">Customer Form</h1>
        <div className=" flex justify-around pt-20 mt-[10px]">
            <from>
              <h1 className=" text-3xl mb-3">Register Customer</h1>
                <input value={CustomerID} onChange={(e) => setCustomerID(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 px-5 py-3  rounded ml-11 mb-4 text-black" type="text"  placeholder="Enter Id"/>
                <input value={CustomerName} onChange={(e) => setCustomerName(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-4 mb-4 text-black p-3" type="text"  placeholder="Enter Name"/>
               <br />
                <input value={ContactNumber} onChange={(e) => setContactNumber(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-11 pb-4 text-black p-3" type="text"  placeholder="Enter Number"/>
                <input value={Email} onChange={(e) => setEmail(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-5 p-3 mb-4 text-black" type="text"  placeholder="Enter Email"/>
                <br />
                <input value={Address} onChange={(e) => setAddress(e.target.value)} className=" w-[300px] h-[25px] border-2 border-gray-300 rounded ml-14 p-3 text-center pb-4 text-black" type="text" placeholder="Enter Addres" />
                <br />
                <div className=" flex gap-5 pt-5 ml-20">
                <button onClick={handleRegisterCustomers} className="px-4 py-2 text-white text-2xl  bg-blue-500 rounded">Save</button>
                <button onClick={handleUpdate} className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Update</button>
                <button onClick={handleDelete(Customers._id)} className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Dalete</button>
                </div>
            </from>
            <div className=" mt-[-80px]">
                {images.map((image, index) => (
                <img key={index} src={image.img}  />
                ))}
        </div>
        </div>

        <form className=" mr-5 ">
                <input /*onChange={handleSearchEmp}*/ className="  w-[300px] h-[25px] border-2 mt-[-20px] border-gray-300 px-5 py-3  rounded absolute  right-4" type="text" placeholder="Searching teacher" />
            </form>
        <div className=" mt-5 ">
        <table className="w-full">
            <thead className=" border-t-4 border-gray-600 border-r-4 border-l-4">
                <tr className=" text-1xl border-2 border-gray-400">
                    <th className=" border-2 border-gray-400">CustomerID</th>
                    <th className=" border-2 border-gray-400">CustomerName</th>
                   <th className=" border-2 border-gray-400">ContactNumber</th>
                    <th className=" border-2 border-gray-400  ">Email</th>
                    <th className=" border-2 border-gray-400 ">Address</th>
                </tr>
            </thead>
            </table>

           
  {
    Customers.map((data) => (
      <Link to={`/Costomars/${data._id}`}>
       <table className="w-full">
            <tbody>
      <tr className="text-center  border-2 border-gray-400">
        <td className=" border-2 border-gray-400 px-14">{data.CustomerID}</td>
        <td className=" border-2 border-gray-400">{data.CustomerName}</td>
        <td className=" border-2 border-gray-400 px-6">{data.ContactNumber}</td>
        <td className=" border-2 border-gray-400 ">{data.Email}</td>
        <td className=" border-2 border-gray-400">{data.Address}</td>
      </tr>
    
  
    {/* <tr>
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
      {/* <div className=" absolute right-2 text-white">
      <button onClick={handleNextButton} className=" px-5 py-2 bg-blue-400  rounded">Next</button>
      <button onClick={handleprev} className=" px-5 py-2 bg-blue-400  rounded ml-3 mt-3">Prev</button>
      </div> */}
        </div>
        </div>
       
}
export default Costomars