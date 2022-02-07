# Sample Project: GraphQL

This is a sample `Node.js` project that creates an `GraphQL` server using the `Express` framework and `Apollo Server`.

The project creates an `Express` server application and an `Apollo Server` GraphQL server.

Then the `Apollo Server` is applies as middleware to the `Express` application under the route:
```typescript
/graphql
```

### Getting started.

To get started, you will need to fill in the values in the `.env` file provided.
```bash
# in the .env file, write:
PORT=4000
HOST=http://localhost
SIMPLY_RETS_TOKEN={your API token}
AUTH_USER={your_test_username}
AUTH_PASS={your_test_password}
```
then you can run:
```bash
npm i
npm start
```
to start the server.
You should see the following message being logged to the console:
```bash
Application server listening at  http://localhost:4000

GraphQL server listening at   http://localhost:4000/graphql
```

You can then `POST` GraphQL requests to the `/graphql` end point.

> Please note the `graphql` end point requires Basic authorization (it should match the `AUTH_USER` and `AUTH_PASS` credentials from the `.env` file)

### Sample GraphQL query

A sample "`getListings`" GraphQL query is already implemented in this project.
The `getListings` query takes in a `$city` parameter and queries an demo API called "SimplyRETS" for data.

```GraphQL
query ExampleQuery($city: String!) {
  getListings(city: $city) {
    school {
      middleSchool
    }
  }
}
```
where the `$city` variable can be something like:
```GraphQL
{ "city": "Houston" }
```

In a `cURL` request this could look like:
```bash
# Request
curl --location --request POST 'http://localhost:4000/graphql' \
--header 'Content-Type: application/json' \
--header 'Authorization: Basic ${TOKEN}' \
--data-raw '{"query":"query ExampleQuery($city: String!) { getListings(city: $city) { school { middleSchool } } }", variables": { "city": "houston" } }'
```

#### Response
```json
# Response
{
  "data": {
    "getListings": [
      { "school": { "middleSchool": "FALCON PASS" } },
      { "school": { "middleSchool": "Fall Creek" } },
      { "school": { "middleSchool": "Pattison" } },
      { "school": { "middleSchool": "SBISD" } },
      { "school": { "middleSchool": "SBISD" } },
      { "school": { "middleSchool": "FALCON PASS" } },
      { "school": { "middleSchool": "Yaeger" } },
      { "school": { "middleSchool": "SBISD" } },
      { "school": { "middleSchool": "HAUDE" } },
      { "school": { "middleSchool": "POE" } },
      { "school": { "middleSchool": "KIRK" } },
      { "school": { "middleSchool": "Anderson" } },
      { "school": { "middleSchool": "Anderson" } }
    ]
  }
}
```


### To run tests.

```bash
npm test
```

### References.

Here are links to some of the dependencies used in this project:


[Typescript](https://www.typescriptlang.org/)

[Node.js](https://nodejs.org/en/)

[Express](https://expressjs.com/)

[GraphQL](https://graphql.org/)

[Apollo Server](https://www.apollographql.com/docs/apollo-server/)

