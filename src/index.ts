import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolver";
import { typeDefs } from "./schemas";
import { PrismaClient } from "@prisma/client";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
export const prisma = new PrismaClient();

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
    context:async()=>{   //! Context for globally data
      return{
        prisma
      }
    }
  });
  console.log(`🚀  Server ready at: ${url}`)
  
};


main();
