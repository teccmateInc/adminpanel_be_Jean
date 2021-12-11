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

const { isAuthenticatedUser, AuthorizeRoles } = require('../middlewares/auth');
const AdminRouter = require('./adminRoutes');
const CandidateRouter = require('./candidateRoutes');
const userRoutes = require('./admins-routes');
const OrderRouter = require('./orderRoutes');
const CalendarRouter = require('./calender-routes');
// User routes
router.use('/user', userRoutes);
router.use('/candidates', CandidateRouter);
router.use("/admin",AdminRouter)
router.use("/order",OrderRouter);
router.use("/calendar",CalendarRouter);


// Export API routes
module.exports = router;
