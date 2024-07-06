import { Db, ObjectId, Document } from "mongodb";
import { getMongoClientInstance } from "@/db/config";

export type ProductModel = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
};

const DATABASE_NAME = process.env.MONGODB_DB_NAME;
const COLLECTION_PRODUCTS = "Products";

export const getDb = async (): Promise<Db> => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);
  return db;
};

type MongoProductModel = Omit<ProductModel, '_id'> & { _id: ObjectId };

export const getProducts = async (skip = 0, limit = 8): Promise<ProductModel[]> => {
  const db = await getDb();
  const products = await db.collection(COLLECTION_PRODUCTS)
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();

  return products.map((product) => ({
    ...product,
    _id: (product._id as ObjectId).toString(),
  })) as ProductModel[];
};

export const getProductBySlug = async (slug: string): Promise<ProductModel | null> => {
  const db = await getDb();
  const product = await db.collection(COLLECTION_PRODUCTS).findOne({ slug });
  if (!product) return null;
  return {
    ...product,
    _id: (product._id as ObjectId).toString(), 
  } as ProductModel;
};

export const searchProductsByName = async (query: string, skip = 0, limit = 8): Promise<ProductModel[]> => {
  const db = await getDb();
  const products = await db.collection(COLLECTION_PRODUCTS)
    .find({ name: { $regex: query, $options: 'i' } })
    .skip(skip)
    .limit(limit)
    .toArray();

  return products.map((product) => ({
    ...product,
    _id: (product._id as ObjectId).toString(),
  })) as ProductModel[];
};
