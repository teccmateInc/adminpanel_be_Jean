const Client = require('../models/client-model');
const User = require('../models/user-model');
const {
  handleError,
  strictValidObjectWithKeys,
  strictValidArrayWithMinLength,
  generateValidationsErrors,
} = require('../helper/utils');

// create new clients
exports.createNewClient = async (req, res, next) => {
  try {
    const {firstname, lastname, email, password, role = 'client'} = req.body;
    let client = await User.create({
      firstname, lastname, email, password, role,
    });
    client.save(async (err) => {
      if (err) handleError(res, err);
      else {
        client = await Client.create({
          ...req.body,
          userId: client.id,
          createdBy: req.user,
        });
        client.save((err) => {
          if (err) {
            console.log('errname', err);
            handleError(res, 'Unable to create client!');
          } else {
            res.json({status: 'success', data: client});
          }
        });
      }
    });
  } catch (error) {
    console.log('error.name', error.name);
    if (error && error.code === 11000) {
      handleError(res, 'Email is already exists!');
    } else {
      handleError(res, 'Client not created. Try again later!',
          generateValidationsErrors(error));
    }
  }
};

// get all clients
exports.getAllClients = async (req, res, next) => {
  try {
    const clients = await Client.find()
        .populate('createdBy')
        .populate('updatedBy');
    if (strictValidArrayWithMinLength(clients, 1)) {
      res.status(200).json({
        success: true,
        data: clients,
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Clients not found!',
      });
    }
  } catch (err) {
    handleError(res, 'Something wents wrong. Try again later!');
  }
};

// get client
exports.getClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.clientId)
        .populate('createdBy')
        .populate('updatedBy');
    if (strictValidObjectWithKeys(client)) {
      res.status(200).json({
        success: true,
        message: 'Client found successfully!',
        data: client,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Client not found!',
      });
    }
  } catch (err) {
    console.log(err);
    handleError(res, 'Something wents wrong. Try again later!');
  }
};

// update client
exports.updateClient = async (req, res, next) => {
  try {
    const {clientId} = req.params;
    let client = await User.findById(clientId);
    if (strictValidObjectWithKeys(client)) {
      if (strictValidObjectWithKeys(req.body)) {
        client = await User.findByIdAndUpdate(clientId, req.body, {
          new: true,
          runValidators: true,
          useFindAndModify: false,
        });
        client = await Client.findOneAndUpdate({
          userId: clientId,
        },
        {...req.body, updatedBy: req.user}, {
          new: true,
          runValidators: false,
          useFindAndModify: false,
        });
      }
      res.status(200).json({
        success: true,
        message: 'Client updated successfully!',
        data: client,
      });
    } else {
      res.status(200).json({
        success: false,
        message: 'Client not found!',
      });
    }
  } catch (err) {
    if (strictValidArrayWithMinLength(generateValidationsErrors(err), 1)) {
      handleError(res, 'Client not found!', generateValidationsErrors(err));
    } else handleError(res, 'Something wents wrong. Try again later!');
  }
};

// delete client
exports.deleteClient = async (req, res, next) => {
  try {
    const {clientId} = req.params;
    let client = await User.findById(clientId);
    if (strictValidObjectWithKeys(client)) {
      client = await User.findByIdAndDelete(clientId);
      client = await Client.findOneAndRemove({userId: clientId});
      res.status(200).json({
        success: true,
        message: 'Client deleted successfully!',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Client not found!',
      });
    }
  } catch (err) {
    handleError(res, 'Something wents wrong. Try again later!');
  }
};
