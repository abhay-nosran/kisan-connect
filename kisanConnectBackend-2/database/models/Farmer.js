const { sequelize, DataTypes } = require('../dbConnection');

const Farmer = sequelize.define('Farmer', {
  farmerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field : "farmer_id"
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  aadharNumber: {
    type: DataTypes.STRING(12),
    allowNull: true,
    unique: true,
    field : "aadhar_number",
    validate: {
      is: /^[0-9]{12}$/   // same as CHECK constraint in SQL
    }
  }
}, {
  tableName: 'farmers',
  timestamps: false
});


module.exports = Farmer;
