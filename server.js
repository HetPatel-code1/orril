// server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Function to convert a flat list of categories into a nested tree structure (used for the mega menu)
const nestCategories = (categories, parentId = null) => {
  return categories
    .filter(category => category.parent_id === parentId)
    .map(category => ({
      ...category,
      children: nestCategories(categories, category.id)
    }));
};


// ✅ MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root",      // change if you have a password
  password: "",      // e.g. "1234"
  database: "vanel_db"
});

db.connect(err => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

// 1. API route to get top-level categories for the main grid
app.get("/api/categories", (req, res) => {
  // Only fetching top-level categories (parent_id IS NULL)
  const sql = "SELECT * FROM categories WHERE parent_id IS NULL AND image_url IS NOT NULL";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching categories:", err);
      res.status(500).send("Database error");
      return;
    }
    res.json(results);
  });
});

// 2. API route to get all categories for the Mega Menu (nested structure)
app.get("/api/mega-menu-categories", (req, res) => {
  // Fetch all categories
  const sql = "SELECT id, name, parent_id FROM categories ORDER BY id";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching mega menu categories:", err);
      res.status(500).send("Database error");
      return;
    }
    // Convert the flat results into a nested structure
    const nestedCategories = nestCategories(results);
    res.json(nestedCategories);
  });
});

// 3. API route to get direct subcategories for a given parent ID
app.get("/api/subcategories/:parentId", (req, res) => {
  const parentId = req.params.parentId;
  
  // Select all categories whose parent_id matches the requested parentId
  const sql = "SELECT * FROM categories WHERE parent_id = ?";
  db.query(sql, [parentId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching subcategories:", err);
      res.status(500).send("Database error");
      return;
    }
    res.json(results);
  });
});


// ✅ Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));