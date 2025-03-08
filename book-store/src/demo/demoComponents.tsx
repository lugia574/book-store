import styled from "styled-components";
interface Props {}

const Demo = () => {
  return <DemoStyle></DemoStyle>;
};

const DemoStyle = styled.div``;

export default Demo;

// ${(props)=> props.theme.color.primary};

// const MainImgeStyle = styled.div`
//   width: 9.5rem;
//   height: 5rem;
//   background-size: 100% 100%;
//   background-position: center;
//   background-image: url(${DEFAULT_IMAGE});
//   margin: 1rem 0;
// `;
