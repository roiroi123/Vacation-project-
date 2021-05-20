const express = require('express');
const usersLogic = require('../Logic/users-logic');

const router = express.Router();

//Registration
router.post('/', async (req, res, next) => {
  try {
    const userRegistrationDetails = req.body;
    const userId = await usersLogic.register(userRegistrationDetails);
    res.json(userId);
  } catch (error) {
    console.log('Next Error: '+error);

    return next(error);
  }
});

//Login
router.post('/login', async (req, res, next) => {
  const userLoginDetails = req.body;

  try {
    const userData = await usersLogic.login(userLoginDetails);
    // Send logged users token to client
    res.json(userData);
  } catch (error) {
    return next(error);
  }
});

//Get all users
router.get('/', async (req, res, next) => {
  try {
    const users = await usersLogic.getAllUsers();
    res.json(users);
  } catch (error) {
    return next(error);
  }
});

//Get one user
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await usersLogic.getOneUser(id);
    res.json(result);
  } catch (error) {
    return next(error);
  }
});

//Update
router.put('/:id', async (req, res, next) => {
  try {
    const userUpdateDetails = req.body;
    const id = req.params.id;
    const result = await usersLogic.update(userUpdateDetails, id);
    console.log(result);

    res.json('User was updated');
  } catch (error) {
    return next(error);
  }
});

//Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await usersLogic.deleteUser(id);
    console.log(result);

    res.json('User was deleted');
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
