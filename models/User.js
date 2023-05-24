const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const minpasslength = 7;

const Schema = mongoose.Schema;

const wishSchema = new Schema({
    wish: {
        type: String,
        required: true,
    },

}, { timestamps: true });

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
    },
    wishes: [wishSchema],
});


userschema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



userschema.post('save', async function (doc, next) {

    next();
});

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


module.exports = mongoose.model('user', userschema);
