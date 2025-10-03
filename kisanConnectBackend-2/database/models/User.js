const { sequelize , DataTypes } = require('../dbConnection');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field : "user_id" 
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true
  },
  passwordHash: {
    type: DataTypes.TEXT,
    allowNull: false ,
    field : "password_hash"
  },
  role: {
    type: DataTypes.ENUM('admin', 'farmer', 'buyer', 'representative','not assigned'),
    allowNull: false,
    defaultValue: 'not assigned'
  },
  roleId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field : "role_id"
    // can be a foreign key to another table later
  },
}, {
  tableName: 'users',
  timestamps: false 
});

module.exports = User;
