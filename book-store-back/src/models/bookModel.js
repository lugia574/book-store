const Database = require("../../config/mariadb");
const ensureAuthorization = require("../utils/auth");

class BookModel {
  static async getBooks(categoryId, news, limit, currentPage) {
    const offset = limit * (currentPage - 1);
    let sql = `SELECT *, (SELECT count(*) FROM likes WHERE book_id = books.id) 
            AS likes FROM books`;

    let values = [];

    if (categoryId && news) {
      sql += ` WHERE category_id = ? AND pub_date 
      BETWEEN DATE_SUB(NOW(), INTERVAL 6 MONTH) AND NOW()`;
      values.push(categoryId);
    } else if (categoryId) {
      sql += " WHERE category_id = ?";
      values.push(categoryId);
    } else if (news)
      sql +=
        " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";

    sql += " LIMIT ? OFFSET ?";
    values.push(parseInt(limit), offset);

    try {
      const conn = await Database.getDBConnection();
      let [result, fields] = await conn.query(sql, values);
      return result.map((e) => {
        e.pubDate = e.pub_date;
        delete e.pub_date;
        delete e.category_id;
        return e;
      });
    } catch (err) {
      throw err;
    }
  }

  static async getTotalCount() {
    const sql = "SELECT count(*) AS totalCount FROM Bookshop.books";
    const conn = await Database.getDBConnection();
    const [result, fields] = await conn.execute(sql);
    const [{ totalCount }] = result;
    return totalCount;
  }

  static async getBookDetail(req, res, bookId) {
    // 로그인 상태가 아니면 liked 빼고 보내주고
    const user = await ensureAuthorization.isTokens(req);
    // const authorization = undefined;

    const SELECTCOL = `books.id, books.title, books.img, books.category_id, books.form, books.isbn, books.summary, books.detail, books.author, 
    books.pages, books.price, books.pub_date, category_name`;

    let sql = "";
    const values = [];
    if (user) {
      sql = `SELECT ${SELECTCOL}, (SELECT count(*) FROM likes WHERE book_id = books.id) AS likes, 
      (SELECT EXISTS(SELECT * FROM likes WHERE user_id = ? AND book_id = ?)) AS liked
    FROM books
    JOIN category ON books.category_id = category.id
    WHERE books.id = ?`;
      values.push(user.id, bookId);
    } else {
      sql = `SELECT ${SELECTCOL}, (SELECT count(*) FROM likes WHERE book_id = books.id) AS likes 
      FROM books JOIN category ON books.category_id = category.id WHERE books.id = ?`;
    }
    values.push(bookId);

    try {
      const conn = await Database.getDBConnection();
      const [result, fields] = await conn.query(sql, values);

      if (result[0]) {
        const bookData = result.map((e) => {
          e.categoryName = e.category_name;
          delete e.category_name;
          delete e.category_id;
          return e;
        });
        return bookData[0];
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BookModel;
