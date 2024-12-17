import jwt from "jsonwebtoken";
const generateTokenAndSetCookie = async (id, role, res) => {
  const token = await jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "development" ? false : true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
};

export default generateTokenAndSetCookie;