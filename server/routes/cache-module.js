const dataMap = new Map();
const get = (key) => {
  return dataMap.get(key);
};

const set = (key, value) => {
  //key is a token
  //Value is a users object : {"id":8,"username":"misha@misha.misha","password":"12345678","first_name":"misha","last_name":"zino","is_admin":null}
  dataMap.set(key, value);
};

// This function should be in a separate module, because many resources will use it
const extractUserDataFromCache = (request) => {
  let authorizationString = request.headers['authorization'];
  // Removing the bearer prefix, leaving the clean token
  let token = authorizationString.substring('Bearer '.length);
  let userData = usersCache.get(token);
  return userData;
};

module.exports = {
  set,
  get,
  dataMap,
  extractUserDataFromCache,
};
