import { Pen } from "lucide-react";
import PendingCrops from "./PendingCrops";
export default function Admin() {
    const userType = localStorage.getItem("userType") || "null";
    const userId = localStorage.getItem("userId") || "null";

    if (userType !== "admin") {
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userId");
        window.location.href = "/login";
    }
    return (
        <>
            <div id="header" className="flex justify-center">
                <div>
                    <h1 className="text-2xl font-bold">Admin Dashboard : {userId}</h1>
                </div>
            </div>
            <div>
                <PendingCrops />
            </div>

        </>
    );
}