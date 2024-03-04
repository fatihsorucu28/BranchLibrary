const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5500;

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));
// Connection URI for MongoDB
const uri = "mongodb+srv://fatihvsorucu:123321gb@cluster0.rnhlupj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient with options
const client = new MongoClient(uri);

// Define function to connect to MongoDB and perform operations
async function connectToMongoDB() {
  try {
    // Connect to MongoDB server
    await client.connect();
    console.log("Connected to MongoDB");

    // Specify the database and collection
    const db = client.db("talks_database");
    const talksCollection = db.collection("talks");

    // Define routes to fetch talks from MongoDB
    app.get('/talks', async (req, res) => {
      try {
        // Fetch talks from the database
        const talks = await talksCollection.find().toArray();
        // Send talks data to the client
        res.json(talks);
      } catch (error) {
        console.error('Error fetching talks:', error);
        res.status(500).send('Error fetching talks');
      }
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

// Call the function to connect to MongoDB and define routes
connectToMongoDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
