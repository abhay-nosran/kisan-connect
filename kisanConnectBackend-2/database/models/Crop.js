const {sequelize,DataTypes} = require('../dbConnection');

const Crop = sequelize.define('Crop', {
  crop_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  farmer_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  representative_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  crop_type: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  quantity_kg: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  quality_grade: {
    type: DataTypes.STRING(20)
  },
  date_listed: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW
  },
  is_approved_for_auction: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  certification: {
    type: DataTypes.TEXT
  },
  approved_by_admin_id: {
    type: DataTypes.INTEGER
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'crops',
  timestamps: false   // because your SQL table doesn’t have createdAt/updatedAt
});

module.exports = Crop;