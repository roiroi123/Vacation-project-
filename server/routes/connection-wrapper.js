const mysql = require("mysql2");

// Connection = קו תקשורת למסד הנתונים
const connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "1234", 
    database: "vacations" 
});

connection.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('my sql connected');
  });

  // One function for executing select / insert / update / delete: 
function execute(sql) {
  return new Promise((resolve, reject) => {
      connection.query(sql, (err, result) => {
          if (err) {
              // console.log("Error " + err);
              reject(err);
              return;
          }
          resolve(result);
      });
  });
}

function executeWithParameters(sql, parameters) {
  return new Promise((resolve, reject) => {
      connection.query(sql, parameters, (err, result) => {
          if (err) {
              //console.log("Error " + err);
              console.log("Failed interacting with DB, calling reject");
              reject(err);
              return;
          }
          resolve(result);
      });
  });
}

module.exports = {
  execute,
  executeWithParameters
};