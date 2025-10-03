const FarmerSignupService = require("../../services/SignupService/FarmerSignupService");

class FarmerSignupController {
  constructor() {
    throw new Error("Can't create an instance of FarmerSignupController static class");
  }

  static async signup(req, res) {
    const { email, phone, password } = req.body;

    if (!email || !phone || !password) {
      return res.status(400).json({ message: "email/phone/password field missing" });
    }

    const params = { email, phone, password };
    try {
      const response = await FarmerSignupService.signup(params);
      const status = response.status;
      delete response.status;
      res.status(status).json(response);
    } catch (err) {
      res.status(500).json({ message: err.message || "Error in farmer signup" });
    }
  }
}

module.exports = FarmerSignupController;
