const createUser = require("./createUser");

class FarmerSignupService {
  static async signup(params) {
    const { email, password, phone } = params;

    try {
      await createUser(email, password, phone, "farmer");
      return { status: 200, message: "Farmer user created successfully." };
    } catch (err) {
      return { status: err.status, message: err.message };
    }
  }
}

module.exports = FarmerSignupService;
