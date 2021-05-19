const jwt = require("jsonwebtoken");

const auth = async (token) => {
    const result = await jwt.verify(token,process.env.secretkey);
    return result;
}

module.exports = auth;
