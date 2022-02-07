import express from "express";
import graphqlRouter from "./graphql";
import request from "supertest";

const testApp = express();
testApp.use("/", graphqlRouter);

test("graphqlRouter - no authorization returns a 401", async () => {
  const res = await request(testApp).get("/").expect(401);
});

// missing here, we could also "mock" the authorizedUsers function
// and then test that a properly-authorized request returns a 200 OK
// but the authorization method used here is just for illustration purposes
// so I won't spend too much time testing that
