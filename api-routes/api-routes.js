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
router.post('/login', (req, res, next)=>{

});

const AdminRouter = require('./adminRoutes');
const CandidateRouter = require('./candidateRoutes');
const userRoutes = require('./user-routes');
// User routes
router.use('/user', userRoutes);
router.use('/candidate', CandidateRouter);
router.use("/admin",AdminRouter)

// Export API routes
module.exports = router;
