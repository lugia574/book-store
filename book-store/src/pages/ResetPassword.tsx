import { useForm } from "react-hook-form";
import { SignupProps, SignupStyle } from "./Signup";
import { useAuth } from "../hooks/useAuth";
import Title from "../components/commom/Title";
import InputText from "../components/commom/InputText";
import Button from "../components/commom/Button";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const { userResetPassword, userResetRequest, resetRequested } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    resetRequested ? userResetPassword(data) : userResetRequest(data);
  };

  return (
    <>
      <Title size="large">비밀번호 초기화</Title>
      <SignupStyle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              inputType="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText
                placeholder="비밀번호"
                inputType="password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <p className="error-text">비밀번호을 입력해주세요.</p>
              )}
            </fieldset>
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              비밀번호 초기화
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">
              {resetRequested ? "비밀번호 초기화" : "초기화 요청"}
            </Link>
          </div>
        </form>
      </SignupStyle>
    </>
  );
};

export default ResetPassword;
