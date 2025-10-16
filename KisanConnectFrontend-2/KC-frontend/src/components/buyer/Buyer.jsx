import { Outlet } from "react-router";
import Navbar from "./Navbar";

function Buyer(){

    return (
       <>
        {/* Nav bar  */}
        <Navbar />
        <Outlet/>
       </>
       
    )
}

export default Buyer ;