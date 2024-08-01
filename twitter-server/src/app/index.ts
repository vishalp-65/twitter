import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { User } from "./user";
import { Tweet } from "./tweet";
import { Comment } from "./comment";
import { Like } from "./like";
import { GraphqlContext } from "../intefaces";
import JWTService from "../services/jwt";

export async function initServer() {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());

    app.get("/", (req, res) =>
        res.status(200).json({ message: "Everything is good" })
    );

    const graphqlServer = new ApolloServer<GraphqlContext>({
        typeDefs: `
       ${User.types}
       ${Tweet.types}
       ${Comment.types}
       ${Like.types}

        type Query {
            ${User.queries}
            ${Tweet.queries}
            ${Comment.queries}
            ${Like.queries}
        }

        type Mutation {
          ${Tweet.muatations}
          ${User.mutations}
          ${Comment.mutations}
          ${Like.mutations}
        }
    `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Tweet.resolvers.queries,
                ...Comment.resolvers.queries,
                ...Like.resolvers.queries,
            },
            Mutation: {
                ...Tweet.resolvers.mutations,
                ...User.resolvers.mutations,
                ...Like.resolvers.mutations,
                ...Comment.resolvers.mutations,
            },
            ...Tweet.resolvers.extraResolvers,
            ...User.resolvers.extraResolvers,
            ...Like.resolvers.extraResolvers,
            ...Comment.resolvers.extraResolvers,
        },
    });

    await graphqlServer.start();

    app.use(
        "/graphql",
        expressMiddleware(graphqlServer, {
            context: async ({ req, res }) => {
                const token = req.headers?.authorization?.split("Bearer ")[1];
                return {
                    user: req.headers.authorization
                        ? JWTService.decodeToken(token!)
                        : undefined,
                };
            },
        })
    );

    return app;
}
