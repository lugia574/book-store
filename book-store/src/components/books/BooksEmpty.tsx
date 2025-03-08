import styled from "styled-components";
import { FaSmileWink } from "react-icons/fa";
import Title from "../commom/Title";
import { Link } from "react-router-dom";
import Empty from "../commom/Empty";

const BooksEmpty = () => {
  return (
    <Empty
      title="검색결과가 없습니다."
      icon={<FaSmileWink />}
      description={<Link to="books">전체 검색 결과로 이동</Link>}
    />
  );
};

export default BooksEmpty;
