import { useState, useEffect } from 'react';

const Price = ({ setPriceRange }) => {
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  // Clamp values between 100 and 10000, or empty string if cleared
  const clampValue = (value) => {
    if (value === '') return '';
    const num = Number(value);
    if (isNaN(num)) return '';
    return Math.min(Math.max(num, 100), 10000);
  };

  useEffect(() => {
    setPriceRange([min === '' ? '' : Number(min), max === '' ? '' : Number(max)]);
  }, [min, max, setPriceRange]);

  return (
    <div className="flex flex-col gap-2 w-[220px]">
      <label className="mb-1 font-medium text-gray-700">Price Range</label>
      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Min"
          className="border rounded-lg px-3 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={min}
          min={100}
          max={10000}
          onChange={e => setMin(clampValue(e.target.value))}
        />
        <span className="mt-2 text-gray-600">—</span>
        <input
          type="number"
          placeholder="Max"
          className="border rounded-lg px-3 py-1 w-24 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={max}
          min={100}
          max={10000}
          onChange={e => setMax(clampValue(e.target.value))}
        />
      </div>
    </div>
  );
};

export default Price;
