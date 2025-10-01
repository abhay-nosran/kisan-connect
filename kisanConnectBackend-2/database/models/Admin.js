// models/Admin.js
const { sequelize , DataTypes } = require('../dbConnection');

const Admin = sequelize.define("Admin", {
  adminId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: "admin_id"
  }
}, {
  tableName: "admins",
  timestamps: false
});

module.exports = Admin;
