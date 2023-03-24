require("dotenv").config({ path: __dirname + "/../.env" });
const mysql = require("mysql");
const util = require("util");

// Mysql Conn (ENV has keys)
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});
connection.connect();

// https://stackoverflow.com/questions/44004418/node-js-async-await-using-with-mysql
const query = util.promisify(connection.query).bind(connection);

const respond = async (data, res) => {
  try {
    res.json({
      data: data,
    });
  } catch (e) {
    res.end();
  } finally {
    // connection.end();  // eventually
  }
};

/*****************************************************************
/**********{   QUERY FUNCTIONS: Reusable appwide  }***************
/*****************************************************************
 *
 * Execute a query and RETURN the result.
 *
 * @param sql valid sql
 * @param res express.js response object
 *
 */
const execute = async (sql, res) => {
  try {
    return await query(sql);
  } catch (e) {
    res.end();
  }
};

/************************************************************
 *
 * Execute a PARAMETERIZED query and
 *  RETURN the result.
 *
 * @param sql valid sql
 * @param params value params (pass an array of your vals
 * @param res express.js response object
 *
 */
const executeWithParams = async (sql, params, res) => {
  try {
    return await query(sql, params);
  } catch (e) {
    res.end();
  }
};

/************************************************************
 *
 * Execute a query and RESPOND
 *  TO BROWSER with the raw result.
 *
 * @param sql valid sql
 * @param res express.js response object
 *
 */
const executeAndRespond = async (sql, res) => {
  try {
    const rows = await query(sql);
    res.json({
      data: rows,
    });
  } catch (e) {
    res.end();
  }
};

/************************************************************
 *
 * Execute a PARAMETERIZED query and
 *  RESPOND TO BROWSER with the raw result.
 *
 * @param sql valid sql
 * @param res express.js response object
 *
 */
const executeAndRespondWithParams = async (sql, params, res) => {
  try {
    const rows = await query(sql, params);
    res.json({
      data: rows,
    });
  } catch (e) {
    res.end();
  }
};

module.exports = {
  connection,
  respond,
  execute,
  executeWithParams,
  executeAndRespond,
  executeAndRespondWithParams,
  query,
};
