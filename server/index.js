import * as dotenv from "dotenv";
dotenv.config();
import resolvers from "./resolvers/resolver.js";
import typeDefs from "./schemas/schema.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";
import { ApolloServer } from "@apollo/server";

mongoose.connect(process.env.MONGO_URI);

const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server);
console.log(`🚀 Server ready at ${url}`);
