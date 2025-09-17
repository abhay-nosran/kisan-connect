const { sequelize , DataTypes } = require('../dbConnection');

const User = sequelize.define('User', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
  password_hash: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'farmer', 'buyer', 'representative','not assigned'),
    allowNull: false,
    defaultValue: 'not assigned'
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true
    // can be a foreign key to another table later
  },
}, {
  tableName: 'users',
});

module.exports = User;
