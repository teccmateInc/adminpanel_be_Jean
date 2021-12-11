// Import User Model
const User = require('../models/user-model');
const { handleError, handleErrorWithStatus, strictValidObjectWithKeys, strictValidArrayWithMinLength, strictValidArray, generateValidationsErrors } = require('../helper/utils');
const sendToken = require("../helper/jwtToken");
const Candidate = require('../models/candidate-model');
const Client = require("../models/client-model");
const Admin = require("../models/administrator-model");
const user = require('../api-routes/admins-routes');
const SuperAdmin = require("../models/superAdministrator-model");
// Handle get Users actions
exports.getUsers = (_, res) => {
  User.get((err, users) => {
    if (err) handleError(res, err);
    else {
      res.json({
        status: 'success',
        data: users,
      });
    }
  });
};

//user login
exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'enter email and password' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    const passwordMatched = await user.comparePassword(password);
    if (!passwordMatched) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
    else sendToken(user, 200, res);
  }
  catch (err) {
    handleError(res, "invalid input")
  }
}




exports.registerUser = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    const user = await User.create({
      firstname,
      lastname,
      email,
      password,

    });

    sendToken(user, 201, res);


  } catch (err) {

    handleError(res, "invalid inputs")
  }

}


//logout User
exports.logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  }
  catch (err) {
    handleError(res, "something went wrong")
  }
};
//get all clients
exports.getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find()
    if (strictValidArrayWithMinLength(clients, 1)) {
      res.status(200).json({
        success: true,
        clients
      })
    }
    else {
      res.status(401).json({
        success: false,
        message: "nothing in clients array"
      })
    }
  } catch (err) {
    handleError(res, "Clients not found")
  }

}


//create new clients
exports.createNewClient = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, role = "client" } = req.body
    let client = await User.create({ firstname, lastname, email, password, role })
    client.save(async (err) => {
      if (err) handleError(res, err);
      else {
        client = await Client.create({ ...req.body, userId: client.id })
        client.save((err) => {
          if (err) handleError(res, "Unable to create client")
          else { res.json({ status: 'success', data: client }) }
        })
      }
    });
  } catch (error) {
    console.log(error);
    if (error && error.code === 11000) handleError(res, 'Email is already exists!')
    else handleError(res, "Client not created", generateValidationsErrors(err))
  }
}


//get client
exports.getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.clientId)
    if (strictValidObjectWithKeys(client)) {

      res.status(200).json({
        success: true,
        message: "Client found successfully",
        client
      })
    } else {
      res.status(200).json({
        success: false,
        message: "client not found"
      })
    }
  } catch (err) {
    console.log(err)
    handleError(res, "client not found")
  }
}


//update client
exports.updateClient = async (req, res, next) => {
  try {
    let client = await User.findById(req.params.clientId)
    if (strictValidObjectWithKeys(client)) {
      client = await User.findByIdAndUpdate(req.params.clientId, req.body, {
        new: true,
        runValidators: false,
        useFindAndModify: false

      })
      client = await Client.findOneAndUpdate({ userId: req.params.clientId }, req.body, {
        new: true,
        runValidators: false,
        useFindAndModify: false

      })
      res.status(200).json({
        success: true,
        message: "candidate updated successfully"
      })
    }
    else {
      res.status(200).json({
        success: false,
        message: "client object not found"
      })
    }
  }
  catch (err) {
    handleError(res, "Candidate not found")
  }
}

//delete client
exports.deleteClient = async (req, res, next) => {
  try {
    let client = await User.findById(req.params.clientId)
    if (strictValidObjectWithKeys(client)) {
      client = await User.findByIdAndDelete(req.params.clientId)
      client = await Client.findOneAndRemove({ userId: req.params.clientId })
      res.status(200).json({
        success: true,
        message: "Client deleted successfully"
      })
    }
    else {
      res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
  }
  catch (err) {
    handleError(res, "something went wrong")
  }
}

//get all candidates
exports.getAllCandidates = async (req, res, next) => {
  try {
    const users = await Candidate.find()
    if (strictValidArrayWithMinLength(users, 1)) {
      res.status(200).json({
        success: true,
        users
      })
    }
    else {
      res.status(401).json({
        success: false,
        message: "nothing on candidates array"
      })

    }
  } catch (err) {
    handleError(res, "Users not found")
  }
}



//create new candidate
exports.createNewCandidate = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, role = "candidate" } = req.body
    const user = await User.create({ firstname, lastname, email, password, role })
    user.save(async (err, user) => {
      if (err) handleError(res, err);
      else {
        const candidate = await Candidate.create({ ...req.body, userId: user.id })
        candidate.save((err) => {
          if (err) handleError(res, "Unable to create candidate")
          else {
            res.status(201).json({
              success: true,
              data: candidate,
              message: 'Created'
            })
          }
        })
      }
    });
  } catch (err) {
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    else handleError(res, "Candidate not created", generateValidationsErrors(err))
  }
}

//get candidate
exports.getCandidate = async (req, res, next) => {
  try {
    const user = await Candidate.findById(req.params.id)
    if (strictValidObjectWithKeys(user)) {

      res.status(200).json({
        success: true,
        message: "Candidate found successfully",
        user
      })
    } else {
      res.status(200).json({
        success: false,
        message: "User not found"
      })
    }
  } catch (err) {
    console.log(err)
    handleError(res, "candidate not found")
  }
}

