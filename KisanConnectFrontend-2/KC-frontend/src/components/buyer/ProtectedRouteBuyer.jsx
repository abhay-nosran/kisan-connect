import { Navigate } from "react-router-dom";

export default function ProtectedRouteBuyer({ children }) {
  const userString = localStorage.getItem("user")

  const user = userString ? JSON.parse(userString) : null ;

    if(user && user.role === "buyer") return children ;
    else {
        localStorage.removeItem("token") ;
        localStorage.removeItem("user") ;
        return <Navigate to="/login" replace />;
    }

}
