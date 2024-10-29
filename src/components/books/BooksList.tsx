import styled from "styled-components";
import BookItem from "./BookItem";
import { Book } from "../../models/book.model";
import { useLocation } from "react-router-dom";
import { MutableRefObject, useEffect, useState } from "react";
import { QUERYSTRING } from "../../constants/querystring";
import { ViewMode } from "./BooksViewSwitcher";

interface Props {
  books: Book[];
  // moreRef: MutableRefObject<IntersectionObserverEntry[]>;
}

const BooksList = ({ books }: Props) => {
  const [view, setView] = useState<ViewMode>("grid");
  const location = useLocation();

  useEffect(() => {
    // console.log("location", location);
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);
  return (
    <BooksListStyle view={view}>
      {books?.map((item, idx) => (
        <>
          <BookItem key={item.id} book={item} view={view} />
        </>
      ))}
    </BooksListStyle>
  );
};

interface BooksListStyleProps {
  view: ViewMode;
}

const BooksListStyle = styled.div<BooksListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)"};
  gap: 24px;
`;

export default BooksList;