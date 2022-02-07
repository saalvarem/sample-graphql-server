const { AUTH_USER, AUTH_PASS } = process.env;

export const getAuthorizedUsers = (): { users: { [user: string]: string } } => {
  // we are hardcoding the authorization in this example
  // to a simple set of user credentials
  // so for now, this doesn't do much more than return an expected
  // object needed for the "express-basic-auth" middleware,
  // but it serves as an example of an abstraction layer
  // the application would use for auth purposes
  const username: string = AUTH_USER as string;
  const password: string = AUTH_PASS as string;
  return { users: { [username]: password } };
};
