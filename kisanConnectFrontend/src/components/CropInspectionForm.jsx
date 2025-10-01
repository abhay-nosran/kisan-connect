import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { redirect } from "react-router";

const CropInspectionForm = ({id}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
    const token = localStorage.getItem("token")

    if(!token){
      redirect("/login") ;
    }
    try {
        const response = axios.post("http://localhost:5000/representatives/crops",
        {representative_id : id ,
        farmer_id : data.farmer_id,
        crop_name : data.crop_name ,
        quantity : data.quantity ,
        certification : data.certification || "1234",
        crop_location : data.crop_location ,
        quality_grade : data.quality_grade ,
        shelf_life : data.shelf_life},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
        )

        if(response.status === 500){
          alert("Server error. Please try again later.");
          return ;
        }

        alert("Crop Inspection Form submitted successfully");
        reset();
    }catch(error){
        if (error.response && error.response.status === 403) {
          localStorage.removeItem("token");
          redirect("/login");
        }
      console.log(error)
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Crop Inspection Form</h2>

      <div>
        <label className="block font-medium">Representative ID</label>
        <input
          {...register("representative_id", { required: true })}
          className="w-full border p-2 rounded"
          placeholder="Enter Representative ID"
        />
        {errors.representative_id && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Farmer ID</label>
        <input
          {...register("farmer_id", { required: true })}
          className="w-full border p-2 rounded"
          placeholder="Enter Farmer ID"
        />
        {errors.farmer_id && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Crop Name</label>
        <input
          {...register("crop_name", { required: true })}
          className="w-full border p-2 rounded"
          placeholder="Enter Crop Name"
        />
        {errors.crop_name && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Quantity (in kg/tons)</label>
        <input
          {...register("quantity", { required: true })}
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Enter Quantity"
        />
        {errors.quantity && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Certification</label>
        <input
          {...register("certification")}
          className="w-full border p-2 rounded"
          placeholder="Optional Certification Info"
        />
      </div>

      <div>
        <label className="block font-medium">Crop Location</label>
        <input
          {...register("crop_location", { required: true })}
          className="w-full border p-2 rounded"
          placeholder="Enter Location"
        />
        {errors.crop_location && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Quality Grade</label>
        <input
          {...register("quality_grade", { required: true })}
          className="w-full border p-2 rounded"
          placeholder="Enter Quality Grade"
        />
        {errors.quality_grade && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Shelf Life (in days)</label>
        <input
          {...register("shelf_life", { required: true })}
          type="number"
          className="w-full border p-2 rounded"
          placeholder="Enter Shelf Life"
        />
        {errors.shelf_life && (
          <p className="text-red-500 text-sm">This field is required</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CropInspectionForm;
