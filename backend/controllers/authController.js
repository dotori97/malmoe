const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../utils/token");
const userService = require("../services/userService");

// sign up
const register = async (req, res) => {
  
  const { email, name, pw, gen, b_date } = req.body;
  const hashedPassword = await bcrypt.hash(pw, 10);
  try {
    const user = await userService.createUser({
      email: email,
      name: name,
      pw: hashedPassword,
      gen: gen,
      b_date: b_date
    });
    res.status(201).json({ message: "ok", data: user });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const login = async (req, res) => {
  const { email, pw } = req.body;

  try {
    const user = await userService.findUserByEmail2(email);
    if (!user) {
      return res.status(400).json({
        message: `Invalid email and password : ${user} ${email} ${pw}`,
      });
    }
    const isMatch = await bcrypt.compare(pw, user.pw);
    if (!isMatch) {
      return res.status(400).json({
        message: `Invalid email and password : ${user} ${email} ${pw}`,
      });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({
      user,
      accessToken,
      refreshToken,
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const jwt = require("jsonwebtoken");
const refresh = async (req, res) => {
  const { token } = req.body; // refresh token
  if (!token) return res.sendStatus(401);

  jwt.verify(token, "refresh", (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken(user);
    res.status(200).json({
      accessToken,
    });
  });
};

const validate = async (req, res) => {
  const { token } = req.body; // refresh token
  if (!token) return res.sendStatus(401);
  try {
    const user = jwt.verify(token, "access");
    res.json({ valid: true, user });
  } catch (e) {
    res.json({ valid: false });
  }
};

module.exports = {
  register,
  login,
  refresh,
  validate,
};
