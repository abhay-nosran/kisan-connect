// const {Crop} = require('./models/Crop.js')

// Crop.sync({alter:true})
//   .then(() => {
//     console.log('Crop table created or already exists.');})
//   .catch((error) => {
//     console.error('Error creating Crop table:', error);
//   })


const {sequelize} = require('./models/relationships');

async function syncDatabase() {
  try {
    // Force: true will drop tables if they exist
    // Force: false will create missing tables only
    // await sequelize.sync({ force: false });
    await sequelize.sync({ alter: true });
    // await sequelize.sync();
    console.log('All tables synced successfully!');
  } catch (error) {
    console.error('Error syncing database:', error);
  } 
//   finally {
//     await sequelize.close();
//   }
}

module.exports =  syncDatabase ;




