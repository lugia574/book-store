const express = require("express");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");

// dotenv 모듈
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const userRouter = require("./routes/users.js");
const cartsRouter = require("./routes/carts.js");
const likesRouter = require("./routes/likes.js");
const ordersRouter = require("./routes/orders.js");
const booksRouter = require("./routes/books.js");
const categoryRouter = require("./routes/category.js");

app.use(cookieParser());
// 모든 요청에 대해 CORS 허용
app.use(
  cors({
    origin: "http://localhost:3000", // 클라이언트의 출처
    credentials: true, // withCredentials 사용할 때 필요
  })
);

app.use("/users", userRouter);
app.use("/carts", cartsRouter);
app.use("/likes", likesRouter);
app.use("/orders", ordersRouter);
app.use("/books", booksRouter);
app.use("/category", categoryRouter);

app.get("/", (req, res) => {
  res.status(200).render("index");
});

app.listen(port, () => {
  console.log(`실행됨 포트번호 : ${port}`);
});
