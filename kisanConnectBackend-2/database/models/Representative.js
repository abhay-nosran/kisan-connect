// models/Representative.js
const { sequelize , DataTypes } = require('../dbConnection');

const Representative = sequelize.define("Representative", {
  representative_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  tableName: "representatives",
  timestamps: false
});

module.exports = Representative;
