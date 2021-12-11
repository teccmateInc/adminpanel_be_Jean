const Admin=require('../models/administrator-model');

exports.createAdmin=async (req, res, next)=>{
  const admin=await Admin.create(req.body);
  res.status(201).json({
    success: true,
    admin,
    message: 'candidate created successfully',
  });
};
