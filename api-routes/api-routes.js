const expressRouter = require('express').Router;
const router = expressRouter();

// Super admin routes
const superAdminRouter = require('./superAdminRoute');
router.use('/superadmin', superAdminRouter);

// Admin routes
const adminRouter = require('./adminRoutes');
router.use('/admin', adminRouter);

// User routes
const userRoutes = require('./user-routes');
router.use('/user', userRoutes);

// Candidate routes
const candidateRouter = require('./candidateRoutes');
router.use('/candidate', candidateRouter);

// Client routes
const clientRouter = require('./clientRoutes');
router.use('/client', clientRouter);

// Calender routes
const CalendarRouter = require('./calender-routes');
router.use('/calendar', CalendarRouter);

// Order routes
const orderRouter = require('./orderRoutes');
router.use('/order', orderRouter);

// file routes
const fileRouter = require('./fileRoutes');
router.use('/file', fileRouter);

// field routes
const fieldRouter = require('./fieldRoutes');
router.use('/field', fieldRouter);

// Export API routes
module.exports = router;
