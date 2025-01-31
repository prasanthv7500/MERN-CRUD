const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/crud")

app.get('/', async (req, res) => {
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.get('/getUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findById({_id:id})
        .then(user => res.send(user))
        .catch(err => res.status(404).send(err));
});

app.post('/createUser', async (req, res) => {
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

app.put('/updateUser/:id', (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndUpdate({_id:id}, req.body, { new: true })
        .then(user => res.send(user))
        .catch(err => res.status(400).send(err));
});

app.delete('/deleteUser/:id', async (req, res) => {
    const id = req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});