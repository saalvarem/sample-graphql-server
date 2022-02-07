import { Listing } from "../utils.ts/types";
import resolvers from "./resolvers";
import axios from "axios";
jest.mock("axios");

test("We have expected resolvers", () => {
  expect(resolvers).toHaveProperty("Query.getListings");
});

test("resolver getListings - should fetch listings", async () => {
  const mockListings = [{ address: "1 Daily Planet Plaza" }] as Listing[];
  (axios as any).get.mockResolvedValue({
    data: mockListings,
  });
  const listings = await resolvers.Query.getListings(undefined, {
    city: "metropolis",
  });
  expect(listings).toEqual(mockListings);
});

test("resolver getListings - expects city param to be a string", async () => {
  (axios as any).get.mockResolvedValue({ data: [] });
  const listings = await resolvers.Query.getListings(undefined, {
    city: null as any, // this will be resolved as "400 Bad Request" by the graphql server
  });
  // but our application server won't crash, it will simply not return any results
  expect(listings).toEqual([]);
});
