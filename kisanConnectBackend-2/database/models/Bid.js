const {sequelize,DataTypes} = require("../dbConnection");

const Bid = sequelize.define(
  "Bid",
  {
    bidId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "bid_id", // snake_case in DB
    },
    bidAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "bid_amount",
    },
    bidTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "bid_time",
    }
  },
  {
    tableName: "bids", // maps to your DB table
    timestamps: false, // no createdAt/updatedAt in your table
    underscored: true, // if you add timestamps later → created_at, updated_at
  }
);

module.exports = Bid;
