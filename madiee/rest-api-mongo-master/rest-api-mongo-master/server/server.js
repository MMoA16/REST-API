
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

/*mongoose.connect(`mongodb://mailari:mailari123@ds157574.mlab.com:57574/testingdb`, { useNewUrlParser: true });*/
mongoose.connect(`mongodb+srv://Maruti:123@cluster0.dxtpu.mongodb.net/test`, { useNewUrlParser: true });

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const _ = require('lodash');

var { Games, Games } = require('./models/game.model');

// for creating express app 
var app = express();
const PORT = process.env.PORT??3000;// assigning port 
app.listen(PORT, () => {
    console.log(`PORT is on ${PORT}`);
});

app.use(bodyParser.json());
app.get('/ping', (req, res) => {
    res.status(200).send('hello ');
});


//###########################GAMES/OPTIONS ################



// POST/request with Games 
app.post('/games', (req, res) => {
    console.log(req.body);
    var todo = new Games({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    todo.save().then((data) => {
        res.send(data);
    }, (e) => {
        res.status(400).send(e);
    });
});

//GET/ request with todos which returns all games in collection Games
app.get('/games', (req, res) => {
    Games.find({

    }).then((games) => {
        res.send({ games })
    }, (e) => {
        res.status(400).send(e);
    });
});
// GET/games/id
app.get('/games/:name', (req, res) => {
    var name = req.params.name;
    //id is valid or not
    if (!ObjectId.isValid(name)) {
        console.log("kind")
        return res.status(404).send();
    }
    // check for data existing data for id requested
    Games.findOne({
        _id: name
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();//data not found
        }
        res.status(200).send({ todo });//data found
    }).catch((e) => {
        res.status(404).send('Error data not found');
    });
});

// DELETE request for deleting todo with id given
app.delete('/games/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.status(404).send('iNVALID ID ');
    }
    Games.findOneAndRemove({
        _creator: req.user._id,
        _id: id
    }).then((todo) => {
        if (!data) {
            return res.status(404).send('todo not found');
        }
        res.status(200).send({ todo });
    }).catch((e) => {
        res.status(404).send(e);
    });
});

// updating existing todo with pacth request with id
app.patch('/games/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Games.findOneAndUpdate({
        _creator: req.user._id,
        _id: id
    }, { $set: body }, { new: true }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

