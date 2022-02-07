import "dotenv/config"; // mount the .env variables
import http from "http";
import { Application } from "express";
import { DocumentNode } from "graphql";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer as Drain } from "apollo-server-core";
import app from "./src/server";
import typeDefs from "./src/typeDefs/simplyRetsDefs";
import resolvers from "./src/services/resolvers";

const { HOST, PORT } = process.env ?? {};

const attachApolloServer = async (
  serverApp: Application,
  typeDefs: DocumentNode,
  resolvers: any
): Promise<ApolloServer> =>
  new Promise(async (resolve) => {
    // Create the httpServer from the "app" server so we can
    // use with the "ApolloServerPluginDrainHttpServer" plugin
    // when creating the GraphQL server.
    const httpServer = http.createServer(serverApp);
    const graphqlServer = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [Drain({ httpServer })],
    });
    await graphqlServer.start();
    // the GraphQL server will run from the same
    // port as our express application, but it will
    // handle requests made to the "/graphql" endpoint
    graphqlServer.applyMiddleware({
      app: serverApp,
      path: "/graphql",
    });
    resolve(graphqlServer);
  });

attachApolloServer(app, typeDefs, resolvers).then((graphqlServer) => {
  // now that we have a GraphQL middleware set up on route "/graphql",
  // start listening for other requests
  app.listen(PORT, () => {
    // console.logs are only used here at the start of the process
    // but they should not be used for logging in production
    // these should be replaced with a more-robust logger.
    console.log(`Application server listening at  ${HOST}:${PORT}`);
    console.log(
      `GraphQL server listening at   ${HOST}:${PORT}${graphqlServer.graphqlPath}`
    );
  });
});
