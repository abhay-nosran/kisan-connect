// models/Admin.js
const { sequelize , DataTypes } = require('../dbConnection');

const Admin = sequelize.define("Admin", {
  admin_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  tableName: "admins",
  timestamps: false
});

module.exports = Admin;
