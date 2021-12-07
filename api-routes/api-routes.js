// Initialize express router
// eslint-disable-next-line new-cap
const router = require('express').Router();

// Set default API Response
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: `Successfully! Access to admin panel be API's!`,
  });
});

const userRoutes = require('./user-routes');
// User routes
router.use('/user', userRoutes);

// Export API routes
module.exports = router;
