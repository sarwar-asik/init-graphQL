
## create a graphql server

- 1. run the command for installation
- 2. change package name in package.json
- 3. create src>index.ts file
- 4. create a db for static fake data
- 5. create a schema in gql>schema>index.ts
- 6. create a resolver in gql>resolver>index.ts
- 7. run the server 
- 8. query in browser

#### 1.installation
```bash
    npm init --yes
    npm pkg set type="module"
    npm install @apollo/server graphql
    mkdir src
    touch src/index.ts
    npm install --save-dev typescript @types/node
    touch tsconfig.json
    npm i nodemon
```

#### 2. change package name in package.json

```json
  "compile": "tsc -w",
    "start": "nodemon ./dist/src/index.js"
```

#### 3. create src>index.ts file

```ts
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "../gql/schema/index.js";
import { resolvers } from "../gql/resolver/index.js";

const server = new ApolloServer({
  typeDefs,   //! for schema
  resolvers,  // ! for resolver or model
});



const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
```

### 4.create a db for static fake data

#### 5. create a schema in gql>schema>index.ts

```graphql
export const typeDefs = `#graphql

 type Product {
      id: ID!,
        name: String,
        image: String,
        description: String,
        price:Float,
        quantity: Int,
        onStock: Boolean,
        categoryId:  String
        category:Category,
        reviews:[Review]    
        
    }

    type Category{
        id:ID!,
        name:String,
        products:[Product]
    }

    type Review{
        id:ID!,
        review:String,
        rating:Float,
        date:String,
        productId:String,
    }
     type Query{
        products:[Product],
        product(productId:ID!):Product
        categories:[Category]
        category(id:ID!):Category
    }
`;

```


#### 6. create a resolver in gql>resolver>index.ts
```ts
import { db } from "../../src/db.js";

export const resolvers = {
  Query: {
    products: () => db.products,
    product: (parent: any, args: { productId: String }, context: any) => {
      const result = db.products.find((pro) => pro.id === args.productId);
      //   console.log(result,"resss");
      return result;
    },
    categories: () => db.categories,
    category: (parent: any, args: { id: String }, context: any) => {
      const singleCategory = db.categories.find((cate) => cate.id === args.id);
      // console.log(singleCategory)

      return singleCategory;
    },
  },
  Product: {
    category: (parent, args, context) => {
      // console.log(parent, "paretend");
      const result = db.categories.find(
        (category) => category.id === parent.categoryId
      );

      return result;
    },
    reviews: (parent, args, context) => {
      // console.log(parent, "parent: ");
      return db.reviews.filter(review=>review.productId===parent.id)
    },
  },

  Category: {
    products: ({id}, args, context) => {
     
      const result = db.products.filter(
        (product) => product.categoryId === id
      );
      return result;
    },
  },
};

```

### 6.run the server 
```bash
yarn compile
yarn start

```


### 8. query in browser


```ts

** for All products ======
query products{
  products {
    id
    name
  }
}



** for single product =====
query SIngleProduct($productId:ID!){
  product (productId:$productId){
    name
    // reviews {
    //   review
    //   rating
    // }
  }
}


** for product with its category
query products{
  products {
    
    name
    category {
      name
    }
  }

}

*** for products with its reviews
query products{
  products {  
    name
    reviews {
      rating
      review
    }
  }

}



```