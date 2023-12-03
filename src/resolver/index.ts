import { PrismaClient } from "@prisma/client";



  export const prisma = new PrismaClient();
  interface IUser {
    name : string,
   email :  string ,
   password :  string
  }

  export const resolvers = {
    Query: {
     
      users:async()=>{
        return await prisma.user.findMany({})
      }

    },
    Mutation:{
      signup:async(parent:any,args:IUser,context:any)=>{
        // console.log(args,"argss data");
        return await prisma.user.create({
          data:args
        })
      }
    }

  };
  