import { Db, ObjectId } from "mongodb";
import { getMongoClientInstance } from "@/db/config";
import { hashText } from "@/db/utils/hash";

export type UserModel = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserModelCreateInput = Omit<UserModel, "_id">;

const DATABASE_NAME = process.env.MONGODB_DB_NAME
const COLLECTION_USER = "Users";

export const getDb = async () => {
  const client = await getMongoClientInstance();
  const db: Db = client.db(DATABASE_NAME);

  return db;
};

export const getUsers = async () => {
  const db = await getDb();

  const users = (await db
    .collection(COLLECTION_USER)
    .find()
    .project({ password: 0 })
    .toArray()) as UserModel[];

  return users;
};

export const createUser = async (user: UserModelCreateInput) => {
  const modifiedUser: UserModelCreateInput = {
    ...user,
    password: hashText(user.password),
  };

  const db = await getDb();
  const result = await db.collection(COLLECTION_USER).insertOne(modifiedUser);

  return result;
};

export const getUserByEmail = async (email: string) => {
  const db = await getDb();
  const user = (await db
    .collection(COLLECTION_USER)
    .findOne({ email: email })) as UserModel;

  return user;
};
