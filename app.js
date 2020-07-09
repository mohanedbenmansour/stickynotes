require('./config/passport.config');
const mongoose = require('mongoose');
const express = require('express');
const port = process.env.port || 5000;
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const appRouter = require('./routes/index.router');
const http = require('http');
const passport = require('passport');
app.use(cors());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(
  'mongodb+srv://mohaned:98898685968996@cluster0-hsoop.azure.mongodb.net/emaily?retryWrites=true&w=majority',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set('useCreateIndex', true);
app.use('/api', appRouter);
http.createServer(app).listen(port);
console.log('backend running on port :', port);
