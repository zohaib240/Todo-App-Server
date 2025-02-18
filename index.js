import express from "express";
import dotenv from "dotenv";  
import connectDB from "./src/Db/index.js";
import todoRoutes from "./src/routes/todos.routes.js";
import cors from "cors";

dotenv.config();  

const app = express();

app.use(express.json());


const corsOptions = {
  origin: "http://localhost:5173", // Is URL ko aap apne frontend URL se replace karen
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type"], // Allowed headers
};

app.use(cors(corsOptions)); 
// Default GET route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Todo routes
app.use('/api/v1', todoRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`⚙️  Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed !!! ", err);
  });
