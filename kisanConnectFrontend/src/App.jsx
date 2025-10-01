import Navbar from "./components/Navbar";
import { Outlet } from "react-router";
function App() {
  return (
    
    <div className="font-[poppins] px-[84px] py-[20px] bg-[#FFF9EC]">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App
