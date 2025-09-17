const { Sequelize , DataTypes } = require('sequelize');

require('dotenv').config();
// Supabase connection configuration
const sequelize = new Sequelize({
  dialect: 'postgres',
  host: process.env.SUPABASE_HOST,
  port: process.env.SUPABASE_PORT, // Default PostgreSQL port for Supabase
  database: process.env.SUPABASE_DATABASE,
  username: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to Supabase has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the Supabase database:', error);
  }
};

// Export both sequelize instance and test connection function
module.exports = {
  testConnection , sequelize , DataTypes
};