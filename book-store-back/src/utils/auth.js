const {
  unauthorizedResponse,
  badRequestResponse,
  serverErrorResponse,
} = require("./response");

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Database = require("../../config/mariadb");
dotenv.config();

const isTokens = async (req) => {
  const { token } = req.cookies;
  // 아예 로그인 안한경우
  if (token === undefined) return undefined;

  try {
    const isAccessToken = verifyToken(token);
    return isAccessToken;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      const decodedToken = jwt.decode(token);
      // DB 들어가서 찾기
      const result = await verifyRefreshToken(decodedToken.id);
      const refreshToken = result.refresh_token;
      const isRefresh = verifyToken(refreshToken);
      if (isRefresh === undefined) {
        return false;
      } else {
        const newAccessToken = signAccessToken(
          decodedToken.id,
          decodedToken.email
        );
        return newAccessToken;
      }
    } else throw err;
  }
};

const signAccessToken = (id, email) => {
  return jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.PRIVATE_KEY,
    { expiresIn: "1h", issuer: "lcw" }
  );
};

const signRefreshToken = async (id) => {
  const refreshToken = jwt.sign({}, process.env.PRIVATE_KEY, {
    expiresIn: "14d",
    issuer: "lcw",
  });

  const sql = "UPDATE users SET refresh_token = ? WHERE id = ?";
  const values = [refreshToken, id];

  try {
    const conn = await Database.getDBConnection();
    const [result, fields] = await conn.query(sql, values);
    return result.affectedRows;
  } catch (err) {
    throw err;
  }
};

const verifyRefreshToken = async (userId) => {
  const sql = "SELECT refresh_token FROM users WHERE id = ?";
  try {
    const conn = await Database.getDBConnection();
    const [results, fields] = await conn.query(sql, userId);
    return results[0];
  } catch (err) {
    throw err;
  }
};

const verifyToken = (token) => {
  return jwt.verify(token, process.env.PRIVATE_KEY);
};

const tokenErrorHandler = (res, err) => {
  if (err instanceof jwt.TokenExpiredError)
    return unauthorizedResponse(
      res,
      "로그인이 만료되었습니다. 다시 로그인하세요"
    );
  else if (err instanceof jwt.JsonWebTokenError)
    return badRequestResponse(res, "잘못된 토큰입니다.");
  else if (err instanceof ReferenceError) return badRequestResponse(res, err);
  else return serverErrorResponse(res, "서버오류");
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyToken,
  tokenErrorHandler,
  isTokens,
};
