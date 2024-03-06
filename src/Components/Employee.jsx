import axios from "axios"
import { useState, useEffect } from "react"
import {Link, useNavigate, useParams} from "react-router-dom"
import employeimage from "../images/Benefits-of-Employee-Engagement--Featured-image-removebg-preview.png";
import Sidenav from "./Sidenav";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "./Header";
import { tokens } from "../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

function Employee(){
    const images = [
        {
          img: employeimage 
        }
      ];
      
    
    const [Id, setEmpId] = useState()
    const [Name, setEmpName] = useState()
    const [Role, setRole] = useState()
    const [Gender, setGender] = useState()
    const [Salary, setSalary] = useState()
    const [Contact, setEmpNumber] = useState()
    const [Email, setEmail] = useState()
    const [Location, setLocation] = useState()


    const [employees, setEmployees] = useState([])
    const [page, setPage] = useState(0)


    const prams = useParams()//id ga iiqabo


    //read
    const handleReadData = () =>{
        axios.get(`http://localhost:5000/allemployees?page=${page}`).then((response) =>{
            setEmployees(response.data)
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
       
    },[page])

    useEffect(() => {
      handleSingleData()
    })

    //register
    const handleRegisterEmpolyee = (e) => {
        e.preventDefault()
        axios.post("http://localhost:5000/create/employee", {
            "Id": Id,
            "Name": Name,
            "Role": Role,
            "Gender": Gender,
            "Salary": Salary,
            "Contact":Contact,
            "Email": Email,
            "Addres": Location
        }).then(() => {
            alert("Student has been registered successfully",{
               
            }) 
            // navigate("/")
        }).catch((error) => console.log(error))
    }

    //update
    const handleUpdate = (e) => {
      e.preventDefault()
      axios.put(`http://localhost:5000/employee/update/${prams.id}`, {
        "Id": Id,
        "Name": Name,
        "Role": Role,
        "Gender": Gender,
        "Salary": Salary,
        "Contact":Contact,
        "Email": Email,
        "Addres": Location
      }).then(() => {
          alert("Employee has been Updated successfully")
          navigate("/Employee")
      }).catch((error) => console.log(error))
  }

    //search
    const handleSearchEmp = (id) =>{
      const key = id.target.value
      if(key){
      axios.get(`http://localhost:5000/search/Employee/${key}`).then((response) =>{
          setEmployees(response.data)
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
    axios.get(`http://localhost:5000/employee/single/${prams.id}`).then((response) =>{
        setEmpId(response.data[0].Id)
        setEmpName(response.data[0].Name)
        setRole(response.data[0].Role)
        setGender(response.data[0].Gender)
        setSalary(response.data[0].Salary)
        setEmpNumber(response.data[0].Contact)
        setEmail(response.data[0].Email)
        setLocation(response.data[0].Addres)
        // console.log(response.data[0].Id)
        // console.log(response.data[0].Name)
    }).catch((error) => console.log(error))
}

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return <div>
      <Sidenav /> 
      <div className="ml-[22%]">
        <Box display="flex" justifyContent="space-between" alignItems="center" ml="20px" pt="10px">
            <Header title="Employee" subtitle="employee from" />
  
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
         <div className=" flex justify-around pt-20">
            <from>
              <h1 className=" text-2xl mb-3">Regester <span className=" text-green-200">from</span></h1>
                <input value={Id} onChange={(e) => setEmpId(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 px-5 py-3  rounded ml-11 mb-4 text-black p-3" type="text"  placeholder="Enter Id"/>
                <input value={Name} onChange={(e) => setEmpName(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-5 mb-4 text-black p-3" type="text"  placeholder="Enter Name"/>
                <br />
                <input value={Role} onChange={(e) => setRole(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-11 mb-4  text-black p-3" type="text"  placeholder="Enter Role"/>
                <input value={Gender} onChange={(e) => setGender(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-5 mb-4  text-black p-3" type="text"  placeholder="Enter Gender"/>
                <br />
                <input value={Salary} onChange={(e) => setSalary(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-11 mb-4 text-black p-3" type="text"  placeholder="Enter Salary"/>
                <input value={Contact} onChange={(e) => setEmpNumber(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 ml-5 rounded pb-4 text-black p-3" type="text"  placeholder="Enter Contact"/>
                <br />
                <input value={Email} onChange={(e) => setEmail(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-11 pb-4 text-black p-3" type="text"  placeholder="Enter Email"/>
                <input value={Location} onChange={(e) => setLocation(e.target.value)} className=" w-[150px] h-[25px] border-2 border-gray-300 rounded ml-6 pb-4 text-black p-3" type="text"  placeholder="Enter Addres"/>
                <br />
                <div className=" flex gap-5 pt-5 ml-20">
                <button onClick={handleRegisterEmpolyee} className="px-4 py-2 text-white text-2xl  bg-blue-500 rounded">Save</button>
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
                <input onChange={handleSearchEmp} className="  w-[300px] h-[25px] border-2 mt-[-20px] border-gray-300 px-5 py-3  rounded absolute  right-4" type="text" placeholder="Searching teacher" />
            </form>
        <div className=" mt-5 ">
        <table className="w-full">
            <thead className=" border-t-4 border-gray-600 border-r-4 border-l-4">
                <tr className=" text-1xl  border-2 border-gray-400">
                    <th className="border-2 border-gray-400">EmpolyeeID</th>
                    <th className="border-2 border-gray-400">EmpolyeeName</th>
                    <th className="border-2 border-gray-400 px-12">Role</th>
                    <th className="border-2 border-gray-400">Gender</th>
                    <th className="border-2 border-gray-400">Salary</th>
                    <th className="border-2 border-gray-400">ContactNumber</th>
                    <th className="border-2 border-gray-400">Email</th>
                    <th className="border-2 border-gray-400">Address</th>
                    <th className="border-2 border-gray-400">Edit</th>
                </tr>
            </thead>
            
  {
    // employees.length > 0 ? (
      employees.map((data) => (
        // <Link to={`/Employee/${data._id}`}>
      // <table className="w-full px-5">
      <tbody>
        <Link>
        </Link>
      <tr className="text-cente border-2 border-gray-400">
        <td className=" border-2 border-gray-400 px-5">{data.Id}</td>
        <td className=" border-2 border-gray-400 px-5  pl-14">{data.Name}</td>
        <td className=" border-2 border-gray-400 px-2">{data.Role}</td>
        <td className=" border-2 border-gray-400">{data.Gender}</td>
        <td className=" border-2 border-gray-400">{data.Salary}</td>
        <td className=" border-2 border-gray-400">{data.Contact}</td>
        <td className=" border-2 border-gray-400">{data.Email}</td>
        <td className=" border-2 border-gray-400">{data.Addres}</td>

        <td> <Link to={`/Employee/${data._id}`}>Edit </Link> </td>
      </tr>
    
  {/* ) : (
    <tr>
    <td colSpan="8" className="text-center text-3xl font-bold">
    There is no data
    </td>
  </tr> */}

    </tbody>
    // </table>
    // </Link>
    ))
  }
            </table>
  
    
      </div>
      <div className=" absolute right-2 text-white">
      <button onClick={handleNextButton} className=" px-5 py-2 bg-blue-400  rounded">Next</button>
      <button onClick={handleprev} className=" px-5 py-2 bg-blue-400  rounded ml-3 mt-3">Prev</button>
      </div>
  </div>
  </div>
}
export default Employee