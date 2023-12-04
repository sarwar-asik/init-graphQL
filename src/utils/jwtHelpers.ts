import jwt, { Secret } from "jsonwebtoken";
import config from "../config";



const createToken = async (payload: any,secret:Secret) => {
  const token = jwt.sign(payload, secret, { expiresIn: "1d" });

  return token;
};

const getUserInfo = async(token:string)=>{
  try {
    
    const userData = jwt.verify(token,config.jwt.secret as string)
    // console.log(userData,"jwt token UserData");
    return userData

  } catch (error) {
    return null
    
  }
}

export const JwtHelpers = {
  createToken,
  getUserInfo
};
