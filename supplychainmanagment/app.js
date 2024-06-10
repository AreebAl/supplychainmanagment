import express from 'express'
const app=express();
import dotenv from 'dotenv'
import connectDB from './db/database.js';
import checklistRouter from './routes/checklistRoute.js';
import orderRouter from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import { validate } from './middleware/validationMiddleware.js';
dotenv.config({path:"./.env"})
const __filename =fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

// Create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(logDirectory, 'access.log'), { flags: 'a' });

// Setup the logger to use the 'combined' format and log to a file
app.use(morgan('combined', { stream: accessLogStream }));

// Setup the logger to also log to the console
app.use(morgan('combined'));


// Create a write stream for terminal logs (stdout and stderr)
const terminalLogStream = fs.createWriteStream(path.join(logDirectory, 'terminal.log'), { flags: 'a' });

// Redirect stdout and stderr to the terminal log file
const originalStdoutWrite = process.stdout.write.bind(process.stdout);
const originalStderrWrite = process.stderr.write.bind(process.stderr);

process.stdout.write = (chunk, ...args) => {
  terminalLogStream.write(chunk);
  originalStdoutWrite(chunk, ...args);
};

process.stderr.write = (chunk, ...args) => {
  terminalLogStream.write(chunk);
  originalStderrWrite(chunk, ...args);
};

// Middleware for detailed logging
app.use((req, res, next) => {
  const logFilePath = path.join(logDirectory, 'detailed.log');
  const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

  // Log request details
  logStream.write(`Request Method: ${req.method}\n`);
  logStream.write(`Request URL: ${req.originalUrl}\n`);
  logStream.write(`Request Headers: ${JSON.stringify(req.headers, null, 2)}\n`);
  if (req.body) {
    logStream.write(`Request Body: ${JSON.stringify(req.body, null, 2)}\n`);
  }

  // Capture response details
  const oldWrite = res.write;
  const oldEnd = res.end;
  const chunks = [];

  res.write = function (chunk, ...args) {
    chunks.push(chunk);
    oldWrite.apply(res, [chunk, ...args]);
  };

  res.end = function (chunk, ...args) {
    if (chunk) {
      chunks.push(chunk);
    }
    const body = Buffer.concat(chunks).toString('utf8');
    logStream.write(`Response Status: ${res.statusCode}\n`);
    logStream.write(`Response Body: ${body}\n`);
    logStream.write('----------------------------------\n');
    oldEnd.apply(res, [chunk, ...args]);
  };

  next();
});


app.use(express.json());
app.use(validate)
app.use('/api/auth', authRoutes);
app.use('/api/checklists', checklistRouter);
app.use('/api/orders', orderRouter);

app.use(errorHandler);

const port=process.env.PORT

connectDB()

app.listen(port,()=>{
    console.log(`server strted om port ${port}`)
})
