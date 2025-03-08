const userModel = require("../models/userModel");
const { signAccessToken, signRefreshToken } = require("../utils/auth");
const {
  successResponse,
  unauthorizedResponse,
  badRequestResponse,
  notFoundResponse,
  createdResponse,
} = require("../utils/response");

class UserController {
  async join(req, res) {
    const { email, password } = req.body;
    // console.log("가긴 가냐?");
    try {
      const result = await userModel.create(email, password);
      if (result.affectedRows > 0) createdResponse(res, result);
      else return notFoundResponse(res, "계정 생성 실패");
    } catch (err) {
      return badRequestResponse(res, err);
    }
  }

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const loginUser = await userModel.login(email, password);
      if (loginUser) {
        const token = signAccessToken(loginUser.id, loginUser.email);
        const refreshAffectedRows = await signRefreshToken(loginUser.id);
        if (!refreshAffectedRows) return badRequestResponse(res, "변경 실패");

        // 쿠키에 담기
        res.cookie("token", token, {
          httpOnly: true,
        });
        return successResponse(res, { ...loginUser, token: token });
      } else return unauthorizedResponse(res, "입력 정보가 맞지 않습니다.");
    } catch (err) {
      console.log(err);
      return badRequestResponse(res, err);
    }
  }

  async passwordResetRequest(req, res) {
    const { email } = req.body;

    try {
      const user = await userModel.passwordResetRequest(email);
      console.log(user);
      if (user) {
        return successResponse(res, user);
      } else return unauthorizedResponse(res, "입력 정보가 맞지 않습니다.");
    } catch (err) {
      return badRequestResponse(res, err);
    }
  }

  async passwordReset(req, res) {
    const { email, password } = req.body;

    try {
      const affectedRows = await userModel.passwordReset(email, password);

      if (affectedRows) return successResponse(res, "변경완료");
      else return badRequestResponse(res, "변경 실패");
    } catch (err) {
      return badRequestResponse(res, err);
    }
  }
}

module.exports = new UserController();
