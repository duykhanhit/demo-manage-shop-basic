require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

const app = express();

const userRouter = require('./routers/user.router');
const dashboardRouter = require('./routers/dashboard.router');

const userMiddleware = require('./middlewares/user.middleware');
const dashboardMiddleware = require('./middlewares/dashboard.middleware');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static('public'));

app.use('/user', userRouter);
app.use('/dashboard', userMiddleware.requireAuth, dashboardRouter);

var server = app.listen(process.env.PORT, function(){
    console.log('Server running at port ' + process.env.PORT);
});