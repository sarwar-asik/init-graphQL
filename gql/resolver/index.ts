import { db } from "../../src/db.js";

export const resolvers = {
    Query: {
      // books: () => books,
      products: () => db.products,
      product: (parent: any, args: { productId: String }, context: any) => {
        const result = db.products.find((pro) => pro.id === args.productId);
      //   console.log(result,"resss");
        return result;
      },
    },
  };



  
