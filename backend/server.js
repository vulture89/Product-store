import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.rout.js';
import path from "path";

dotenv.config(); // to see .env MONGO_URI

const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // gets root document address

app.use(express.json()); // to be able to use JSON in express

app.use("/api/products", productRoutes);

// app.get("/", (req, res) => {
//     res.send("API is working");
//   });

// console.log("Static folder path:", path.join(__dirname, "../frontend/dist"));
// console.log("Index file path:", path.resolve(__dirname, "../frontend/dist/index.html"));

if (process.env.NODE_ENV === "production") {
    
    app.use(express.static(path.join(__dirname, "/frontend/dist")));
   
    app.get("/", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
      });
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server stated at http://localhost:" + PORT)
})