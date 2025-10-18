import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if(token){
    return children ;
  }else{
    localStorage.removeItem("user") ;
    return <Navigate to="/login" replace />;
  }

}
