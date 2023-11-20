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

      return singleCategory;
    },
  },
};
