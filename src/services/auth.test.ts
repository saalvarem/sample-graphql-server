import "dotenv/config";
import { getAuthorizedUsers } from "./auth";

test("authorized users dictionary", () => {
  expect(getAuthorizedUsers).toBeDefined;
  const authUsers = getAuthorizedUsers();
  expect(authUsers).toHaveProperty("users");
});
