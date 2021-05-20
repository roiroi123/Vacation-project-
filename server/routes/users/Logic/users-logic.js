const usersDao = require("../Dao/users-dao");
const cacheModule = require("../../cache-module");

let ServerError = require("../../../middleware/errors/server-error");
let ErrorType = require("../../../middleware/errors/error-type");

const jwt = require("jsonwebtoken");
const config = require("../../../config.json");
const crypto = require("crypto");

const RIGHT_SALT = "adfnsadkubgasdbvasndklgvnearugbasjkad";
const LEFT_SALT = "389462365034758934756238406523";

//Register
const register = async (userRegistrationDetails) => {
  //validations
  if (await usersDao.isUsernameExist(userRegistrationDetails.user_name)) {
    
    throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
  }
  validateUserDetails(userRegistrationDetails);

  //Hashing password for security
  userRegistrationDetails.password = crypto
    .createHash("md5")
    .update(LEFT_SALT + userRegistrationDetails.password + RIGHT_SALT)
    .digest("hex");

  const usersId = await usersDao.register(userRegistrationDetails);
  return usersId;
};

//Login
const login = async (userLoginDetails) => {
  //validation
  validateUserDetails(userLoginDetails);

  //Hashing password of user that trying to login
  userLoginDetails.password = crypto
    .createHash("md5")
    .update(LEFT_SALT + userLoginDetails.password + RIGHT_SALT)
    .digest("hex");

  const userData = await usersDao.login(userLoginDetails);

  //Salting username
  // const saltedUserName = LEFT_SALT + userLoginDetails.user_name + RIGHT_SALT;

  const jwtToken = jwt.sign({ sub: userData }, config.secret);

  //Saving in cache userData with token as key.
  cacheModule.set(jwtToken, userData);

  //returning to controller token as object
  const successfullLoginResponse = { token: jwtToken };
  return successfullLoginResponse;
};

const getOneUser = async (id) => {
  return await usersDao.getOneUser(id);
};

const getAllUsers = async () => {
  return await usersDao.getAllUsers();
};

const update = (userUpdateDetails, id) => {
  //validations
  validateUserDetails(userUpdateDetails);
  return usersDao.update(userUpdateDetails, id);
};

const deleteUser = (id) => {
  return usersDao.deleteUser(id);
};

//Validations


const validateUserDetails = (userDetails) => {
  //Username
  if (userDetails.user_name == null) {
    throw new ServerError(
      ErrorType.FAILED_VALIDATION,
      "Username empty!",
      "Username empty!"
    );
  }

  if (!isEmailFormat(userDetails.user_name)) {
    throw new ServerError(
      ErrorType.FAILED_VALIDATION,
      "Username not email format!",
      "Username not email format!"
    );
  }

  //Password
  if (userDetails.password == null) {
    throw new ServerError(
      ErrorType.FAILED_VALIDATION,
      "Password empty!",
      "Password empty!"
    );
  }

  if (userDetails.password.length < 6) {
    throw (
      (new ServerError(ErrorType.FAILED_VALIDATION, "Password too short"),
      "Password too short")
    );
  }

  if (userDetails.password.length > 12) {
    throw new ServerError(
      ErrorType.FAILED_VALIDATION,
      "Password too long",
      "Password too long"
    );
  }
};
//Helping function to check if username in email format
const isEmailFormat = (username) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(username).toLowerCase());
};

module.exports = {
  register,
  login,
  getOneUser,
  getAllUsers,
  deleteUser,
  update,
};
