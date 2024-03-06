import {Link} from "react-router-dom"
import { useEffect, useState } from "react"
function Sidenav(){
    const [isOpen, setIsopen] = useState(false)

    const [isAdmin, setIsAdmin] = useState("admin")
    const users = localStorage.getItem("Admin")

    useEffect(() => {
        if(JSON.parse(users).Role === "user"){
            setIsAdmin("user")
        }
    })
    

    const handleIsopen = ()=>{
        setIsopen(true)
    }
    const handleIsclose = ()=>{
        setIsopen(false)
    }

    const logout = () =>{
        localStorage.clear()
    }

    return <div>
    <div style={{width: isOpen == true ? "100px" : ""}} className=" bg-slate-800 h-screen w-[22%]  text-white fixed /">
      <div className=" text-3xl flex flex-col space-y-7 pl-10 pt-10 p-2">
        {isOpen== true ?  <i class="fa-solid fa-warehouse mr-10 bg-orange-600"></i> :  <Link to="/Dashboard"><i class="fa-solid fa-gauge mr-10"></i> Dashboard</Link>}
        {isOpen== true ?  <i class="fa-solid fa-users mr-10"></i> : <Link style={{display: isAdmin === "user" ? "none" : ""}} to="/Employee"><i class="fa-solid fa-users mr-10"></i>Employee </Link>}
        {isOpen== true ?  <i class="fa-solid fa-users-gear mr-10"></i> :  <Link to="/Costomars"> <i class="fa-solid fa-user-astronaut mr-10"></i> Customers </Link>} 
        {isOpen== true ?  <i class="fa-brands fa-salesforce mr-10"></i> :  <Link to="/Sales"><i class="fa-solid fa-money-bill-trend-up mr-10"></i> Sales</Link> }
        {isOpen== true ?  <i class="fa-solid fa-warehouse mr-10"></i> :  <Link to="/Inventory"><i class="fa-solid fa-warehouse mr-10"></i>Inventory</Link>}
        {isOpen== true ?  <i class="fa-solid fa-parachute-box mr-10"></i> : <Link to="/Product"><i class="fa-solid fa-parachute-box mr-10"></i>Product</Link>}
        {isOpen== true ?  <i class="fa-solid fa-user-tie mr-10"></i> : <Link style={{display: isAdmin === "user" ? "none" : ""}} to="/Supplier"><i class="fa-solid fa-hand-holding-hand mr-10"></i>Supplier</Link>}
        {isOpen== true ?  <i class="fa-solid fa-cart-shopping mr-10"></i> : <Link style={{display: isAdmin === "user" ? "none" : ""}} to="/Purchase"><i class="fa-solid fa-cart-shopping mr-10"></i>Purchase</Link>}
        {isOpen== true ?  <i class="fa-solid fa-cart-shopping mr-10"></i> : <Link style={{display: isAdmin === "user" ? "none" : ""}} to="/Users"><i class="fa-solid fa-user mr-10"></i> Users</Link>}
        {isOpen== true ?  <i class="fa-solid fa-cart-shopping mr-10"></i> : <Link style={{display: isAdmin === "user" ? "none" : ""}} to="/Reports"><i class="fa-solid fa-reply-all mr-10"></i>Reports</Link>}
        {isOpen== true ?  <i class="fa-solid fa-right-from-bracket mr-10"></i> :  <Link to="/" onClick={logout}><i class="fa-solid fa-right-from-bracket mr-10"></i>Logout </Link>}
        </div>
        </div>
        
    </div>
}
export default Sidenav