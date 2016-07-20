var mongoose = require('mongoose');

var groupeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

var Groupe = {
    model: mongoose.model('Groupe', groupeSchema),

    findAll: function(req, res) {
        Groupe.model.find()
            .populate('users')
            .exec(function(err, groupes) {
                if (err) {
                    console.log(err);
                }
                res.json(groupes);
            });
    },
    findById: function(req, res) {
        Groupe.model.findById(
                req.params.id, {
                    password: 0
                })
            .populate('users')
            .exec(function(err, groupe) {
                res.json(groupe);
            });
    },
    create: function(req, res) {
        Groupe.model.create(req.body,
            function(err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).send(err.message);
                } else {
                    console.log(data);
                    Groupe.addUserToGroupFromCreate(data._id, req.params.user_id, res);
                }
            });
    },
    update: function(req, res) {
        Groupe.model.update({
            _id: req.params.id
        }, req.body, function(err, groupe) {
            console.log(groupe);
            if (err)
                res.status(500).send(err.message);
            res.json(groupe);
        });
    },

    delete: function(req, res) {
        Groupe.model.findByIdAndRemove(req.params.id, function(err) {
            if (err)
                res.status(500).send(err.message);
            else
              res.sendStatus(200);
        });
    },
    addUserToGroupFromCreate: function(group_id, user_id, res) {
        Groupe.model.findByIdAndUpdate(group_id, {
                $push: {
                    users: user_id
                }
            },
            function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.sendStatus(200);
                }
            });
    },
    addUserToGroup: function(req, res) {
        Groupe.model.findByIdAndUpdate(req.params.group_id, {
                $push: {
                    users: req.params.user_id
                }
            },
            function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.sendStatus(200);
                }
            });
    },
    removeUserFromGroup: function(req, res) {
        Groupe.model.findByIdAndUpdate(req.params.group_id, {
                $pull: {
                    users: req.params.user_id
                }
            },
            function(err) {
                if (err) {
                    res.send(err);
                } else {
                    res.sendStatus(200);
                }
            });
    },
};


module.exports = Groupe;
