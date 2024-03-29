const { Schema, model, Types } = require('mongoose');


const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'Username required'],
            trim: true
        },
        email: {
            type: String,
            unique: true,
            match: [/.+\@.+\..+/, 'Valid Email required!']
        },
        thoughts: [
            {
                type: Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                friendId:
                {
                    type: Types.ObjectId,
                    ref: 'User'
                }
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
