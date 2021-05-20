const connection = require('../../connection-wrapper');

const addVacation = async (vacationAddDetails) => {
  let sql =
    'INSERT INTO vacations (description, destination,img_url,start_date,end_date,price) VALUES (?,?,?,?,?,?);';

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

const getOneVacation = async (id) => {
  let sql = 'SELECT * FROM vacations WHERE vacations.id=?;';

  try {
    const vacationDetails = await connection.executeWithParameters(sql, id);
    return vacationDetails;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const getAllVacations = async () => {
  let sql = 'SELECT * FROM vacations;';

  try {
    const vacationsDetails = await connection.executeWithParameters(sql);
    return vacationsDetails;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const updateVacation = async (vacationUpdateDetails, id) => {
  let sql =
    'UPDATE vacations SET description=?, destination=?, image=?, departure_date=?, arrival_date=?, price=? WHERE vacations.id=?;';

  let parameters = [
    vacationUpdateDetails.description,
    vacationUpdateDetails.destination,
    vacationUpdateDetails.image,
    vacationUpdateDetails.departureDate,
    vacationUpdateDetails.arrivalDate,
    vacationUpdateDetails.price,
    id,
  ];

  try {
    const updatedId = await connection.executeWithParameters(sql, parameters);
    return updatedId.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const deleteVacation = async (id) => {
  let sql = 'DELETE FROM vacations WHERE vacations.id=?;';

  try {
    const deletedId = await connection.executeWithParameters(sql, id);
    return deletedId.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

module.exports = {
  addVacation,
  getOneVacation,
  getAllVacations,
  deleteVacation,
  updateVacation,
};
