import styled from "styled-components";
import Button from "../commom/Button";
import { useEffect } from "react";
interface Props {}

interface Props {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";

const FindeAddressButton = ({ onCompleted }: Props) => {
  // 스크립트 로드

  // 핸들러

  // 입력
  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };
  useEffect(() => {
    //스크립트태그 생성
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    // html 문서 안에 해당 스크립트태그 들어감
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
      주소찾기
    </Button>
  );
};

const FindeAddressButtonStyle = styled.div``;

export default FindeAddressButton;
