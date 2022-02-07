import express from "express";
import applicationRouter from "./application";
import request from "supertest";

const testApp = express();
testApp.use("/", applicationRouter);

test("applicationRouter - no authorization needed", async () => {
  const res = await request(testApp).get("/test").expect(200);
  expect(res?.text).toBeDefined();
  expect(JSON.parse(res.text)).toEqual({ test: true });
});

test("applicationRouter - root route returns a response", async () => {
  const res = await request(testApp).get("/").expect(200);
  expect(res?.text).toBeDefined();
  expect(typeof res.text).toEqual("string");
});
