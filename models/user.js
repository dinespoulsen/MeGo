import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
        name: String,
        avatarFileName: String,
        memories : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Memory' }],
        goals : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }]
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
  },
  {timestamps: true}
);

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
