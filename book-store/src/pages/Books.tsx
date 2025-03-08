import styled from "styled-components";
import Title from "../components/commom/Title";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import Loading from "../components/commom/Loading";
import { useBooksInfinite } from "../hooks/useBooksInfinite";
import Button from "../components/commom/Button";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
// import Pagenation from "../components/books/Pagenation";
// import { useBooks } from "../hooks/useBooks";

const Books = () => {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  const [scrollPosition, setScrollPosition] = useState<number>(0);
  // const { books, pagination, isEmpty, isBooksLoading } = useBooks();

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = () => {
    if (!hasNextPage) return;

    fetchNextPage();
  };

  useEffect(() => {
    const onScroll = () => {
      setScrollPosition(window.scrollY);
      // console.log("현재 위치", scrollPosition, "찍히는거", window.scrollY);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    // console.log("scrollPosition 값", scrollPosition);
    window.scrollTo(0, scrollPosition);
  }, [isBooksLoading]);

  if (isEmpty) {
    return <BooksEmpty />;
  }

  if (isBooksLoading) {
    return <Loading />;
  }

  if (!books || !pagination) {
    return null;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        {/* <Pagenation pagination={pagination} /> */}

        <div className="more" ref={moreRef}>
          <Button
            size="medium"
            scheme="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? "더보기" : "마지막 페이지"}
          </Button>
        </div>
      </BooksStyle>
    </>
  );
};

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;

// const moreRef = useRef(null);
// useEffect(() => {
//   const observer = new IntersectionObserver((entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) {
//         loadMore();
//         observer.unobserve(entry.target);
//       }
//     });
//   });

//   if (moreRef.current) {
//     observer.observe(moreRef.current);
//   }

//   return () => observer.disconnect();
// }, [books, moreRef]);
