export const typeDefs = `#graphql


type Book {
  title: String
  author: String
}

type Post {
  id:ID!
  title:String!
  content:String!
  author:User
  createdAt:String!
  published:Boolean!


}


type User{
  id:ID!
  name:String!
  email:String!
  password:String!
  createdAt:String!
  posts:[Post]

}

type Profile{
  id:ID!
  bio:String!
  createdAt:String!
  user:User!
}



type Query{
  me:User
  posts:[Post]
}



`;
