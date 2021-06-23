const connection = require("../../connection-wrapper");

const followVacation = async (vacationFollowedDetails) => {
    
    let sql =
      "INSERT INTO followed_vacations (user_id,vacation_id ) VALUES (?,?);";
  
    let parameters = [
        vacationFollowedDetails.userId,
        vacationFollowedDetails.vacationId,
    ];
  
    try {
      const followedvacationDetails = await connection.executeWithParameters(
        sql,
        parameters
      );
      return followedvacationDetails.insertId;
    } catch (error) {
      throw new error
    }
  };
const unFollowVacation = async (vacationFollowedDetails) => {
    
    let sql =
      "DELETE FROM followed_vacations WHERE user_id = ? AND vacation_id = ?";
  
    let parameters = [
        vacationFollowedDetails.userId,
        vacationFollowedDetails.vacationId,
    ];
  
    try {
      const followedvacationDetails = await connection.executeWithParameters(
        sql,
        parameters
      );
      return followedvacationDetails.insertId;
    } catch (error) {
      throw new error
    }
  };
  module.exports={
    followVacation,
    unFollowVacation
  }