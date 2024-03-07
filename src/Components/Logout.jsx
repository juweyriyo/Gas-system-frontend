import logoutImage from "../images/computer-security-with-login-password-padlock-removebg-preview.png"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function Logout(){
    const [Username, setUsername] = useState()
    const [Password, setPassword] = useState()
    const [Role, setRole] = useState()

    const navigate = useNavigate()

    const loginAdmin = (e) =>{
        e.preventDefault()

        axios.post("https://gas-system-backend.onrender.com/create/login",{
            "Username": Username,
            "Password": Password,
            "Role": Role
        }).then((response) =>{
            if(response.data.error){
                alert("Incorrect password or username")
            }
            else{
                alert("successfully login")
                // localStorage.setItem("hh","vvv")
                //if (Role === "Admin") {
                    localStorage.setItem("Admin", JSON.stringify(response.data));
                // }else {
                //     localStorage.setItem("User", JSON.stringify(response.data));
                // }
                
            // console.log(response.data);
                navigate("/Employee")
            }
        })
    }

    const images = [
        {
          img: logoutImage 
        }
      ];


    return <div>
        <div className=" flex justify-around w-[700px] h-[600px] shadow-xl ml-80 pt-14 bg-gray-100">
            <form className=" ml-5">
            <h1 className=" text-3xl font-bold text-red-400 pt-10">Login</h1>

                <label className=" ">User Name</label>
                <br />
                <input value={Username} onChange={(e) => setUsername(e.target.value)} className=" w-[300px] h-[25px] border-2 border-gray-300 rounded pb-4  " type="text " />
                <br />
                <label>Password</label>
                <br />
                <input value={Password} onChange={(e) => setPassword(e.target.value)} className=" w-[300px] h-[25px] border-2 border-gray-300 rounded pb-4" type="text " />
                < br/>
                <label>Role : </label>
                <select value={Role} onChange={(e) => setRole} className=" border-2 border-gray-300 mt-5 mr-5">
                    <option></option>
                    <option>Admin</option>
                    <option>Employee</option>
                </select>
                <input type="radio" name="fruit"/> Show Password

                <button onClick={loginAdmin} className=" px-10 py-2 text-2xl text-red-400 bg-white border-2 border-garay-300 ml-14 mt-5">Login</button>
            </form>
            <div className=" mt-[-20px]">
                {images.map((image, index) => (
                <img key={index} src={image.img}  />
                ))}
        </div>
        </div>

    </div>
    
}
export default Logout