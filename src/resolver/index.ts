import { Queries } from './Query/query';
import { PrismaClient } from "@prisma/client";

import { Mutations } from './Mutation/mutation';

export const prisma = new PrismaClient();
interface IUser {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  // Query: {
  //   users: async () => {
  //     return await prisma.user.findMany({});
  //   },
  // },


  Query:Queries,
   Mutation:Mutations
};
