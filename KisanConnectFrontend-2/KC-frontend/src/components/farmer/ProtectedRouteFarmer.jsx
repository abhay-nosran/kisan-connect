import { Navigate } from "react-router-dom";

export default function ProtectedRouteFarmer({ children }) {
  const userString = localStorage.getItem("user")

  const user = userString ? JSON.parse(userString) : null ;

    if(user && user.role === "farmer") return children ;
    else {
        localStorage.removeItem("token") ;
        localStorage.removeItem("user") ;
        return <Navigate to="/login" replace />;
    }

}
