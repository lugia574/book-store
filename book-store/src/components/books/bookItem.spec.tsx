import React from "react";
import { render, screen } from "@testing-library/react";
import BookItem from "./BookItem";
import { BookStoreThemeProvider } from "../../context/ThemContext";

const dummyData = {
  id: 1,
  title: "dummy",
  img: 5,
  categoryId: 1,
  summary: "dummy",
  author: "dummy author",
  price: 100,
  likes: 1,
  form: "paperback",
  isbn: "dummy ISBN",
  detail: "dummy detail",
  pages: 100,
  contents: "dummy contents",
  pubDate: "2021-01-01",
};

// describe("BookItem", () => {
//   it("렌더 여부", () => {
//     const { getByText } = render(
//       <BookStoreThemeProvider>
//         <BookItem book={dummyData} />
//       </BookStoreThemeProvider>
//     );
//     // eslint-disable-next-line testing-library/prefer-screen-queries
//     expect(getByText(dummyData.title)).toBeInTheDocument();
//   });
// });
