import dotenv from 'dotenv';
dotenv.config();
import 'express-async-errors';
import express from 'express';
const app = express();
import connectDb from './db/connection.js';
import authenticationUser from './middleware/authentication.js';



//Security Packages

import helmet from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';


//routers
import authrouter from './routes/auth.js';
import jobsrouter from './routes/jobs.js';


// error handler
import  notFoundMiddleware  from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';


app.use(express.json());
// app.use(helmet());
// app.use(cors());
// app.use(xss());
// app.use(rateLimiter());

// extra packages

// routes
app.use('/api/v1/auth',authrouter);
app.use('/api/v1/jobs',authenticationUser,jobsrouter);

 app.use(notFoundMiddleware);
 app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
//const port=3000;

const start=async ()=>{
  try{
      await connectDb(process.env.MONGO_URI);
      app.listen(port,console.log(`server is listeninig on port ${port}`));
  }
  catch(error)
  {
      console.log(error);
  }
};
//app.listen(port,console.log(`server is listeninig on port ${port}`))
start();

