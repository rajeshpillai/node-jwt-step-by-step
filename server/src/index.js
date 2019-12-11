require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {verify} = require('jsonwebtoken');
const {hash, compare} = require('bcryptjs');
const {fakeDB} = require('../db/fake-db.js');

const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken
} = require('./tokens.js');

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

// STEPS
// 1. Register a user
server.post('/register', async(req, res) => {
  const {email, password} = req.body;
  try {

      let user = fakeDB.find(user => user.email === email);
      console.log(user);

      if (user) throw new Error('User already exist');
      
      const hashPassword = await hash(password,10);
      console.log(hashPassword);
      fakeDB.push({
        id: fakeDB.length,
        email, 
        password: hashPassword
      });

      console.log(fakeDB);

      res.send({
        message: "User successfully created."
      })

  } catch(err) {
    res.send({
      error: `${err.message}`
    })
  }
})

// 2. Login a user
server.post('/login', async(req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Find user in array. If not exist send error
    const user = fakeDB.find(user => user.email === email);
    if (!user) throw new Error('User does not exist');
    // 2. Compare crypted password and see if it checks out. Send error if not
    const valid = await compare(password, user.password);

    const hashPassword = await hash(password,10);
    console.log(hashPassword);

    if (!valid) throw new Error('Password not correct');
    // 3. Create Refresh- and Accesstoken
    const accesstoken = createAccessToken(user.id);
    const refreshtoken = createRefreshToken(user.id);
    // 4. Store Refreshtoken with user in "db"
    // Could also use different version numbers instead.
    // Then just increase the version number on the revoke endpoint
    user.refreshtoken = refreshtoken;
    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 3. Logout a user
// 4. Setup a protected route
// 5. Get a new accesstoken with a refresh token