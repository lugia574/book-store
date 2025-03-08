const mariadb = require("mysql2");

const dbConf = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "Bookshop",
  dateStrings: true,
};

class Database {
  static async getDBConnection() {
    try {
      if (!this.db) {
        mariadb.createConnection(dbConf);
        const pool = mariadb.createPool(dbConf);
        const promisePool = pool.promise();
        this.db = promisePool;
      }
      return this.db;
    } catch (err) {
      console.log("Error in database connection");
      console.log(err.errro || err);
    }
  }
}

module.exports = Database;
