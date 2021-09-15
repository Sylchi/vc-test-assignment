import { MongoClient } from 'mongodb';

let cachedDb = null;

const getDb = async () =>  {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(process.env.MONGO_URI);
  cachedDb = client.db();
  return cachedDb;
}

export default getDb;