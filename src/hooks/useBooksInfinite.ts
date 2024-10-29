import { useLocation } from "react-router-dom";
// import { Book } from "../models/book.model";
// import { useEffect, useState } from "react";
// import { Pagination } from "../models/paginations.model";
import { fetchBooks } from "../api/book.api";
import { QUERYSTRING } from "../constants/querystring";
import { LIMIT } from "../constants/pagination";
import { useInfiniteQuery, useQuery } from "react-query";

interface getBooksProps {
  pageParam: number;
}

// 쿼리스트링 변경 감지해서 books 갱신
export const useBooksInfinite = () => {
  const location = useLocation();

  const getBooks = ({ pageParam }: getBooksProps) => {
    const params = new URLSearchParams(location.search);
    const category_id = params.get(QUERYSTRING.CATEGORY_ID)
      ? Number(params.get(QUERYSTRING.CATEGORY_ID))
      : undefined;

    const news = params.get(QUERYSTRING.NEWS) ? true : undefined;
    const limit = LIMIT;
    const currentPage = pageParam;

    return fetchBooks({
      category_id,
      news,
      limit,
      currentPage,
    });
  };

  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(
    ["books", location.search],
    ({ pageParam = 1 }) => getBooks({ pageParam }),
    {
      getNextPageParam: (lastPage) => {
        const isLastPage =
          Math.ceil(lastPage.pagination.totalCount / LIMIT) ===
          lastPage.pagination.currentPage;

        return isLastPage ? null : lastPage.pagination.currentPage + 1;
      },
    }
  );

  const books = data ? data.pages.flatMap((page) => page.books) : [];
  const pagination = data ? data.pages[data.pages.length - 1].pagination : {};
  const isEmpty = books.length === 0;

  return {
    books,
    pagination,
    isEmpty,
    isBooksLoading: isFetching,
    fetchNextPage,
    hasNextPage,
  };
};
