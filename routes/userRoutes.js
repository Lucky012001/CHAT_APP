// const express = require('express');
// const { addUser, getUser, updateUser, deleteUser } = require('../Controller/userController');  

// const router = express.Router();

// // Route to add a new user
// router.post('/adduser', addUser);

// // Route to get a user by their ID
// router.get('/user/:id', getUser);

// // Route to update a user's details by their ID
// router.put('/user/:id', updateUser);

// // Route to delete a user by their ID
// router.delete('/user/:id', deleteUser);

// module.exports = router;

const express = require('express');
const upload = require('../middlewares/imageUpload'); // Import the multer middleware
const { addUser,getAllUsers, getUser, updateUser, deleteUser } = require('../Controller/userController');

const router = express.Router();

// Route to add a new user with image upload
router.post('/adduser', upload.single('image'), addUser);

// Route to get all users
router.get('/users', getAllUsers); // New API to fetch all users

// Route to get a user by their ID
router.get('/user/:id', getUser);

// Route to update a user's details by their ID with image upload
router.put('/user/:id', upload.single('image'), updateUser);

// Route to delete a user by their ID
router.delete('/user/:id', deleteUser);

module.exports = router;
