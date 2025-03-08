import React, { ForwardedRef } from "react";
import styled from "styled-components";
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: "text" | "email" | "password" | "number";
}

// 포워드 방식의 컴포넌트
const InputText = React.forwardRef(
  (
    { placeholder, inputType, onChange, ...props }: Props,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <InputTextStyle
        placeholder={placeholder}
        type={inputType}
        ref={ref}
        onChange={onChange}
        {...props}
      />
    );
  }
);

const InputTextStyle = styled.input`
  padding: 0.2rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
