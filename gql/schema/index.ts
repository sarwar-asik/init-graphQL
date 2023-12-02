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
        }

    type Category{
        id:ID!,
        name:String
    }

    type Query{
        products:[Product],
        product(productId:ID!):Product
        categories:[Category]
        category(id:ID!):Category
    }
`;
