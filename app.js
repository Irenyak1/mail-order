
/*
  Defining variables to hold the express module, morgan module,
  bodyparser middleware and mysql database that shall be used
  to run the mail order application.
*/
const express = require("express");
const morgan = require("morgan");
const parser = require("body-parser");
const mysql = require("mysql");


//Creating an app using the express module
const app = express();

// Creating a  variable html_dir that stores the path to the folder with static files
var html_dir = './public/';

//Set app to use morgan short 
app.use(morgan("short"));

//Set app to use the default of body parser
app.use(parser.urlencoded({ extended: false }));

//Set public folder as static folder for static file
app.use(express.static("./public"));


// Route to fetch the landing page
app.get('/', (req, res) => {
  res.sendfile(html_dir + 'index.html');
});

// Route to fetch the mail order form 
app.get('/mailOrder', function (req, res) {
  res.sendfile(html_dir + 'mailOrder.html');
});


// Creating connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'orders',
  password: 'Sweetmom1844.'
});

// Connecting to the database
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// Route to capture and post data using the mail order form
app.post("/mailorders", (req, res) => {
  let object = {
    custid: req.body.customerid,
    name: req.body.name,
    state: req.body.selection,
    retail:req.body.retail,
    radio: req.body.radios,
    partnumb: req.body.partn,
    descript: req.body.description,
    price: req.body.price,
    quant: req.body.quantity,
    oversize:req.body.oversize,
    cost:req.body.cost,
    tax:req.body.tax,
    handling:req.body.handling,
    total:req.body.total
    
  };

  //Printing object to the console
  console.log(object)
     
  //Inserting data into the database 
  const querrystring = "INSERT INTO mailorder(custid,name,state,retail,radio,partn,descrip,price,quant,oversize,cost,tax,handle,total) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  connection.query(querrystring,
    [
      object.custid,
      object.name,
      object.state,
      object.retail,
      object.radio,
      object.partnumb,
      object.descript,
      object.price,
      object.quant,
      object.oversize,
      object.cost,
      object.tax,
      object.handling,
      object.total

    ]);
  // Function to set a time lag before the form closes after submit
  setTimeout(function(){
  // Redirecting the user to the landing page after making an order
  res.redirect('/')
  //Ending the session
  res.end();

  // Setting time lag to 6000ms
  },6000);
  
});

// Port at which the app is running
app.listen(3008);

//Printing a message to the console to show on which port the app is running
console.log("App running at Port 3008");