const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = process.env.PORT || 8660; // Set your desired port number

// MongoDB Atlas connection string
const uri =
  "mongodb+srv://akkadbakkad:akkadbakkad@cluster0.3dxvitq.mongodb.net/";

// Connect to MongoDB Atlas
let client;

async function connectToDatabase() {
  client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
}

connectToDatabase();

// GET endpoint to retrieve data
app.get("/data", async (req, res) => {
  try {
    const db = client.db("sensors"); // Replace with your database name
    const collection = db.collection("s1"); // Replace with your collection name

    const data = await collection.find({}).toArray();
    console.log(data)
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});