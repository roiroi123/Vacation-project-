const ServerError = require("../../../middleware/errors/server-error");
const connection = require("../../connection-wrapper");

const addVacation = async (vacationAddDetails) => {
  let sql =
    "INSERT INTO vacations (description, destination,img_url,start_date,end_date,price) VALUES (?,?,?,?,?,?);";

  let parameters = [
    vacationAddDetails.description,
    vacationAddDetails.destination,
    vacationAddDetails.img_url,
    vacationAddDetails.start_date,
    vacationAddDetails.end_date,
    vacationAddDetails.price,
  ];

  try {
    const vacationDetails = await connection.executeWithParameters(
      sql,
      parameters
    );
    return vacationDetails.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const getFollowedVacation = async (id) => {
  let sql =
    "select vacations.* , (case when followed_vacations.vacation_id then 1 else 0 end) as is_followed From vacations Left join followed_vacations on vacations.id = followed_vacations.vacation_id where user_id = ?";

  try {
    const vacationDetails = await connection.executeWithParameters(sql, id);
    return vacationDetails;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const getAllVacations = async () => {
  let sql = "SELECT * FROM vacations;";

  try {
    const vacationsDetails = await connection.executeWithParameters(sql);
    return vacationsDetails;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const updateVacation = async (vacationUpdateDetails, id) => {
  let sql = `UPDATE vacations SET description= ?, destination= ?, img_url= ?,  start_date= ?, end_date= ?,price= ? WHERE vacations.id=?;`;
  console.log(vacationUpdateDetails);
  let parameters = [
    vacationUpdateDetails.description,
    vacationUpdateDetails.destination,
    vacationUpdateDetails.img_url,
    vacationUpdateDetails.start_date,
    vacationUpdateDetails.end_date,
    vacationUpdateDetails.price,
    id
  ];

  try {
    const updatedId = await connection.executeWithParameters(sql, parameters);
    return updatedId.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const deleteVacation = async (id) => {
  let sql = "DELETE FROM vacations WHERE vacations.id=?;";

  try {
    const deletedId = await connection.executeWithParameters(sql, id);
    return deletedId.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

module.exports = {
  addVacation,
  getFollowedVacation,
  getAllVacations,
  deleteVacation,
  updateVacation,
};
