const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const isAdmin = require('../middleware/isAdmin');

// Public protected route (any logged-in user)
router.get('/protected', verifyToken, (req, res) => {
  res.json({
    message: 'Access granted to protected route!',
    user: req.user
  });
});

// Admin-only route
router.get('/admin', verifyToken, isAdmin, (req, res) => {
  res.json({
    message: 'Access granted to admin route!',
  });
});

module.exports = router;
