const dataMap = new Map();
const get = (key) => {
  return dataMap.get(key);
};

const set = (key, value) => {
  //key is a token
  dataMap.set(key, value);
};

// This function should be in a separate module, because many resources will use it
const extractUserDataFromCache = (request) => {
  let authorizationString = request.headers['authorization'];
  // Removing the bearer prefix, leaving the clean token
  let token = authorizationString.substring('Bearer '.length);
  let userData = dataMap.get(token);
  return userData;
};

module.exports = {
  set,
  get,
  dataMap,
  extractUserDataFromCache,
};
