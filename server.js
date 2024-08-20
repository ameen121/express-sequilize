const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
const db = require("./db.config");

//if table not exist it created
db.sequelize.sync();
const customerController = require('./customer.controller');

app.get('/', (req, res) => {
    res.send('Welcome to the C:\wamp64');
});
// create customer
app.post('/customers/new', function (req, res) {
    customerController.createCustomer(req, res);
});
// get all customers
app.get('/customers', function (req, res) {
    customerController.findAllCustomer(req, res);
});
// get customer by email
app.get('/customer/:email', function (req, res) {
    customerController.findCustomerByEmail(req, res);
});

// Update customer
app.put('/update/customer', function (req, res) {
    customerController.updateCustomer(req, res);
});

// delete customer
app.delete('/customers/delete/:email', function (req, res) {
    customerController.deleteCustomer(req, res);
});

app.listen(3000, ()=>{
    console.log('Server running on port 3000');
});