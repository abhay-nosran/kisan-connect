const cropService = require('../../services/CropServices/CropService');

class CropController {
  // ✅ Add crop to the auction table
  static async addToAuction(req, res) {
    try {
      const { cropId, basePrice, startTime, endTime, adminId } = req.body;

      if (!cropId || !basePrice || !startTime || !endTime || !adminId) {
        return res.status(400).send("Missing required fields");
      }

      const params = { cropId, basePrice, startTime, endTime, adminId };
      await cropService.addToAuction(params);

      return res.status(201).send("Crop added to auction successfully");
    } catch (err) {
      console.error(err);
      return res.status(500).send(err.message || "Internal server error");
    }
  }

  // ✅ Create a new crop
  static async createCrop(req, res) {
    try {
      const { farmerId, representativeId, cropType, quantityKg, qualityGrade, certification, notes } = req.body;

      if (!farmerId || !representativeId || !quantityKg || !qualityGrade) {
        return res.status(400).send("Missing required fields");
      }

      const params = {
        farmerId,
        representativeId,
        cropType: cropType || 'Not Specified',
        quantityKg,
        qualityGrade,
        certification: certification || null,
        notes: notes || null,
      };

      await cropService.createCrop(params);
      return res.status(201).send("Crop created successfully");
    } catch (err) {
      return res.status(500).send(err.message);
    }
  }

  // ✅ Get pending crops for approval (admin only)
  static async getPendingCrops(req, res) {
    try {
      const { adminId } = req.params;

      if (!adminId) {
        return res.status(400).json({ error: "adminId is required" });
      }

      const crops = await cropService.getPendingCrops(adminId);
      return res.status(200).json(crops);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = CropController;
