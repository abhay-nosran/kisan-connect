const {cropService} = require('../../services/CropServices/CropService')

// will add crop to the auction table 
// required fields: crop_id, base_price , start_time, end_time , admin_id
async function addToAuction(req, res) {
    return cropService.addToAuction(req) ;
}