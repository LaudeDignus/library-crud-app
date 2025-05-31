const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json()); 

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

const bookRoutes = require("./routes/books");
app.use("/books", bookRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB connecté avec succès"))
.catch((err) => console.error("❌ Erreur MongoDB :", err));

app.get("/", (req, res) => {
  res.send("🚀 Backend en marche !");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌍 Serveur en écoute sur le port ${PORT} ---> http://localhost:${PORT}`);
});
