import { PrismaClient } from "@prisma/client";

const books = [
    {
      title: "The Awakening",
      author: "Kate Chopin",
    },
    {
      title: "City of Glass",
      author: "Paul Auster",
    },
  ];

  export const prisma = new PrismaClient();

  export const resolvers = {
    Query: {
      books: () => books,

    },
    Mutation:{
      signup:async(parent:any,args:any,context:any)=>{
        // console.log(args,"argss data");
        return await prisma.user.create({
          data:args
        })
      }
    }

    // Mutation:{
    //   signup: async(_,{name,email,password})=>{
    //     return {
    //       name,
    //       email,
    //       password
    //     }
    //   }
    // }
  };
  