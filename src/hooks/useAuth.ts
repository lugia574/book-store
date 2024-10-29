import { login, resetPassword, resetRequest, signup } from "../api/auth.api";
import { LoginProps } from "@/pages/Login";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { SignupProps } from "@/pages/Signup";
import { useState } from "react";

export const useAuth = () => {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  // 상태
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
  const [resetRequested, setResetRequested] = useState(false);

  //메소드
  const userLogin = (data: LoginProps) => {
    login(data).then(
      (res: any) => {
        //성공 > 상태변화
        //   console.log(res);
        storeLogin(res.token);
        showAlert("로그인 성공");
        navigate("/");
      },
      (error) => {
        showAlert("로그인 실패했습니다.");
      }
    );
  };

  const userSignup = (data: SignupProps) => {
    signup(data).then((res) => {
      //성공
      showAlert("회원가입 성공");
      navigate("/login");
    });
  };

  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then(() => {
      showAlert("비밀번호가 초기화되었습니다.");
      navigate("/login");
    });
  };

  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then(() => setResetRequested(true));
  };

  // 리턴
  return {
    userLogin,
    userSignup,
    userResetPassword,
    userResetRequest,
    resetRequested,
  };
};
