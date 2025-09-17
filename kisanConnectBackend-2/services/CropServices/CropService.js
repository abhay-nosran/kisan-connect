class CropService {
  static async addToAuction(params) {

    cropId = params.cropId 
    adminId = params.adminId 
    basePrice = params.basePrice ;
    startTime = params.startTime ;
    endTime = params.endTime ;
  
    // 1. Check if crop exists
    const crop = await CropModel.findOne({ where: { crop_id } });
    if (!crop) {
      throw new Error('Crop not found');
    }

    // 2. Check if crop is already approved for auction
    if (crop.is_approved_for_auction) {
      throw new Error('Crop is not approved for auction yet');
    }

    // 3. Ensure crop is not already in an active auction
    const existingAuction = await AuctionModel.findOne({ where: { crop_id } });
    if (existingAuction) {
      throw new Error('Crop is already listed in an auction');
    }

    // 4. Create auction entry
    const auctionEntry = await AuctionModel.create({
      crop_id,
      base_price,
      start_time,
      end_time,
      created_by_admin: admin_id  // make column name explicit if schema differs
    });

    return {
      success: true,
      message: 'Crop added to auction successfully',
      auction: auctionEntry
    };
  }

  // required parameters {farmerId(must) , representativeId(must) , cropType , quantityKg , qualityGrade , certification , notes}
  static async createCrop(params) {
    try {
      // Validate required fields
      if (!params.farmerId || !params.representativeId) {
        throw new Error('Farmer ID and Representative ID are required');
      }

      // Extract parameters from request
      const {
        farmerId,
        representativeId,
        cropType = 'Not Specified',
        quantityKg = 0,
        qualityGrade = 'Standard',
        certification = 'None',
        notes = ''
      } = params;

      // Create crop entry in database
      const newCrop = await CropModel.create({
        farmer_id: farmerId,
        representative_id: representativeId,
        crop_type: cropType,
        quantity_kg: quantityKg,
        quality_grade: qualityGrade,
        certification: certification,
        notes: notes
      });

      // Return success response
      return {
        success: true,
        message: 'Crop created successfully',
        data: {
          id: newCrop.id,
          farmerId: newCrop.farmer_id,
          cropType: newCrop.crop_type,
          status: newCrop.status
        }
      };

    } catch (error) {
      // Handle specific database errors
      if (error.name === 'SequelizeUniqueConstraintError') {
        throw new Error('A crop with similar details already exists');
      }

      // Handle other errors
      throw new Error(`Failed to create crop: ${error.message}`);
    }
  }


}
module.exports = CropService;