//update candidate
exports.updateCandidate = async (req, res, next) => {
  try {
    let candidate = await User.findById(req.params.id)
    console.log(candidate)
    if (strictValidObjectWithKeys(candidate)) {
      candidate = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: false,
        useFindAndModify: false

      })
      candidate = await Candidate.findOneAndUpdate({ userId: req.params.id }, req.body, { new: true, runValidators: false, useFindAndModify: false })
      res.status(201).json({
        success: true,
        message: "updated successfully",
        data: candidate
      })
    }
    else {
      res.status(200).json({
        success: false,
        message: "candidate not found."
      })
    }
  }
  catch (err) {
    handleError(res, "Candidate not found")
  }
}

//delete candidate
exports.deleteCandidate = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.id)
    if (strictValidObjectWithKeys(user)) {

      user = await User.findByIdAndDelete(req.params.id)

      user = await Candidate.findOneAndRemove({ userId: req.params.id })
      res.status(200).json({
        success: true,
        message: "Candidate deleted successfully"
      })
    }
    else {
      res.status(400).json({
        success: false,
        message: "Candidate not found"
      })
    }
  }
  catch (err) {
    handleError(res, "something went wrong")
  }
}

//get all admins
exports.getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find()
    if (strictValidArrayWithMinLength(admins, 1)) {
      res.status(200).json({
        success: true,
        admins
      })
    }
    else {
      res.status(400).json({ success: false, message: "no Admin found" })
    }
  }
  catch (err) {
    handleError(res, "invalid admin")
  }
}
//get admin by id
exports.getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id)
    if (strictValidObjectWithKeys(admin)) {
      res.status(200).json({
        success: true,
        message: "Admin found successfully",
        admin
      })
    }
    else {
      res.status(400).json({
        success: false,
        message: "Admin not found"
      })
    }
  }
  catch (err) {
    handleError(res, "Admin not found")
  }
}

//create admin
exports.createNewAdmin = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, role = "admin" } = req.body
    const user = await User.create({ firstname, lastname, email, password, role })
    user.save(async (err) => {
      if (err) handleError(res, err);
      else {
        const admin = await Admin.create({ ...req.body, userId: user.id })
        admin.save((err) => {
          if (err)
            handleError(res, "Admin not created")
          else {
            res.status(200).json({
              success: true,
              message: "Admin created successfully"
            })
          }
        })
      }
    });
  } catch (err) {
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    else handleError(res, "Admin not created", generateValidationsErrors(err))
  }
}

//update Admin
exports.updateAdmin = async (req, res, next) => {
  let user = await User.findById(req.params.id)
  if (strictValidObjectWithKeys(user)) {
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
      useFindAndModify: false

    })
    user = await Admin.findOneAndUpdate({ userId: req.params.id }, req.body, { new: true, runValidators: false, useFindAndModify: false })
    res.status(200).json({
      success: true,
      message: "Admin updated successfully"
    })
  }
  else {
    res.status(404).json({
      success: false,
      message: "admin not found"
    })
  }
}

//delete admin
exports.deleteAdmin = async (req, res, next) => {
  let user = await User.findById(req.params.id)
  if (!user) {
    res.status(400).json({
      success: false,
      message: "User not found"
    })
  }
  user = await User.findByIdAndDelete(req.params.id)
  user = await Admin.findOneAndRemove({ userId: req.params.id })
  res.status(200).json({
    success: true,
    message: "Admin deleted successfully"
  })
}

//get super Admin
exports.getSuperAdmin = async (req, res, next) => {
  try {

    const user = await SuperAdmin.find()
    if (strictValidArrayWithMinLength(user, 1)) {
      res.status(200).json({
        success: true,
        message: "superAdmin found successfully",
        user
      })
    }
    else {
      res.status(400).json({ success: false, message: "no SuperAdmin found" })
    }
  } catch (err) {
    handleError(res, 'SuperAmin not found')
  }
}

exports.createSuperAdmin = async (req, res, next) => {
  try {
    const { firstname, lastname, email, password, role = "superadmin" } = req.body
    let Superadmin = await User.create({ firstname, lastname, email, password, role })
    Superadmin.save(async (err) => {
      if (err) handleError(res, "SuperAdmin not created")
      else {
        const superAdmin = await SuperAdmin.create({ ...req.body, userId: Superadmin.id })
        superAdmin.save((err) => {
          if (err) {
            handleError(res, "SuperAdmin not created")
          }
          else {
            res.status(201).json({
              success: true,
              message: "SuperAdmin created successfully",
              data: superAdmin
            })
          }
        })
      }
    })
  }
  catch (err) {
    // console.log(err);
    if (err && err.code === 11000) handleError(res, 'Email is already exists!');
    else handleError(res, "SuperAdmin not created", generateValidationsErrors(err))
  }
}

//update super admin
exports.updateSuperAdmin = async (req, res, next) => {
  try {
    let superadmin = await User.findById(req.params.superAdminId)
    if (strictValidObjectWithKeys(superadmin)) {
      superadmin = await User.findByIdAndUpdate(req.params.superAdminId, req.body, { new: true, runValidators: false, useFindAndModify: false })
      superadmin = await SuperAdmin.findOneAndUpdate({ userId: req.params.id }, req.body, { new: true, runValidators: false, useFindAndModify: false })
      res.status(200).json({
        success: true,
        message: "SuperAdmin updated successfully",
        data: superadmin
      })
    } else {
      res.status(401).json({
        success: false,
        message: "Super Admin not updated"
      })
    }
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "SuperAdmin not found"
    })
  }
}


//delete admin
exports.deleteSuperAdmin = async (req, res, next) => {
  try {

    let user = await User.findById(req.params.superAdminId)
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found"
      })
    }
    user = await User.findByIdAndDelete(req.params.superAdminId)
    user = await Admin.findOneAndRemove({ userId: req.params.superAdminId })
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully"
    })

  } catch (err) {
    handleError(res, "something went wrong")
  }
}

