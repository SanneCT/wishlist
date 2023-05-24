const User = require('../models/User');
const mongoose = require('mongoose');

const addWish = async (req, res) => {

    const { name, author } = req.body;

    try {
        const user = await User.findOneAndUpdate({ username: author }, { "$push": { "wishes": { "wish": name } } });

        res.status(200).json({ user });

    } catch (err) {
        // const errors = handleErrors(err);
        // res.status(400).json({ errors });
        console.log(err)

    };
};

module.exports = { addWish, }