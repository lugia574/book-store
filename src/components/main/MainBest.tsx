import { Book } from "../../models/book.model";
import styled from "styled-components";
import BookBestItem from "../books/BookBestItem";
interface Props {
  books: Book[];
}

const MainBest = ({ books }: Props) => {
  return (
    <MainBestStyle>
      {books.map((book, idx) => (
        <BookBestItem key={idx} book={book} itemIndex={idx} />
      ))}
    </MainBestStyle>
  );
};

const MainBestStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export default MainBest;
