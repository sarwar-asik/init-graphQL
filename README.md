
- The `src` directory contains the main file `index.ts` where the Apollo Server is configured.
- `package.json` includes project dependencies and scripts.

## Dependencies

The main dependencies used in this project include:

- `@apollo/server`: Apollo Server for GraphQL implementation.
- `typescript`: TypeScript for static typing.
- `ts-node`: TypeScript execution environment.

## Data

The project includes sample data for GraphQL queries. The `books` and `users` arrays serve as the initial dataset.

## Schema Definition

The GraphQL schema is defined using Apollo Server's type definition language (SDL). Types for `Book` and `User` along with queries for fetching `books` and `users` are specified.

```graphql
type Book {
  title: String
  author: String
}

type User {
  name: String
  email: String
}

type Query {
  books: [Book]
  users: [User]
}
