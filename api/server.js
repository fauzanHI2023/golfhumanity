import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { Donation } from "../models/donation.js";

dotenv.config();
const app = express();

// Support untuk __dirname di ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Layani semua file dari folder "public"
app.use(express.static(path.join(__dirname, "public")));

// ✅ Tampilkan index.html saat akses root
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Terima form donasi via POST ke root "/"
app.post("/", async (req, res) => {
  try {
    const { name, email, phone, donation } = req.body;

    const newDonation = new Donation({
      nama: name,
      email,
      nomor_telepon: phone,
      nominal: donation,
    });

    await newDonation.save();

    res.json({ success: true, message: "Donasi berhasil disimpan!" });
  } catch (error) {
    console.error("❌ Gagal menyimpan:", error);
    res.status(500).json({ success: false, message: "Gagal menyimpan data" });
  }
});

// ✅ Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
