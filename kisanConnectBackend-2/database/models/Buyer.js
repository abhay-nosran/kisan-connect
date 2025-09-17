const { sequelize , DataTypes } = require('../dbConnection');

const Buyer = sequelize.define("Buyer", {
  buyer_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  buyer_type: {
    type: DataTypes.ENUM("individual", "company"),
    allowNull: false
  },
  company_name: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP")
  }
}, {
  tableName: "buyers",
  timestamps: false
});

module.exports = Buyer;
