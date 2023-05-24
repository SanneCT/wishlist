const User = require('../models/User');
const mongoose = require('mongoose');

const addWish = async (req, res) => {

    const { name, author } = req.body;

    try {
        const user = await User.findOneAndUpdate({ username: author }, { "$push": { "wishes": { "wish": name } } });

        res.status(200).json({ user });

    } catch (err) {
        console.log(err)

    };
};



const filter = async (req, res, next) => {
    const { username } = req.params;

    const bruker = await User.find({ username: username}).sort({createdAt: -1}) ;
    const wishes = bruker[0].wishes;
    console.log(wishes)
    console.log(username)
    
    res.render('sorted', { wishes, username });

}


module.exports = { addWish, filter}