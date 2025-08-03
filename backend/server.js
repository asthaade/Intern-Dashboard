const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("Successfully connected to MongoDB.");
}).catch(err => {
  console.error("Connection error", err);
  process.exit();
});

// --- Mongoose Schema and Model ---
const internSchema = new mongoose.Schema({
  name: String,
  referralCode: String,
  donations: Number,
});

const Intern = mongoose.model('Intern', internSchema);

//Seeding the Database (for demonstration)
async function seedDatabase() {
  const internCount = await Intern.countDocuments();
  if (internCount === 0) {
    console.log("No interns found, seeding database...");
    await Intern.create([
      { name: 'Priya Sharma', referralCode: 'priya2025', donations: 1850 },
{ name: 'Rohan Mehta', referralCode: 'rohan2025', donations: 2200 },
{ name: 'Anjali Singh', referralCode: 'anjali2025', donations: 950 },
    ]);
    console.log("Database seeded!");
  }
}

seedDatabase();


//API Routes
// GET: Fetch data for a specific intern (we'll just get the first one for simplicity)
app.get('/api/intern', async (req, res) => {
  try {
    const internData = await Intern.findOne();
    if (!internData) {
      return res.status(404).json({ message: "No intern data found." });
    }
    res.json(internData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// GET: Fetch leaderboard data
app.get('/api/leaderboard', async (req, res) => {
  try {
    // Find all interns and sort them by donations in descending order
    const leaderboardData = await Intern.find().sort({ donations: -1 });
    res.json(leaderboardData);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


// Start Server
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
