import jwt, { Secret } from "jsonwebtoken";



const createToken = async (payload: any,secret:Secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });

  return token;
};

export const JwtHelpers = {
  createToken,
};
