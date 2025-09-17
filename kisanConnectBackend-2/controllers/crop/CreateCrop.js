const {cropService} = require('../../services/CropServices/CropService')

async function createCrop(req, res) {

    return cropService.createCrop(req) ;

}

module.exports = { createCrop };