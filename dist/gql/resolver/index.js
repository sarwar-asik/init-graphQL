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
            // console.log(singleCategory)
            return singleCategory;
        },
    },
    Product: {
        category: (parent, args, context) => {
            // console.log(parent, "paretend");
            const result = db.categories.find((category) => category.id === parent.categoryId);
            return result;
        },
        reviews: (parent, args, context) => {
            // console.log(parent, "parent: ");
            return db.reviews.filter(review => review.productId === parent.id);
        },
    },
    Category: {
        products: ({ id }, args, context) => {
            const result = db.products.filter((product) => product.categoryId === id);
            return result;
        },
    },
};
