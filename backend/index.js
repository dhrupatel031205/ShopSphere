//packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
dotenv.config();

const app = express();

const allowedOrigins = ['http://localhost:5173'];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("Request Origin: ", origin);
    if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
    } else {
      console.error(`Blocked by CORS: ${origin}`);
        return callback(new Error('Not allowed by CORS'));
    }
},
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, 
};







app.use(cors(corsOptions));

console.log("CORS Origin: ", corsOptions.origin);
// console.log("API URL: ", process.env.VITE_BACKEND_URL);

//Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

// app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.get("/", (req, res) => {
  res.send("API is running!");
});

app.listen(port);
