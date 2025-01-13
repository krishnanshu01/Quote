import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer, ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./Schema/schema.js";
import mongoose from "mongoose";
import "./models/User.js";
import "./models/Quotes.js";
import resolvers from "./Resolver/resolver.js";
import { authorization } from "./middleware/authorization.js";
import dotenv from "dotenv";
import express from 'express';
import http from 'http';
import path from 'path';

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = http.createServer(app);
if(process.env.NODE_ENV !== "production"){
  dotenv.config();
}

const  port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => console.log("database is connected"))
  .catch((err) => console.log(`throwing ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authorization,
  plugins: [
    ApolloServerPluginLandingPageGraphQLPlayground(),
    ApolloServerPluginDrainHttpServer({httpServer})],
});
// if(process.env.NODE_ENV == "production"){
app.get("*", (req, res) => {
  app.use(express.static('client/build'));
  res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})
// }
await server.start();
server.applyMiddleware({
  app, 
  path: '/graphql'
});

httpServer.listen(port, () => {
  console.log(`server is ready port${server.graphqlPath}`);
});
