const database = require("../../config/mariadb");

class OrderModel {
  static async insertDelivery(delivery) {
    const { address, receiver, contact } = delivery;

    const values = [address, receiver, contact];
    const sql = `INSERT INTO delivery (address, receiver, contact)
            VALUES (?, ?, ?)`;

    try {
      const conn = await database.getDBConnection();
      const [result, fields] = await conn.execute(sql, values);
      return result.insertId;
    } catch (err) {
      throw err;
    }
  }

  static async insertOrders(values) {
    const sql = `INSERT INTO orders
        (book_title, total_quantity, total_price, user_id, delivery_id)
        VALUES(? , ?, ?, ?, ?)`;
    try {
      const conn = await database.getDBConnection();
      const [result, fields] = await conn.execute(sql, values);
      return result.insertId;
    } catch (err) {
      throw err;
    }
  }

  static async getCartItems(items) {
    const sql = `SELECT book_id, quantity FROM cartItems WHERE id IN (?)`;

    try {
      const conn = await database.getDBConnection();
      const [orderItems, fields] = await conn.query(sql, [items]);
      return orderItems;
    } catch (err) {
      throw err;
    }
  }

  static async insertOrderedBook(orderItems, orderId) {
    const sql = `INSERT INTO orderedBook (order_id, book_id, quantity) VALUES ?`;
    const values = [];
    orderItems.forEach((item) => {
      values.push([orderId, item.book_id, item.quantity]);
    });

    try {
      const conn = await database.getDBConnection();
      const results = await conn.query(sql, [values]);
      console.log(results);
      return results;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async deleteCartItems(items) {
    const sql = `DELETE FROM cartItems WHERE id IN (?)`;

    try {
      const conn = await database.getDBConnection();
      const results = await conn.query(sql, [items]);
      return results[0];
    } catch (err) {
      throw err;
    }
  }

  static async get(userId) {
    const sql = `SELECT orders.id, created_at, delivery.address, delivery.receiver, delivery.contact,
                    book_title, total_quantity, total_price
                    FROM orders LEFT JOIN delivery
                    ON orders.delivery_id = delivery.id
                    WHERE user_id = ?`;

    try {
      const conn = await database.getDBConnection();
      const [rows, fields] = await conn.query(sql, userId);
      return rows;
    } catch (err) {
      throw err;
    }
  }

  static async detail(orderId) {
    const sql = `SELECT book_id, title, author, price, quantity
                    FROM orderedBook LEFT JOIN books
                    ON orderedBook.book_id = books.id
                    WHERE order_id = ?`;

    try {
      const conn = await database.getDBConnection();
      const [rows, fields] = await conn.query(sql, orderId);
      return rows[0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = OrderModel;
