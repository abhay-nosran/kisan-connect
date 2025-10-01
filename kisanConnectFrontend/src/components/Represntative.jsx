import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CropInspectionForm from "./CropInspectionForm";

export default function Representative() {
    const userType = localStorage.getItem("userType") || "null";
    const userId = localStorage.getItem("userId") || "null";

    const navigate = useNavigate();
  useEffect(() => {
    console.log("User Type:", userType);
    if (userType !== "representative") {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      localStorage.removeItem("userId");
      console.log("Redirecting to login");
      navigate("/login");
    }
  }, [userType,userId]);

 

  return (
    <>
      <div id="header" className="flex justify-center">
        <div>{userType}:{userId}</div>
      </div>
      <CropInspectionForm id={userId} />
    </>
  );
}
