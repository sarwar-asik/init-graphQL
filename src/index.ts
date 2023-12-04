import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolver";
import { typeDefs } from "./schemas";
import { PrismaClient } from "@prisma/client";
import { JwtHelpers } from "./utils/jwtHelpers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
export const prisma = new PrismaClient();

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
    context:async( {req})=>{   //! Context for globally data
      console.log(req.headers.authorization,"req headers");
      const userInfo = await JwtHelpers.getUserInfo(req.headers.authorization as string);
      console.log("🚀 ~ file: index.ts:20 ~ context:async ~ userInfo:", userInfo)

      return{
        prisma

      }
    }
  });
  console.log(`🚀  Server ready at: ${url}`)

  
};


main();
