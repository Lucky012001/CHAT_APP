const jwt = require('jwt-simple');
const secret = 'your_secret_key';  // Replace with your secret key

const generateToken = (user) => {
  const payload = {
    username: user.username,
    email: user.email,
    id: user.id,
  };
  return jwt.encode(payload, secret);
};

module.exports = { generateToken };
