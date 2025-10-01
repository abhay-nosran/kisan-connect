// models/Representative.js
const { sequelize , DataTypes } = require('../dbConnection');

const Representative = sequelize.define("Representative", {
  representativeId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field : "representative_id"
  }
}, {
  tableName: "representatives",
  timestamps: false
});

module.exports = Representative;
