import { db } from "../../src/db.js";
export const resolvers = {
    Query: {
        products: () => db.products,
        product: (parent, args, context) => {
            const result = db.products.find((pro) => pro.id === args.productId);
            //   console.log(result,"resss");
            return result;
        },
        categories: () => db.categories,
        category: (parent, args, context) => {
            const singleCategory = db.categories.find((cate) => cate.id === args.id);
            return singleCategory;
        },
    },
};
