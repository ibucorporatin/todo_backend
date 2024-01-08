var jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  try {
    const auth_header = req.headers.authorization;
    if (auth_header) {
      const token = auth_header.split(" ")[1];
      jwt.verify(token, process.env.jwt_secret_key, (err, user) => {
        if (err) {
          res.status(403).json("token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      res.status(401).json("you are not authenticated!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = verify;
