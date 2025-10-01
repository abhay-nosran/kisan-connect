import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

function Buyer() {
    const userType = localStorage.getItem("userType") || "null";
    const userId = localStorage.getItem("userId") || "null";
    const navigate = useNavigate();
  useEffect(() => {
    if(userType !== "buyer") {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");    
        localStorage.removeItem("userId");
        navigate("/login");
    }
  }, [userType,userId]);

  return (
    
    <div className="font-[poppins] px-[84px] py-[20px] bg-[#FFF9EC]">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Buyer
