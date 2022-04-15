import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware.js";
//import mongoose from 'mongoose'
import cors from 'cors';
import connectDB from "./config/db.js";
import user from "./api/userApi.js"
import addon from "./api/addOnApi.js"


dotenv.config();
const app = express();


connectDB();
            
  app.use(morgan('common'));
    app.use(cors());

  app.use(express.json());

  app.use('/api/user', user);
  app.use('/api/addon', addon);

  const port = process.env.PORT || 4000;
  
  
  app.use(express.json());
  
  app.get('/', (req, res) => {
      res.json({
          message: 'API IS RUNNING',
      })
  })
  
//   app.use('/api/logs', logs);
  
  app.use(notFound);
  app.use(errorHandler)
  
  
  app.listen(port, () => {
      console.log(`listening at http://localhost:${port}`);
  })
