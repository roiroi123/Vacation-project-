const followedDao = require('../Dao/followed-dao');

const followVacation = async (vacationFollowedDetails) => {
    const followedVacationId = await followedDao.followVacation(vacationFollowedDetails);
    return followedVacationId;
  };

const unFollowVacation = async (vacationFollowedDetails) => {
    console.log("in");
    const followedVacationId = await followedDao.unFollowVacation(vacationFollowedDetails);
    return followedVacationId;
  };

  module.exports ={
      followVacation,
      unFollowVacation
  }