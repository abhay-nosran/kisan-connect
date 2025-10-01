import React, { useEffect, useState } from 'react';

export default function PendingCrops() {
  const [crops, setCrops] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [auctionDetails, setAuctionDetails] = useState({
    base_price: '',
    start_time: '',
    end_time: '',
  });

  const fetchPendingCrops = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/admin/pending-crops', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setCrops(data.crops);
    } catch (error) {
      console.error('Error fetching crops:', error);
    }
  };

  useEffect(() => {
    fetchPendingCrops();
  }, []);

  const openModal = (crop) => {
    setSelectedCrop(crop);
    setAuctionDetails({ base_price: '', start_time: '', end_time: '' });
  };

  const closeModal = () => {
    setSelectedCrop(null);
  };

  const handleInputChange = (field, value) => {
    setAuctionDetails((prev) => ({ ...prev, [field]: value }));
  };

  const isAuctionValid = () => {
    const now = new Date();
    const start = new Date(auctionDetails.start_time);
    const end = new Date(auctionDetails.end_time);

    return (
      auctionDetails.base_price &&
      auctionDetails.start_time &&
      auctionDetails.end_time &&
      start > now &&
      end > start
    );
  };

  const approveCrop = async () => {
    const { base_price, start_time, end_time } = auctionDetails;
    if (!isAuctionValid()) {
      alert('Invalid auction timings. Please ensure:\n• Start time is in the future\n• End time is after start time');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/admin/approve-crop', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop_id: selectedCrop.id,
          base_price,
          start_time,
          end_time,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Crop approved. Auction ID: ${data.auction_id}`);
        closeModal();
        fetchPendingCrops();
      } else {
        const errorData = await response.json();
        alert(`Failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error approving crop:', error);
      alert('Server error occurred');
    }
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {crops.map((crop) => (
          <div key={crop.id} className="bg-white shadow-md rounded-2xl p-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-1 capitalize">{crop.crop_name}</h2>
            <p><strong>Crop ID:</strong> {crop.id}</p>
            <p><strong>Quantity:</strong> {crop.quantity}</p>
            <p><strong>Farmer ID:</strong> {crop.farmer_id}</p>
            <p><strong>Certification:</strong> {crop.certification}</p>
            <p><strong>Status:</strong> {crop.status}</p>
            {crop.crop_location && <p><strong>Location:</strong> {crop.crop_location}</p>}
            {crop.quality_grade && <p><strong>Grade:</strong> {crop.quality_grade}</p>}
            {crop.shelf_life && <p><strong>Shelf Life:</strong> {crop.shelf_life} days</p>}

            <div className="mt-4 flex gap-2">
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700"
                onClick={() => openModal(crop)}
              >
                Approve
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600">
                Deny
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCrop && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Approve Crop: {selectedCrop.crop_name}</h2>

            <label className="block mb-2 font-medium">Base Price</label>
            <input
              type="number"
              className="w-full border p-2 rounded mb-4"
              value={auctionDetails.base_price}
              onChange={(e) => handleInputChange('base_price', e.target.value)}
              placeholder="Enter base price"
            />

            <label className="block mb-2 font-medium">Start Time</label>
            <input
              type="datetime-local"
              className="border rounded px-2 py-1 w-full mb-4"
              value={auctionDetails.start_time}
              min={new Date().toISOString().slice(0, 16)}
              onChange={(e) => handleInputChange('start_time', e.target.value)}
            />

            <label className="block mb-2 font-medium">End Time</label>
            <input
              type="datetime-local"
              className="border rounded px-2 py-1 w-full mb-4"
              value={auctionDetails.end_time}
              min={auctionDetails.start_time || new Date().toISOString().slice(0, 16)}
              onChange={(e) => handleInputChange('end_time', e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className={`px-4 py-2 text-white rounded ${
                  isAuctionValid() ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
                }`}
                onClick={approveCrop}
                disabled={!isAuctionValid()}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
