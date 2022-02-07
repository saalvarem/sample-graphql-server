import { Router } from "express";
import { getAuthorizedUsers } from "../services/auth";
import basicAuth from "express-basic-auth";

const graphqlRouter = Router();

graphqlRouter.use("/", basicAuth(getAuthorizedUsers()));

export default graphqlRouter;
