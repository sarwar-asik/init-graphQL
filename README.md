### G-Blogs server

- 1. installation
- 2. create scripts in 'package.json'
- 3. create '/src/index.ts'
- 4. create a /src/schema.ts and src/resolver/index.ts
- 5. change dir in 'ts-config'
- 6. include prisma and prismaclient
- 7.

#### 1.Installation

```bash
        yarn init -y
        npm install @apollo/server graphql
        yarn add typescript @types/node ts-node-dev
        yarn add -D nodemon
        npx tsc --init
        yarn add prisma
        npx @prisma/client
        npm i bcrypt
        npm install --save @types/bcrypt
        yarn add jsonwebtoken



```

#### 2. create scripts in 'package.json'

```json
 "scripts": {
    "dev": "nodemon --watch './**/*.ts' --exec ts-node src/index.ts"
  },
```

#### 3. create '/src/index.ts'

```ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolver";
import { typeDefs } from "./schemas";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4001 },
  });

  console.log(`🚀  Server ready at: ${url}`);
};

main();
```

#### 4. create a /src/schema.ts and src/resolver/index.ts

**in /src/schema.ts**

```ts
export const typeDefs = `#graphql

type Query{
  users:[User]
  posts:[Post]
}


type Mutation{
  signup(name:String!,email:String!,password:String!):User
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
```




**in src/resolver/index.ts**

```ts

import { PrismaClient } from "@prisma/client";



  export const prisma = new PrismaClient();
  interface IUser {
    name : string,
   email :  string ,
   password :  string
  }

  export const resolvers = {
    Query: {
     
      users:async()=>{
        return await prisma.user.findMany({})
      }

    },
    Mutation:{
      signup:async(parent:any,args:IUser,context:any)=>{
        // console.log(args,"argss data");
        return await prisma.user.create({
          data:args
        })
      }
    }

  };
  
```



#### 5. change dir in 'ts-config'

```json
        "rootDir":"./src/index.ts"
        "outDir":"./dist/index.ts"
```

#### run the server with 

```bash
npx prisma migrate dev
yarn dev

```

### Query in client 

```ts

mutation Registration($name: String!, $email: String!, $password: String!){
  signup(name: $name, email: $email, password: $password) {
  user {
    email
    id
    name
    password
  }
  }
}
```