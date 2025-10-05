// SkyCRM - Sky Tours ehf. Customer Management System
// Author: Jón (jon@skytours.is)
// This is going to be great!

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const PORT = 3000;

function loadCustomers() {
    try {
        return JSON.parse(fs.readFileSync('./data/customers.json'));
    } catch(e) {
        return [];
    }
}

function saveCustomers(data) {
    fs.writeFileSync('./data/customers.json', JSON.stringify(data, null, 2));
}

app.get('/api/customers', (req, res) => {
    res.json({ data: loadCustomers() });
});

app.post('/api/customers', (req, res) => {
    const customers = loadCustomers();
    const newCustomer = {
        id: customers.length + 1,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        created: new Date().toISOString(),
        balance: 0
    };
    customers.push(newCustomer);
    saveCustomers(customers);
    res.json({ success: true });
});

app.delete('/api/customers/:id', (req, res) => {
    let customers = loadCustomers();
    customers = customers.filter(c => c.id != req.params.id);
    saveCustomers(customers);
    res.json({ deleted: true });
});

app.listen(PORT, () => console.log(`SkyCRM on port ${PORT}`));
// Admin: admin123
// TODO: replace eval with proper search
