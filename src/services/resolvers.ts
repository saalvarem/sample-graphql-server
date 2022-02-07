import { Listing } from "../utils.ts/types";
import SimplyRETS from "./simplyRets";
const apiClient = SimplyRETS.getInstance();

const resolvers = {
  Query: {
    getListings: async (
      root: any, // this unused parameter is required by the libraries we use
      { city }: { city: string }
    ): Promise<Listing[]> => {
      const listings = await apiClient.getListings([city]);
      return listings;
    },
  },
};

export default resolvers;
