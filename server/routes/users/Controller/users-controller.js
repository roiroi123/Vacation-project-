const express = require('express');
const usersLogic = require('../Logic/users-logic');
const chacheModule = require('../../cache-module')
const {authenticateJWT} = require('../../../middleware/authenticate')
const jwt = require('jsonwebtoken');
const config = require('../../../config.json');




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
   
 
  // Send token to client
    res.json(userData);
  } catch (error) {
    return next(error);
  }
});

// isAuthanticate

router.post('/isAuthanticated', (req,res)=>{
  const { secret } = config;
  try {
    const token = req.body.token;
    console.log("token",token);
    if (token) {
     
      
      jwt.verify(token, secret, (err, user) => {
          if (err) {
              return res.sendStatus(403);
          }
          res.json("true")
      });
  } 

  } catch (error) {
    console.log(error);
    res.sendStatus(401);

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
//authenticateJWT

router.post('/UserRole', async (req, res, next) => {
  const { secret } = config;
  try {
    const token = req.body.token;
    console.log("token",token);
    jwt.verify(token, secret, (err, user) => {
      if (err) {
          return res.sendStatus(403);
      }
      console.log(user);
      res.json(user.sub.role)
      next();
  });

  } catch (error) {
    console.log(error);
    res.sendStatus(401);

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
