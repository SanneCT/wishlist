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
    console.log('BRUKER', username)

    const bruker = await User.findOne({ username: username}) ;
    const wishes = bruker.wishes;
    console.log("\n\n\n",bruker,"/n/n/n")
    console.log(wishes)
    
    
    res.render('sorted', { wishes, username });

}


const deleteWish = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            message: 'Invalid wish ID'
        });
    }

    try {
        const wish = await User.findOneAndUpdate(
            { 'wishes._id': id },
            { $pull: { wishes: { _id: id } } },
            { new: true }
        );

        if (!wish) {
            return res.status(404).json({
                message: 'Wish not found'
            });
        }

        res.status(200).json(wish);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err.message
        });
    }
};


module.exports = { addWish, deleteWish, filter }