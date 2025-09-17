const { sequelize, DataTypes } = require('../dbConnection');

const Farmer = sequelize.define('Farmer', {
  farmer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  location: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  aadhar_number: {
    type: DataTypes.STRING(12),
    allowNull: true,
    unique: true,
    validate: {
      is: /^[0-9]{12}$/   // same as CHECK constraint in SQL
    }
  }
}, {
  tableName: 'farmers',
  timestamps: false
});


module.exports = Farmer;
