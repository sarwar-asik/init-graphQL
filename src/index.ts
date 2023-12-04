import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolver";
import { typeDefs } from "./schemas";
import { Prisma, PrismaClient } from "@prisma/client";
import { JwtHelpers } from "./utils/jwtHelpers";
import { DefaultArgs } from "@prisma/client/runtime/library";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
export const prisma = new PrismaClient();


interface Context {
  prisma:PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
 userInfo:{
  userId:number | null
 } | null
}

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
    context:async( {req}):Promise<Context>=>{   //! Context for globally data
      // console.log(req.headers.authorization,"req headers");
      const userInfo = await JwtHelpers.getUserInfo(req.headers.authorization as string) as any
      console.log("🚀 ~ file: index.ts:20 ~ context:async ~ userInfo:", userInfo)

      return{
        prisma,
       userInfo

      }
    }
  });
  console.log(`🚀  Server ready at: ${url}`)

  
};


main();
