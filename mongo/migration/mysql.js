const mysql = require('mysql');

const mysqlConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'Tutti_1404'
});

console.log("Execute Connection Code for MYSQL...");

mysqlConnection.connect();
mysqlConnection.query('SET SESSION group_concat_max_len = 100000000;')
const get = (query) => {
  return new Promise((resolve, reject) => {
    
    mysqlConnection.query(query, function (error, results) {
      if (error) {
        return reject(error)
      }
      results = results.map(v => Object.assign({}, v));
      resolve(results);
    });
  });
};

module.exports = {
  get
}