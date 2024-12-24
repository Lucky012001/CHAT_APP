const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  

const AddUser = sequelize.define('AddUser', {
  // Define the fields for the model
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gmail: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Ensures the field is a valid email
    },
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  image: {
    type: DataTypes.STRING, // You can store image URLs or paths
    allowNull: true,
  },
});

// Sync the model with the database
sequelize.sync({ force: false }).then(() => {
  console.log('AddUser model synced!');
});

module.exports = AddUser;
