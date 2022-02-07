import SimplyRETS from "./simplyRets";
import axios from "axios";
import { Listing } from "../utils.ts/types";
jest.mock("axios");

test("SimplyRETS service - should be a singleton", () => {
  const instance1 = SimplyRETS.getInstance();
  const instance2 = SimplyRETS.getInstance();
  expect(instance2).toBe(instance1);
});

test("SimplyRETS service - getListings should fetch listings", async () => {
  const mockListings = [{ address: "1 Daily Planet Plaza" }] as Listing[];
  (axios as any).get.mockResolvedValue({
    data: mockListings,
  });
  const simplyRetsClient = SimplyRETS.getInstance();
  const listings = await simplyRetsClient.getListings(["Metropolis"]);
  expect(axios.get).toHaveBeenCalledWith(
    "/properties?q=metropolis",
    expect.objectContaining({})
  );
  expect(listings).toBeInstanceOf(Array);
  expect(listings).toEqual(mockListings);
});

test("SimplyRETS service - getListings not fetch duplicate cities", async () => {
  const mockListings = [{ address: "1 Daily Planet Plaza" }] as Listing[];
  (axios as any).get.mockResolvedValue({
    data: mockListings,
  });
  const simplyRetsClient = SimplyRETS.getInstance();
  const listings = await simplyRetsClient.getListings([
    "Metropolis",
    " metropolis ",
    "gotham",
  ]);
  expect(axios.get).toHaveBeenLastCalledWith(
    "/properties?q=metropolis&q=gotham",
    expect.objectContaining({})
  );
});

// missing here: tests for the error-handling branches, omitted for time
