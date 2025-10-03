const createUser = require("./createUser");

class RepresentativeSignupService {
  static async signup(params) {
    const { email, password, phone } = params;

    try {
      await createUser(email, password, phone, "representative");
      return { status: 200, message: "Representative user created successfully." };
    } catch (err) {
      return { status: err.status, message: err.message };
    }
  }
}

module.exports = RepresentativeSignupService;
