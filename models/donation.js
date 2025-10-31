import mongoose from "mongoose";

const donationSchema = new mongoose.Schema({
  nama: String,
  email: String,
  nomor_telepon: String,
  nominal: Number,
});

export const Donation = mongoose.model("golfhumanity", donationSchema);
