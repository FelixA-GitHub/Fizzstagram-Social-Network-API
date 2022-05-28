const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get Thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // createThought
    createThought({ body }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // update Thought by id
    updateThought({ params, body }, res) {
        //runValidators: true? We need to include this explicit setting when updating data so that it knows to validate any new information.
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },


    // delete Thought by id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
    // create reaction to thought
    createReactionToThought({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.id, reactions: { $new: params.reactionId } }, { $push: { reactions: params.reactionId } }, { new: true, unique: true })
            .then(dbThoughtData => res.json(dbThoughtData, { message: 'New reaction added!' }))
            .catch(err => res.json(err));
    },

    // delete reaction from thought
    deleteReactionToThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id }, { $pull: { reactions: params.reactionId } }, { new: true })
            .then(dbThoughtData => res.json(dbThoughtData, { message: 'reaction deleted!' }))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;