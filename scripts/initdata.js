const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = "mongodb://root:Thienan123@localhost:27017/bkc_qlbanhang?authSource=admin";

async function initDatabase() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("bkc_qlbanhang");

    // Clear existing data
    await db.dropDatabase();
    console.log("Existing database dropped");

    // Create collections
    await db.createCollection('users');
    await db.createCollection('customers');
    await db.createCollection('products');
    await db.createCollection('purchaseHistory');
    await db.createCollection('productCategories');
    await db.createCollection('systemSettings');
    await db.createCollection('backups');

    // Insert initial admin user
    await db.collection('users').insertOne({
      username: "admin",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
      name: "Admin User",
      email: "admin@example.com",
      createdAt: new Date(),
      updatedAt: new Date()
    });

    // Insert initial product categories
    await db.collection('productCategories').insertMany([
      { name: "Nồi chiên không dầu", description: "Các loại nồi chiên không dầu", createdAt: new Date(), updatedAt: new Date() },
      { name: "Loa", description: "Các loại loa", createdAt: new Date(), updatedAt: new Date() },
      { name: "Phụ kiện", description: "Các loại phụ kiện", createdAt: new Date(), updatedAt: new Date() },
      { name: "Nệm", description: "Các loại nệm", createdAt: new Date(), updatedAt: new Date() }
    ]);

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

initDatabase();
