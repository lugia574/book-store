import { render, screen } from "@testing-library/react";

import { BookStoreThemeProvider } from "../../context/ThemContext";
import Button from "./Button";

describe("Button 컴포넌트 테스트", () => {
  it("렌더를 확인", () => {
    // 렌더
    render(
      <BookStoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookStoreThemeProvider>
    );

    // 확인
    expect(screen.getByText("버튼")).toBeInTheDocument();
  });

  it("size props 적용", () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size="medium" scheme="primary">
          제목
        </Button>
      </BookStoreThemeProvider>
    );

    expect(screen.getByRole("button")).toHaveStyle({ fontSize: "1rem" });
  });
});
