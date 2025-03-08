import styled from "styled-components";
import MainReview from "../components/main/MainReview";
import { useMain } from "../hooks/useMain";
import Title from "../components/commom/Title";
import MainNewBooks from "../components/main/MainNewBooks";
import MainBest from "../components/main/MainBest";
import Banner from "../components/commom/banner/Banner";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Home = () => {
  const { reviews, newBooks, bestBooks, banners } = useMain();
  const { isMobile } = useMediaQuery();
  return (
    <HomeStyle>
      {/* 배너 */}
      <Banner banners={banners} />
      {/* 베스트셀러 */}
      <div className="section">
        <Title size="large">베스트셀러</Title>
        <MainBest books={bestBooks} />
      </div>

      {/* 신간 */}
      <div className="section">
        <Title size="large">신간</Title>
        <MainNewBooks books={newBooks} />
      </div>

      {/* 리뷰 */}
      <div className="section">
        <Title size="large">리뷰</Title>
        <MainReview reviews={reviews} />
      </div>
    </HomeStyle>
  );
};

const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
export default Home;
