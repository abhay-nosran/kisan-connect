import Grade from "./Grade";
import Quantity from "./Quantity";
import Price from "./Price";
import { useEffect, useState } from "react";
export default function Filter({
  setSubmitClicked,refFilters
}) {

  const [selectedGrade, setSelectedGrade] = useState([]);
  const [quantityRange,setQuantityRange] = useState([0,1000])
  const [priceRange,setPriceRange] = useState([0,10000])


  useEffect(()=>{
    refFilters.current.selectedGrade = selectedGrade ;
    refFilters.current.quantityRange= quantityRange;
    refFilters.current.priceRange= priceRange;

  },[selectedGrade,quantityRange,priceRange])



  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-2xl shadow-md border border-gray-100 max-w-sm">
      <h2 className="text-lg font-semibold text-gray-700 text-center mb-2">
        Filters
      </h2>

      <Grade
        selectedGrade={selectedGrade}
        setSelectedGrade={setSelectedGrade}
      />

      <Quantity
        quantityRange={quantityRange}
        setQuantityRange={setQuantityRange}
      />

      <Price setPriceRange={setPriceRange} />

      <button
        onClick={() => setSubmitClicked(true)}
        className="mt-2 py-2.5 px-4 bg-[#458448] text-white rounded-lg font-medium hover:bg-[#3a703c] transition-all duration-200"
      >
        Apply Filters
      </button>
    </div>
  );
}
