import { Db, MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "greengrow";

interface MongoCache {
  client: MongoClient | null;
  clientPromise: Promise<MongoClient> | null;
}

const globalWithMongo = globalThis as typeof globalThis & {
  _mongoCache?: MongoCache;
};

const cache: MongoCache = globalWithMongo._mongoCache ?? {
  client: null,
  clientPromise: null,
};

if (process.env.NODE_ENV !== "production") {
  globalWithMongo._mongoCache = cache;
}

export function isDatabaseConfigured(): boolean {
  return Boolean(uri);
}

export async function getMongoClient(): Promise<MongoClient> {
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }

  if (cache.client) {
    return cache.client;
  }

  if (!cache.clientPromise) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    cache.clientPromise = client.connect().catch((error) => {
      cache.clientPromise = null;
      throw error;
    });
  }

  cache.client = await cache.clientPromise;
  return cache.client;
}

export async function getDatabase(): Promise<Db> {
  const client = await getMongoClient();
  return client.db(databaseName);
}
