const database = require("../../config/mariadb");
class LikeModel {
  static async add(bookId, token) {
    const sql = "INSERT INTO likes (user_id, book_id) VALUES (?, ?)";
    const values = [token.id, bookId];
    try {
      console.log(sql, values);
      const conn = await database.getDBConnection();
      const [result, fields] = await conn.query(sql, values);
      console.log("result", result);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async remove(bookId, token) {
    const sql = "DELETE FROM likes WHERE user_id = ? AND book_id = ?";
    const values = [token.id, bookId];

    try {
      const conn = await database.getDBConnection();
      const [result, fields] = await conn.query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = LikeModel;
