import { Router } from "express";

const applicationRouter = Router();

// this is just a sample of another end point that could
// be handle by our server application, in this case
// it is not protected with any kind of authorization
// and could be used for profiling-purposes
applicationRouter.use("/test", (req, res) =>
  res.status(200).json({ test: true })
);
applicationRouter.get("/", (req, res) =>
  res
    .status(200)
    .send(
      'Welcome. This is the application server, for the GraphQL server, please direct your requests to "/graphql"'
    )
);

// other improvements that could be done here
// is to handle the HTTP errors in a more-graceful
// way, but that is omitted for brevity

export default applicationRouter;
