import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolver";
import { typeDefs } from "./schemas";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`🚀  Server ready at: ${url}`)
  
};


main();
