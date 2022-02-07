import express from "express";
import graphqlRouter from "./routes/graphql";
import applicationRouter from "./routes/application";

const app = express();

// "/graphql" request should be handled by the apollo server first
app.use("/graphql", graphqlRouter);

// any other requests will be handled by our express server
app.use("/", applicationRouter);

export default app;
