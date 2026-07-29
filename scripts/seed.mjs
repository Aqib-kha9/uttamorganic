import { MongoClient, ServerApiVersion } from "mongodb";
import { PRODUCTS } from "../src/data/products.ts";
import {
  BLOG_ITEMS,
  CATEGORY_ITEMS,
  CONTACT_DETAILS,
  CONTACT_ENQUIRIES,
  CROP_ITEMS,
  D2C_SECTION,
  DEALER_APPLICATIONS,
  HERO_SLIDES,
} from "../src/data/adminContent.ts";

const uri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || "greengrow";

if (!uri) {
  throw new Error("MONGODB_URI is required. Add it to your environment before running the seed command.");
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const collections = {
  products: PRODUCTS,
  categories: CATEGORY_ITEMS,
  crops: CROP_ITEMS,
  hero: HERO_SLIDES,
  blogs: BLOG_ITEMS,
  dealers: DEALER_APPLICATIONS,
  enquiries: CONTACT_ENQUIRIES,
};

async function replaceById(collectionName, documents) {
  const collection = client.db(databaseName).collection(collectionName);
  const now = new Date().toISOString();

  for (const document of documents) {
    await collection.replaceOne(
      { id: document.id },
      { ...document, _createdAt: now, _updatedAt: now },
      { upsert: true },
    );
  }

  console.log(`Seeded ${documents.length} ${collectionName} documents.`);
}

async function seedSettings() {
  const settings = client.db(databaseName).collection("settings");
  const now = new Date().toISOString();
  const entries = [
    ["d2c", D2C_SECTION],
    ["contact-details", CONTACT_DETAILS],
  ];

  for (const [id, document] of entries) {
    await settings.replaceOne(
      { id },
      { ...document, id, _createdAt: now, _updatedAt: now },
      { upsert: true },
    );
  }

  console.log(`Seeded ${entries.length} settings documents.`);
}

try {
  await client.connect();
  await client.db(databaseName).command({ ping: 1 });

  for (const [collectionName, documents] of Object.entries(collections)) {
    await replaceById(collectionName, documents);
  }
  await seedSettings();

  console.log(`MongoDB seed completed for database "${databaseName}".`);
} finally {
  await client.close();
}
