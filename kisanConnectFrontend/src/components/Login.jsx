import axios from "axios";
import { use, useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting},
    watch,
  } = useForm();
  const [message,setMessage] = useState("");
  
  const watchedEmail = watch("email");
  const watchedPassword = watch("password");

  useEffect(() => {
    setMessage("");
  }, [watchedEmail, watchedPassword]);

const navigate = useNavigate();

const redirectHandler = () => {
  const userType = localStorage.getItem("userType");
  if (userType === "buyer") {
    navigate("/buyer");
  } else if (userType === "farmer") {
    navigate("/farmer");
  } else if (userType === "admin") {
    navigate("/admin");
  } else if (userType === "representative") {
    navigate("/representative");
  } else {
    setMessage("Invalid user type");
  }
};

useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");    
    localStorage.removeItem("userId");
},[])

  const onSubmit = async (data) => {

   try {
    const response = await axios.post("http://localhost:5000/login", {
      email: data.email,
      password: data.password,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("userType");    
    localStorage.removeItem("userId");
    console.log("Login response:", response.data);
    // Save token and user type
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userType", response.data.role);
    localStorage.setItem("userId", parseInt(response.data.role_id));
    console.log("Login data:", data);
    redirectHandler();
  } catch (error) {
    if (error.response && error.response.status === 401) {
      setMessage("Invalid credentials");
    } else {
      setMessage("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }
  }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Enter a valid email address",
            },
          })}
          className="w-full border p-2 rounded"
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Password</label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full border p-2 rounded"
          placeholder="Enter your password"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
         type="submit"
        disabled={isSubmitting}
        className={`w-full text-white p-2 rounded ${
            isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
        }`}
        >
        {isSubmitting ? "Submitting..." : "Login"}
      </button>
      <p>{message}</p>
    </form>


  );
};

export default LoginForm;
