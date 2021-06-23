const express = require('express');
const { authenticateJWT } = require('../../../middleware/authenticate');
const vacationsLogic = require('../Logic/vacations-logic');

const router = express.Router();

//Add vacation
router.post('/',authenticateJWT, async (req, res, next) => {
  console.log(req.user.sub.role);
  
  
  try {
    // valdiation if admin
    if (req.user.sub.role !== 'admin') {
      res.status(403)
      res.json("Only Admin can upload vacations")
    }
    const vacationAddDetails = req.body;
    const vacationId = await vacationsLogic.addVacation(vacationAddDetails);

    res.json(vacationId);
  } catch (error) {
    return next(error);
  }
});


//Get all vacations
router.get('/',authenticateJWT,async (req, res, next) => {
  try {
    const vacations = await vacationsLogic.getAllVacations();

    res.json(vacations);
  } catch (error) {
    return next(error);
  }
});

//Get one vacation
router.get('/:id',authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const vacation = await vacationsLogic.getFollowedVacation(id);

    res.json(vacation);
  } catch (error) {
    return next(error);
  }
});

//Update vacation
router.put('/:id',authenticateJWT, async (req, res, next) => {
  try {
    const vacationUpdateDetails = req.body;
    const id = req.params.id;
    const updatedId = await vacationsLogic.updateVacation(
      vacationUpdateDetails,
      id
    );

    res.json(updatedId);
  } catch (error) {
    return next(error);
  }
});

//Delete
router.delete('/:id',authenticateJWT, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedId = await vacationsLogic.deleteVacation(id);

    res.json(deletedId);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
