const {sequelize,DataTypes} = require('../dbConnection');

const Crop = sequelize.define('Crop', {
  cropId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: 'crop_id'
  },
  cropType: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'crop_type'
  },
  quantityKg: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    field: 'quantity_kg'
  },
  qualityGrade: {
    type: DataTypes.ENUM('A', 'B', 'C') ,
    allowNull: false,
    field: 'quality_grade'     
  },
  dateListed: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
    field: 'date_listed'
  },
  isApprovedForAuction: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_approved_for_auction'
  },
  certification: {
    type: DataTypes.TEXT
  },
  approvedByAdminId: {
    type: DataTypes.INTEGER,
    field: 'approved_by_admin_id'
  },
  notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'crops',
  timestamps: false   // because your SQL table doesn’t have createdAt/updatedAt
});

module.exports = Crop;