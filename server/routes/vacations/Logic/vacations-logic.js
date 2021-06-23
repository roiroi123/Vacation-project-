const vacationsDao = require('../Dao/vacations-dao');

const addVacation = async (vacationAddDetails) => {
  validateVacationDetails(vacationAddDetails);
  const addedVacationId = await vacationsDao.addVacation(vacationAddDetails);
  return addedVacationId;
};

const getAllVacations = async () => {
  const vacations = await vacationsDao.getAllVacations();
  return vacations;
};

const getFollowedVacation = async (id) => {
  const vacation = await vacationsDao.getFollowedVacation(id);
  return vacation;
};

const updateVacation = async (vacationUpdateDetails, id) => {
  validateVacationDetails(vacationUpdateDetails);
  const updatedVacationId = await vacationsDao.updateVacation(
    vacationUpdateDetails,
    id
  );
  return updatedVacationId;
};

const deleteVacation = async (id) => {
  const deletedId = await vacationsDao.deleteVacation(id);
  return deletedId;
};

//Validation function
const validateVacationDetails = (vacationAddDetails) => {
  if (vacationAddDetails.description == null) {
    throw new ServerError(
      ErrorType.INVALID_VACATION_DETAILS,
      'Description cant be empty',
      'Description cant be empty'
    );
  }

  if (vacationAddDetails.destination == null) {
    throw new ServerError(
      ErrorType.INVALID_VACATION_DETAILS,
      'Destination cant be empty',
      'Destination cant be empty'
    );
  }

  if (!validURL) {
    throw new ServerError(
      ErrorType.INVALID_VACATION_DETAILS,
      'Not valid URL for image!',
      'Not valid URL for image!'
    );
  }

  if (vacationAddDetails.start_date == null) {
    throw new ServerError(
      ErrorType.INVALID_VACATION_DETAILS,
      'start_date date cant be empty',
      'start_date date cant be empty'
    );
  }

  if (vacationAddDetails.end_date == null) {
    throw new ServerError(
      ErrorType.INVALID_VACATION_DETAILS,
      'end_date cant be empty',
      'end_date cant be empty'
    );
  }

  if (vacationAddDetails.price == null) {
    throw new ServerError(
      ErrorType.INVALID_VACATION_DETAILS,
      'Price cant be empty',
      'Price cant be empty'
    );
  }
};

//Check if image is a valid URL
const validURL = (string) => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(string);
};

module.exports = {
  addVacation,
  getFollowedVacation,
  getAllVacations,
  deleteVacation,
  updateVacation,
};
