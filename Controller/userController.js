// const AddUser = require('./adduser');
// const nodemailer = require('nodemailer');

// // Create a Nodemailer transporter for Gmail
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'luckyrajput57028@gmail.com',   
//     pass: 'nsbgfpjelehbqgsf',    
//   },
// });

// // Function to send an email
// async function sendEmail(gmail) {
//   const mailOptions = {
//     from: 'luckyrajput57028@gmail.com',
//     to: gmail,
//     subject: 'Welcome to our platform!',
//     text: 'Hello, thank you for signing up! We are glad to have you.',
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

// // Controller to add a new user
// async function addUser(req, res) {
//   const { name, phone, gmail, profession, bio, image } = req.body;

//   try {
//     // Add user to the database
//     const newUser = await AddUser.create({
//       name,
//       phone,
//       gmail,
//       profession,
//       bio,
//       image,
//     });

//     // Send email notification to the user
//     await sendEmail(gmail);

//     // Send response
//     res.status(201).json({
//       message: 'User added successfully!',
//       user: newUser,
//     });
//   } catch (error) {
//     console.error('Error adding user:', error);
//     res.status(500).json({ error: 'Something went wrong. Please try again later.' });
//   }
// }

// module.exports = { addUser };



// ===============================================================================

// const AddUser = require('../models/adduser'); // Import AddUser model
// const nodemailer = require('nodemailer');
// const path = require('path');

// // Nodemailer transporter configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'luckyrajput57028@gmail.com',
//     pass: 'nsbgfpjelehbqgsf',  
//   },
// });

// // Function to send an email
// async function sendEmail(gmail) {
//   const mailOptions = {
//     from: 'luckyrajput57028@gmail.com',
//     to: gmail,
//     subject: 'Welcome to our platform!',
//     text: 'Hello, thank you for signing up! We are glad to have you.',
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log('Email sent successfully to:', gmail);
//   } catch (error) {
//     console.error('Error sending email:', error);
//   }
// }

// // Controller to add a new user
// async function addUser(req, res) {
//   const { name, phone, gmail, profession, bio } = req.body;
//   const image = req.file ? req.file.filename : null; // Save the file name in the database

//   // Validation
//   if (!name || !phone || !gmail) {
//     return res.status(400).json({ error: 'Name, phone, and email are required.' });
//   }

//   try {
//     // Add user to the database
//     const newUser = await AddUser.create({
//       name,
//       phone,
//       gmail,
//       profession,
//       bio,
//       image,
//     });

//     // Send email notification
//     await sendEmail(gmail);

//     res.status(201).json({
//       message: 'User added successfully!',
//       user: newUser,
//     });
//   } catch (error) {
//     console.error('Error adding user:', error);
//     res.status(500).json({ error: 'Something went wrong while adding the user.' });
//   }
// }

// // Controller to get a user by their ID
// async function getUser(req, res) {
//   const { id } = req.params;

//   try {
//     const user = await AddUser.findByPk(id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error('Error fetching user:', error);
//     res.status(500).json({ error: 'Something went wrong while fetching the user.' });
//   }
// }

// // Controller to update a user's details by their ID
// async function updateUser(req, res) {
//   const { id } = req.params;
//   const { name, phone, gmail, profession, bio } = req.body;
//   const image = req.file ? req.file.filename : null; // Save the new file name if provided

//   try {
//     const user = await AddUser.findByPk(id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     await user.update({
//       name: name || user.name,
//       phone: phone || user.phone,
//       gmail: gmail || user.gmail,
//       profession: profession || user.profession,
//       bio: bio || user.bio,
//       image: image || user.image,
//     });

//     res.status(200).json({
//       message: 'User updated successfully!',
//       user,
//     });
//   } catch (error) {
//     console.error('Error updating user:', error);
//     res.status(500).json({ error: 'Something went wrong while updating the user.' });
//   }
// }

// // Controller to delete a user by their ID
// async function deleteUser(req, res) {
//   const { id } = req.params;

//   try {
//     const user = await AddUser.findByPk(id);

//     if (!user) {
//       return res.status(404).json({ error: 'User not found.' });
//     }

//     await user.destroy();

//     res.status(200).json({
//       message: 'User deleted successfully!',
//     });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     res.status(500).json({ error: 'Something went wrong while deleting the user.' });
//   }
// }

// module.exports = { addUser, getUser, updateUser, deleteUser };








// const AddUser = require('../models/adduser'); // Import AddUser model
// const nodemailer = require('nodemailer');

// // Nodemailer transporter configuration
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'luckyrajput57028@gmail.com',
//         pass: 'nsbgfpjelehbqgsf',
//     },
// });

// // Function to send an email
// async function sendEmail(gmail) {
//     const mailOptions = {
//         from: 'luckyrajput57028@gmail.com',
//         to: gmail,
//         subject: 'Welcome to our platform!',
//         text: 'Hello, thank you for signing up! We are glad to have you.',
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully to:', gmail);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// }

// // Controller to add a new user
// async function addUser(req, res) {
//     const { name, phone, gmail, profession, bio } = req.body;
//     const image = req.file ? req.file.filename : null; // Uploaded image file name

