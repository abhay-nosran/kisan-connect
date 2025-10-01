const { sequelize , DataTypes } = require('../dbConnection');

const Buyer = sequelize.define("Buyer", {
  buyerId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: "buyer_id"
  },
  buyerType: {
    type: DataTypes.ENUM("individual", "company"),
    allowNull: false,
    field: "buyer_type"
  },
  companyName: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "company_name"
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
    field: "created_at"
  }
}, {
  tableName: "buyers",
  timestamps: false
});

module.exports = Buyer;
