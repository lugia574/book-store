const Database = require("../../config/mariadb");

class CartsModel {
  static async add(bookId, quantity, token) {
    // console.log(bookId, quantity, token);
    const sql = `INSERT INTO cartItems (book_id, quantity, user_id) VALUES(?, ?, ?)`;
    try {
      const values = [bookId, quantity, token.id];
      const conn = await Database.getDBConnection();
      const [result, fields] = await conn.query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async get(selected, token) {
    try {
      const values = [token.id];
      let sql = `SELECT cartItems.id, cartItems.book_id, title, summary, cartItems.quantity, price  
    FROM cartItems LEFT JOIN books ON books.id = cartItems.book_id WHERE user_id = ?`;
      if (selected) {
        // 주문서 작성시 "선택한 장바구니 목록 조회"
        sql += ` AND cartItems.id IN (?)`;
        values.push(selected);
      }

      const conn = await Database.getDBConnection();
      const [result, fields] = await conn.query(sql, values);
      return result;
    } catch (err) {
      throw err;
    }
  }

  static async remove(cartItemId) {
    const sql = `DELETE FROM cartItems WHERE id = ?`;

    try {
      const conn = await Database.getDBConnection();
      const [result, fields] = await conn.query(sql, cartItemId);
      return result;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = CartsModel;
