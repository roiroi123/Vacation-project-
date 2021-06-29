const express = require('express');
const { authenticateJWT } = require('../../../middleware/authenticate');
const followedVacationsLogic = require('../Logic/followed-logic');

const router = express.Router();

// Follow vacation
router.post('/',authenticateJWT, async (req, res, next) => {
    
    
    try {
      const vacationFollowedDetails = req.body;
      const vacationId = await followedVacationsLogic.followVacation(vacationFollowedDetails);
      console.log(vacationId);
      res.json(vacationId);
    } catch (error) {
      return next(error);
    }
  });
// UnFollow vacation
router.delete('/:userId/:vacationId',authenticateJWT, async (req, res, next) => {
    
  vacationFollowedDetails = {userId:req.params.userId,vacationId:req.params.vacationId};
    console.log(vacationFollowedDetails);
    try {
      const vacationId = await followedVacationsLogic.unFollowVacation(vacationFollowedDetails);
  
      res.json(vacationId);
    } catch (error) {
      return next(error);
    }
  });

  module.exports = router;
