// 암호화 모듈
const crypto = require("crypto");

class Encryption {
  static generateSalt() {
    return crypto.randomBytes(10).toString("base64");
  }

  static hashPassword(password, salt) {
    return crypto
      .pbkdf2Sync(password, salt, 10000, 10, "sha512")
      .toString("base64");
  }
}

module.exports = Encryption;
