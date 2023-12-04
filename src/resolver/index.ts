import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

export const prisma = new PrismaClient();
interface IUser {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
    users: async () => {
      return await prisma.user.findMany({});
    },
  },
  Mutation: {
    signup: async (parent: any, args: IUser, context: any) => {
      const hashedPass = await bcrypt.hash(args.password, 12);
      // console.log(hashedPass,"hashed passs");
      const createUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPass,
        },
      });

      const token = jwt.sign(
        { userId: createUser.id, email: createUser.email },
        "mySignature",
        {
          expiresIn: "1d",
        }
      );
      console.log(token, "my jwt token");
      return {
        token,
        user: createUser,
      };
    },

  login:async(parent:any,args:any,context:any)=>{
    const user =await prisma.user.findFirst({
      where:{
        email:args.email
      }
    })
    console.log(user,"user login");

    if(!user){
      throw new Error("User not found")
    }
    const isMatch = bcrypt.compareSync(args.password,user.password)
    if(!isMatch){
      throw new Error("Invalid password")
    }
    const token = jwt.sign(
      {userId:user.id,email:user.email},
      "mySignature",
      {expiresIn:"1d"}
    )
    return {token,user}
  }
  },
};