//     // Validation
//     if (!name || !phone || !gmail) {
//         return res.status(400).json({ error: 'Name, phone, and email are required.' });
//     }

//     try {
//         // Add user to the database
//         const newUser = await AddUser.create({
//             name,
//             phone,
//             gmail,
//             profession,
//             bio,
//             image,
//         });

//         // Send email notification
//         await sendEmail(gmail);

//         res.status(201).json({
//             message: 'User added successfully!',
//             user: newUser,
//         });
//     } catch (error) {
//         console.error('Error adding user:', error);
//         res.status(500).json({ error: 'Something went wrong while adding the user.' });
//     }
// }

// // Controller to fetch all users
// async function getAllUsers(req, res) {
//     try {
//         const users = await AddUser.findAll(); // Fetch all users from the database
//         res.status(200).json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ error: 'Something went wrong while fetching users.' });
//     }
// }

// // Controller to get a user by their ID
// async function getUser(req, res) {
//     const { id } = req.params;

//     try {
//         const user = await AddUser.findByPk(id);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found.' });
//         }

//         res.status(200).json(user);
//     } catch (error) {
//         console.error('Error fetching user:', error);
//         res.status(500).json({ error: 'Something went wrong while fetching the user.' });
//     }
// }

// // Controller to update a user's details by their ID
// async function updateUser(req, res) {
//     const { id } = req.params;
//     const { name, phone, gmail, profession, bio } = req.body;
//     const image = req.file ? req.file.filename : null; // Save new image file name if provided

//     try {
//         const user = await AddUser.findByPk(id);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found.' });
//         }

//         await user.update({
//             name: name || user.name,
//             phone: phone || user.phone,
//             gmail: gmail || user.gmail,
//             profession: profession || user.profession,
//             bio: bio || user.bio,
//             image: image || user.image,
//         });

//         res.status(200).json({
//             message: 'User updated successfully!',
//             user,
//         });
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ error: 'Something went wrong while updating the user.' });
//     }
// }

// // Controller to delete a user by their ID
// async function deleteUser(req, res) {
//     const { id } = req.params;

//     try {
//         const user = await AddUser.findByPk(id);

//         if (!user) {
//             return res.status(404).json({ error: 'User not found.' });
//         }

//         await user.destroy();

//         res.status(200).json({
//             message: 'User deleted successfully!',
//         });
//     } catch (error) {
//         console.error('Error deleting user:', error);
//         res.status(500).json({ error: 'Something went wrong while deleting the user.' });
//     }
// }

// module.exports = { addUser, getUser, updateUser, deleteUser,getAllUsers };


const AddUser = require('../models/adduser'); // Import AddUser model
const nodemailer = require('nodemailer');

// Nodemailer transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'luckyrajput57028@gmail.com',
        pass: 'nsbgfpjelehbqgsf',
    },
});

// Function to send an email
async function sendEmail(gmail) {
    const mailOptions = {
        from: 'luckyrajput57028@gmail.com',
        to: gmail,
        subject: 'Welcome to our platform!',
        text: 'Hello, thank you for signing up! We are glad to have you.',
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully to:', gmail);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Controller to add a new user
async function addUser(req, res) {
    const { name, phone, gmail, profession, bio } = req.body;
    const image = req.file ? req.file.filename : null; // Uploaded image file name

    // Validation
    if (!name || !phone || !gmail) {
        return res.status(400).json({ error: 'Name, phone, and email are required.' });
    }

    try {
        // Add user to the database
        const newUser = await AddUser.create({
            name,
            phone,
            gmail,
            profession,
            bio,
            image,
        });

        // Send email notification
        await sendEmail(gmail);

        res.status(201).json({
            message: 'User added successfully!',
            user: newUser,
        });
    } catch (error) {
        console.error('Error adding user:', error);
        res.status(500).json({ error: 'Something went wrong while adding the user.' });
    }
}

// Controller to get a user by their ID
async function getUser(req, res) {
    const { id } = req.params;

    try {
        const user = await AddUser.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Something went wrong while fetching the user.' });
    }
}

// Controller to fetch all users
async function getAllUsers(req, res) {
    try {
        const users = await AddUser.findAll(); // Fetch all users from the database
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Something went wrong while fetching users.' });
    }
}

// Controller to update a user's details by their ID
async function updateUser(req, res) {
    const { id } = req.params;
    const { name, phone, gmail, profession, bio } = req.body;
    const image = req.file ? req.file.filename : null; // Save new image file name if provided

    try {
        const user = await AddUser.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        await user.update({
            name: name || user.name,
            phone: phone || user.phone,
            gmail: gmail || user.gmail,
            profession: profession || user.profession,
            bio: bio || user.bio,
            image: image || user.image,
        });

        res.status(200).json({
            message: 'User updated successfully!',
            user,
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ error: 'Something went wrong while updating the user.' });
    }
}

// Controller to delete a user by their ID
async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const user = await AddUser.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        await user.destroy();

        res.status(200).json({
            message: 'User deleted successfully!',
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Something went wrong while deleting the user.' });
    }
}

module.exports = { addUser, getUser, getAllUsers, updateUser, deleteUser };
