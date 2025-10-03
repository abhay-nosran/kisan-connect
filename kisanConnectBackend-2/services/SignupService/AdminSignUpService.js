const createUser = require("./createUser");

class AdminSignupService {
  static async signup(params) {
    const { email, password, phone } = params;

    try {
      await createUser(email, password, phone, "admin");
      return { status: 200, message: "Admin user created successfully." };
    } catch (err) {
      return { status: err.status, message: err.message };
    }
  }
}

module.exports = AdminSignupService;
