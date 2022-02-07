import axios from "axios";
import { City, Listing } from "../utils.ts/types";
const { SIMPLY_RETS_TOKEN } = process.env;

// this is a singleton client/controller to call the SimplyRETS API
// throughout the application
class SimplyRETS {
  private static singleton: SimplyRETS;
  private baseUrl: string;
  private apiAuthorization: string;

  private constructor() {
    this.baseUrl = "https://api.simplyrets.com";
    this.apiAuthorization = `Basic ${SIMPLY_RETS_TOKEN}`;
  }

  static getInstance(): SimplyRETS {
    if (!SimplyRETS.singleton) {
      SimplyRETS.singleton = new SimplyRETS();
    }
    return SimplyRETS.singleton;
  }

  async getListings(cities: City[]): Promise<Listing[]> {
    const uniqueCities: string[] = [
      ...new Set(
        cities.map((city) =>
          typeof city === "string" ? city.toLowerCase().trim() : ""
        )
      ),
    ].filter((val) => !!val); //to remove the empty strings & duplicates
    const queryParams: string = uniqueCities
      .map((city) => `q=${city}`)
      .join("&"); // "q=city1&q=city2"
    const encodedParams = encodeURI(queryParams);
    const listings: Listing[] = await axios
      .get<Listing[]>(`/properties?${encodedParams}`, {
        baseURL: this.baseUrl,
        headers: {
          Authorization: this.apiAuthorization,
          "Content-Type": "application/json",
        },
      })
      .then((response) => response.data ?? [])
      .catch((err) => {
        // here is where we might handle the error
        // more appropriately (including logging it)
        // but for not we will just make sure it doesn't
        // crash the application by returning an empty array
        return [];
      });
    return listings;
  }
}

export default SimplyRETS;
