const connection = require("../../connection-wrapper");
let ServerError = require("../../../middleware/errors/server-error");
let ErrorType = require("../../../middleware/errors/error-type");

//Login
const login = async (userLoginDetails) => {
  let sql = "SELECT * FROM users WHERE user_name=? AND password=?;";

  let parameters = [userLoginDetails.user_name, userLoginDetails.password];

  try {
    const userLoginResult = await connection.executeWithParameters(
      sql,
      parameters
    );
    //Check if username and password match ones in DB
    if (userLoginResult == null || userLoginResult.length == 0) {
      throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    return userLoginResult[0];
  } catch (error) {
    throw new ServerError(
      ErrorType.GENERAL_ERROR,
      JSON.stringify(userLoginDetails),
      error
    );
  }
};

//Register
const register = async (userRegistrationDetails) => {
  let sql = "INSERT INTO users (user_name, password) VALUES (?,?);";

  let parameters = [
    userRegistrationDetails.user_name,
    userRegistrationDetails.password,
  ];

  try {
    const userRegistrationResult = await connection.executeWithParameters(
      sql,
      parameters
    );
    return userRegistrationResult.insertId;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

//Helping function
const isUsernameExist = async (username) => {
  let sql = "SELECT user_name FROM users WHERE user_name = ?;";
  let parameters = [username];

  try {
    const userExistResult = await connection.executeWithParameters(
      sql,
      parameters
    );

    if (userExistResult == null || userExistResult.length === 0) {
      return false;
    }
    return true;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const getOneUser = async (id) => {
  let sql = "SELECT * FROM users WHERE users.id=?;";

  try {
    const userDetails = await connection.executeWithParameters(sql, id);
    return userDetails;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const getAllUsers = async () => {
  let sql = "SELECT * FROM users;";

  try {
    const usersDetails = await connection.executeWithParameters(sql);
    return usersDetails;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const update = async (userUpdateDetails, id) => {
  let sql = "UPDATE users SET user_name=?, password=? WHERE users.id=?;";

  let parameters = [
    userUpdateDetails.user_name,
    userUpdateDetails.password,
    id,
  ];

  try {
    const result = await connection.executeWithParameters(sql, parameters);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

const deleteUser = async (id) => {
  let sql = "DELETE FROM users WHERE users.id=?;";

  try {
    const result = await connection.executeWithParameters(sql, id);
    return result;
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, error);
  }
};

module.exports = {
  register,
  login,
  getOneUser,
  getAllUsers,
  deleteUser,
  update,
  isUsernameExist,
};
