import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "@/db/config";

export type WishlistModel = {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
};

export type WishlistModelCreateInput = Omit<WishlistModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_PRODUCTS = "Products";
const COLLECTION_WISHLIST = "Wishlists";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getWishlists = async () => {
  const db = await getDb();

  const wishlists = (await db
    .collection(COLLECTION_WISHLIST)
    .find()
    .toArray()) as WishlistModel[];

  return wishlists;
};

export const createWishlist = async (wishlist: WishlistModelCreateInput) => {
  const db = await getDb();
  const result = await db.collection(COLLECTION_WISHLIST).insertOne(wishlist);

  return result;
};

export const getWishlistsByUserId = async (userId: any): Promise<any[]> => {
  const db = await getDb();
  const objectIdUserId = new ObjectId(userId);

  const aggregationPipeline = [
    {
      $match: { userId: objectIdUserId }
    },
    {
      $lookup: {
        from: COLLECTION_PRODUCTS,
        localField: "productId",
        foreignField: "_id",
        as: "productDetails"
      }
    },
    {
      $addFields: {
        products: {
          $arrayElemAt: ["$productDetails", 0]
        }
      }
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        productId: 1,
        createdAt: 1,
        updatedAt: 1,
        products: {
          _id: 1,
          name: 1,
          slug: 1,
          description: 1,
          excerpt: 1,
          price: 1,
          tags: 1,
          thumbnail: 1,
          images: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    }
  ];

  const wishlists = await db
    .collection(COLLECTION_WISHLIST)
    .aggregate(aggregationPipeline)
    .toArray();

  return wishlists;
};

export const deleteWishlistItem = async (_id: ObjectId) => {
  const db = await getDb();

  const result = await db.collection(COLLECTION_WISHLIST).deleteOne({ _id });

  return result;
};