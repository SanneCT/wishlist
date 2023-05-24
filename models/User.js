const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const minpasslength = 7;

const Schema = mongoose.Schema;

const userschema = new Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [minpasslength, `Passordet ditt må være minst ${minpasslength} karakterer langt`]
    }
})

// This method registers a new function to be called before
// any save method is called on the model.
userschema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// This methodis always called after the save method is completed
userschema.post('save', async function (doc, next) {

    next();
});

// The login method will be registered to the User model
// Static methods are methods that behave exactly the same on all
// Objects.
userschema.statics.login = async function (username, password) {
    const user = await this.findOne({ username });
    if (user) {
        console.log('found user', user.password)
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
    }
    throw Error('Credentials could not be validated');
}



// Finally we create and export the User model by passing the userschema and
// the name of proposed database to the mongoose.model method and store the
// result in the User variable.

module.exports = mongoose.model('user', userschema);
