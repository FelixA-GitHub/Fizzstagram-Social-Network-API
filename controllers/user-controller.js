const { User } = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get user by id
    getUserById(req, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // createUser
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // update User by id
    updateUser({ params, body }, res) {
        //runValidators: true? We need to include this explicit setting when updating data so that it knows to validate any new information.
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },


    // delete User by id
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    // add Friend to user
    addFriendToUser({ params }, res) {
        User.findOneAndUpdate({ _id: params.id, friends: { $new: params.friendId }},{ $push: { friends: params.friendId }},{ new: true, unique: true })
        .then(dbUserData => res.json(dbUserData, { message: 'New friend added!'}))
        .catch(err => res.json(err));
    },
    
    // delete Friend from user
    deleteFriendToUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id },{ $pull: { friends: params.friendId }},{ new: true })
            .then(dbUserData => res.json(dbUserData, { message: 'Friend deleted!'}))
            .catch(err => res.json(err));
    }
};

module.exports = userController;