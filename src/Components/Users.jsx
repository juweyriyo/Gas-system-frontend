import employeimage from "../images/uxauthentication_v2-removebg-preview.png";
import { useState, useEffect } from "react";
import axios from 'axios'
import {Link, useNavigate, useParams} from "react-router-dom"
import Sidenav from "./Sidenav";
function Users(){
    const images = [
        {
          img: employeimage 
        }
      ];


        const [Id, setId] = useState()
        const [UserName, setUserName] = useState()
        const [Password, setPassword] = useState()
        const [Role, setRole] = useState()

        const [Users, setUser] = useState([])
        const [page, setPage] = useState(0)

        const prams = useParams()//id ga iiqabo


        //regester
    const handleRegisterUsers = (e) => {
        e.preventDefault()
        axios.post("https://gas-system-backend.onrender.com/create/Users", {
            "Id": Id,
            "UserName": UserName,
            "Password": Password,
            "Role": Role,
        }).then(() => {
            alert("Product has been registered successfully",{
               
            }) 
            // navigate("/")
        }).catch((error) => console.log(error))
    }

    //read
    const handleReadData = () =>{
        axios.get(`https://gas-system-backend.onrender.com/allUsers?page=${page}`).then((response) =>{
            setUser(response.data)
        }).catch((error)=>{
            console.log(error)
        })

    }

    useEffect(()=>{
        handleReadData()
        
    },[page])

   return <div>
        < Sidenav /> 
      <div className="ml-[22%]">
        <h1 className=" bg-pink-900 text-center p-3 text-2xl text-white w-full">User Form</h1>
        <div className=" flex justify-around pt-20 mt-[-5px]">
          <from>
              <label className=" font-bold">EmpId: </label> <input value={Id} onChange={(e) => setId(e.target.value)} className=" w-[300px] h-[25px] border-2 border-gray-300 px-5 py-3  rounded ml-11 pb-4  text-black" type="text"  />
              <br />
              <label className=" font-bold">UserName: </label> <input value={UserName} onChange={(e) => setUserName(e.target.value)} className=" w-[300px] h-[25px] border-2 border-gray-300 rounded ml-4 pb-4 text-black " type="text"  />
              <br />
              <label className=" font-bold">Password: </label> <input value={Password} onChange={(e) => setPassword(e.target.value)} className=" w-[300px] h-[25px] border-2 border-gray-300 rounded ml-14 pb-4  text-black" type="text"  />
              <br />
              <label className=" font-bold">Confirm: </label> <input /*value={Gender} onChange={(e) => setGender(e.target.value)}*/ className=" w-[300px] h-[25px] border-2 border-gray-300 rounded ml-9 pb-4  text-black" type="text"  />
              <br />
              <label  className=" font-bold">Role : </label>
                <select value={Role} onChange={(e) => setRole(e.target.value)} className=" text-black border-2 border-gray-300 mt-5 mr-5 ml-14">
                    <option></option>
                    <option>Admin</option>
                    <option>user</option>
                </select>
                <input type="radio" name="fruit"/> Show Password
              <div className=" flex gap-5 pt-5 ml-20">
              <button onClick={handleRegisterUsers} className="px-4 py-2 text-white text-2xl  bg-blue-500 rounded">Create Account</button>
              <button className="px-4 py-2 text-white text-2xl bg-blue-500 rounded">Delete</button>
              </div>
          </from>
          <div className=" mt-[-60px]">
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
                    <th className=" border-2 border-gray-400">EmpID</th>
                    <th className=" border-2 border-gray-400">UserName</th>
                    <th className=" border-2 border-gray-400">Password</th>
                    <th className=" border-2 border-gray-400">Role</th>
                    <th className=" border-2 border-gray-400">CreatedAt</th>
                </tr>
            </thead>
            
            <tbody>
                {
                    Users.map((item) =>{
                        return <tr className=" text-center">
                        <td className="border-2 border-gray-400">{item.Id}</td>
                        <td className="border-2 border-gray-400">{item.Username}</td>
                        <td className="border-2 border-gray-400">{item.Password}</td>
                        <td className="border-2 border-gray-400">{item.Role}</td>
                        <td className="border-2 border-gray-400">12/2/2024</td>
                    </tr>
                    })
                }
            </tbody>

           </table>
            </div>
            </div>
      </div>

}
export default Users