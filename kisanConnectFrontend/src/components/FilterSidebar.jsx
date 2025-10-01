export default function FilterSidebar(props) {

  const {filters , setFilters , handleSearch} = props.filter ;
  
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };


  return (
    <div className="flex flex-col rounded-3xl p-6 w-80 text-white bg-[#458448]">
      <h2 className="text-2xl font-semibold mb-6 self-center">Filter</h2>

      <label className="block mb-1 text-base">Crop Type</label>
      <select name="cropType" onChange={handleChange} className="w-full mb-4 p-3 rounded-md text-black bg-white">
        <option value="">Select Crop</option>
        <option value="Wheat">Wheat</option>
        <option value="Rice">Rice</option>
        <option value="Maize">Maize</option>
      </select>

      <label className="block mb-1 text-base">Quality Grade</label>
      <select name="qualityGrade" onChange={handleChange} className="w-full mb-4 p-3 rounded-md text-black bg-white">
      <option value="">Select Grade</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
      </select>

      <label className="block mb-1 text-base">Shelf Life</label>
      <select name="shelfLife" onChange={handleChange} className="w-full mb-4 p-3 rounded-md text-black bg-white">
        <option value="">Select Shelf Life</option>
        <option value="5 months">5 months</option>
        <option value="3 months">3 months</option>
        <option value="1 month">1 month</option>
      </select>

      <label className="block mb-1 text-base">Location</label>
      <select name="location" onChange={handleChange} className="w-full mb-4 p-3 rounded-md text-black bg-white">
      <option value="">Select Location</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Punjab">Punjab</option>
        <option value="Bihar">Bihar</option>
      </select>

      <label className="block mb-1 text-base">Sort by</label>
      <select name="sortBy" onChange={handleChange} className="w-full mb-4 p-3 rounded-md text-black bg-white">
        <option value="Low to High">Low to High</option>
        <option value="High to Low">High to Low</option>
      </select>

      <label className="block mb-1 text-base">Quantity</label>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="number"
          name="quantityMin"
          placeholder="20"
          onChange={handleChange}
          className="w-full p-3 rounded-md text-black bg-white"
        />
        <span className="text-sm text-gray-200">to</span>
        <input
          type="number"
          name="quantityMax"
          placeholder="50"
          onChange={handleChange}
          className="w-full p-3 rounded-md text-black bg-white"
        />
      </div>

      <label className="block mb-1 text-base">Price</label>
      <div className="flex items-center mb-4 space-x-2">
        <input
          type="number"
          name="priceMin"
          placeholder="3000"
          onChange={handleChange}
          className="w-full p-3 rounded-md text-black bg-white"
        />
        <span className="text-sm text-gray-200">to</span>
        <input
          type="number"
          name="priceMax"
          placeholder="10000"
          onChange={handleChange}
          className="w-full p-3 rounded-md text-black bg-white"
        />
      </div>

      <div className="flex items-center space-x-2 mt-2 mb-6">
        <input
          type="checkbox"
          name="immediateDelivery"
          onChange={handleChange}
          className="w-5 h-5 accent-white"
        />
        <label className="text-base">Immediate Delivery</label>
      </div>

      <button
        onClick={handleSearch}
        className="mt-auto w-full py-3 bg-white text-[#458448] font-semibold rounded-md hover:bg-gray-100 transition"
      >
        Search
      </button>
    </div>
  );
}
