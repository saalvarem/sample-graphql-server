import { gql } from "apollo-server-express";
import { readFileSync } from "fs";
import { DocumentNode } from "graphql";
import path from "path";

// separate the type definitions for the GraphQL
// schema into separate .gql files.
// this allows us to separate the definitions and
// take advantage of file formatters that handle
// the ".gql" or ".graphql" extensions

// then we import the definitions as strings
const simplyRetsTypes: string = readFileSync(
  path.resolve(__dirname, "./simplyRETS.types.gql"),
  { encoding: "utf-8" }
);

const simplyRetsQueries: string = readFileSync(
  path.resolve(__dirname, "./simplyRETS.queries.gql"),
  { encoding: "utf-8" }
);

// here we compile/reduce the different typeDefs
// for this API into a single template string
// because the "gql" will expect either an array
// of DocumentNodes or a single template string
const simplyRetsTypeDefs: string = `
    ${simplyRetsTypes}
    ${simplyRetsQueries}
`;

const typeDefs: DocumentNode = gql(simplyRetsTypeDefs);

export default typeDefs;
