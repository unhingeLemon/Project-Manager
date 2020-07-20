const express = require('express');
const app = express();
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;
const path = require('path');

// DB
connectDB();

// init middleware
app.use(express.json({ extendend: false }));

// ROUTES
// app.use('/api/users', require('./routes/users'));
// app.use('/api/auth', require('./routes/auth'));
app.use('/api/bugs', require('./routes/bugs'));

app.listen(PORT, () => {
  console.log('SERVER IS AT: http://localhost:5000/');
});
