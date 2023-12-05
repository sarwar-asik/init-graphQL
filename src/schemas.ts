export const typeDefs = `#graphql

type Query{
  users:[User]
  posts:[Post]
}


type Mutation{
  signup(name:String!,email:String!,password:String!,bio:String):AuthPayload,
  login(email:String,password:String):AuthPayload,
  createPost(post:PostInput!):PostPayload,
  updatePost(postId:ID!,post:PostInput):PostPayload,
  deletePost(id:ID!):PostPayload
}




type AuthPayload{
  userError:String 
   token:String
}

type PostPayload{
  postError:String
  post:Post
}

input PostInput{
  title:String
  content:String
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


`;
