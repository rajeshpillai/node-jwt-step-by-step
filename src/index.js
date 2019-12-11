require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {verify} = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs');

// STEPS
// 1. Register a user
// 2. Login a user
// 3. Logout a user
// 4. Setup a protected route
// 5. Get a new accesstoken with a refresh token

const server = express();

// Use middleware
server.use(cookieParser());
server.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
)

// Read json encoded body data
server.use (express.json());

// Url encoded bodies
server.use(express.urlencoded({
  extended:true}));

server.listen(process.env.PORT, ()=> {
  console.log(`server listening on port ${process.env.PORT}`);
});