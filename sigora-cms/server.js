// Get dependencies
let express = require('express');
let path = require('path');
let http = require('http');
var mongoose = require('mongoose');

let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
// var cors = require('cors');

// import the routing file to handle the default (index) route
let index = require('./server/routes/app');
const contactsRoutes = require('./server/routes/contacts');
const documentsRoutes = require('./server/routes/documents');
const commissionsRoutes = require('./server/routes/commissions');
// const goalsRoutes = require('./server/routes/goals')
const targetsRoutes = require('./server/routes/targets')
// const userRoutes = require('.server/routes/user');

// ... ADD CODE TO IMPORT YOUR ROUTING FILES HERE ...

let app = express(); // create an instance of express

// function requireHTTPS(req, res, next){
  // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//     return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }

// app.use(requireHTTPS);
// app.use(express.static('./dist/sigora-cms'));


// Tell express to use the following parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev')); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// Tell express to use the specified director as the
// root directory for your web site
app.use(express.static(path.join(__dirname, 'dist/sigoradb')));

// Tell express to map the default route ('/') to the index route
app.use('/', index);
app.use('/customers', contactsRoutes);
app.use('/dailydata', documentsRoutes);
app.use('/commissions', commissionsRoutes);
// app.use('/goals', goalsRoutes)
app.use('/targets', targetsRoutes)


//For 404
app.use((req, res, next) => {
  res.render('index')
});


// establish a connection to the mongo database
mongoose.connect('mongodb+srv://Lucy:p0LuAXl8M65iq2tE@sigoracluster.xzei0.mongodb.net/sigoradb?retryWrites=true&w=majority',
// mongoose.connect('mongodb+srv://Lucy:BarryTheLongneck22*@sigoracluster.xzei0.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true }, (err, res) => {
    if (err) {
      console.log('Connection failed: ' + err);
    }
    else {
      console.log('Connected to database!');
    }
  }
);


// ... ADD YOUR CODE TO MAP YOUR URL'S TO ROUTING FILES HERE ...

// Tell express to map all other non-defined routes back to the index page
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/sigora-cms/index.html'));
// });

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/sigora-cms/index.html'}
);
});

// Define the port address and tell express to use this port
const port = process.env.PORT || '3000';
app.set('port', port);

// Create HTTP server.
const server = http.createServer(app);

// Tell the server to start listening on the provided port
server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});

app.listen(process.env.PORT || 8080); //this was part of a deployment attempt, delete if error made
