const { where } = require("sequelize");
const db = require("./db.config");
const customerModel = require("./customer.model")(db.sequelize, db.Sequelize);

    function createCustomer(req, res) {
        if (!req.body.name || !req.body.email || !req.body.age) {
            res.status(400).send({
                message: "Please enter required fields.",
            })
        }
       
        const customerObject = {
            name : req.body.name,
            email: req.body.email,
            age  : req.body.age,
        }
        customerModel.create(customerObject).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send(err)
        })

    }
    function updateCustomer(req, res) {
    console.log('Request Body:', req.body);
    console.log('Request Params:', req.params);

    if (!req.body.name || !req.body.email || !req.body.age) {
        return res.status(400).send({
            message: "Please enter required fields.",
        });
    }

    const newData = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
    };

    customerModel.update(newData, {
        where: {
            email: req.body.email
        }
    }).then(([affectedRows]) => {
        if (affectedRows === 0) {
            return res.status(404).send({
                message: `No customer found with email ${req.body.email}.`
            });
        }
        res.send(`Updated data successfully for email ${req.body.email}`);
    }).catch(err => {
        console.error('Error updating customer:', err);
        res.status(500).send({
            message: 'An error occurred while updating the customer.',
            error: err.message
        });
    });
}
    function findAllCustomer(req, res) {
        customerModel.findAll().then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send(err)
        })

    }
    function findCustomerByEmail(req, res) {
        customerModel.findByPk(req.params.email).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send(err)
        })

    }
    function deleteCustomer(req, res) {
        customerModel.destroy({
            where: {
                email: req.params.email
            }
        }).then(data => {
            res.send("Deleted Data successfully for email " + req.params.email);
        }).catch(err => {
            res.status(500).send(err)
        })

    }
module.exports = {
    createCustomer,
    updateCustomer,
    findAllCustomer,
    findCustomerByEmail,
    deleteCustomer
}