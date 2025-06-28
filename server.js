const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load .env variables

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected for contactForm"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  note: String,
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

// POST route to save contact form
app.post("/api/contact", async (req, res) => {
  const { name, email, note } = req.body;

  try {
    const newContact = new Contact({ name, email, note });
    await newContact.save();
    res.status(200).json({ message: "Contact saved successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save contact" });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Hello From Backend!");
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
