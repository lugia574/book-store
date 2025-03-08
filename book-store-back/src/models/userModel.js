const database = require("../../config/mariadb");
const Encryption = require("../utils/encryption");

class UserModel {
  static async create(email, password) {
    // 비밀번호 암호화
    const salt = Encryption.generateSalt();
    const hashPassword = Encryption.hashPassword(password, salt);

    const sql = "INSERT INTO users (email, password, salt) VALUES (?, ?, ?)";
    const values = [email, hashPassword, salt];

    try {
      const conn = await database.getDBConnection();
      const [result, fields] = await conn.query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async login(email, password) {
    const sql = "SELECT * FROM users WHERE email = ?";

    try {
      const conn = await database.getDBConnection();
      const [result, fields] = await conn.query(sql, email);
      const hashPassword = Encryption.hashPassword(password, result[0].salt);
      if (result[0] && result[0].password == hashPassword) {
        return result[0];
      } else return false;
    } catch (err) {
      throw err;
    }
  }

  static async passwordResetRequest(email) {
    const sql = "SELECT * FROM users WHERE email = ?";

    try {
      const conn = await database.getDBConnection();
      const [result, fields] = await conn.query(sql, email);

      const user = result[0];
      if (user) {
        return user;
      } else return false;
    } catch (err) {
      throw err;
    }
  }

  static async passwordReset(email, password) {
    const salt = Encryption.generateSalt();
    const hashPassword = Encryption.hashPassword(password, salt);

    const sql = "UPDATE users SET password = ?, salt = ? WHERE email = ?";
    const values = [hashPassword, salt, email];

    try {
      const conn = await database.getDBConnection();
      const [result, fields] = await conn.query(sql, values);
      return result.affectedRows;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = UserModel;
