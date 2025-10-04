const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: { msg: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { rateLimiter };