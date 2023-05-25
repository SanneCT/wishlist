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


const test = async (req, res) => {
    const { up, id } = req.body;
    console.log(up);
    console.log(id);

    let wishes = res.locals.user.wishes;
    let i = 0;

    switch (up) {
        case '+':
            console.log('det var opp');
            i = 0;

            while (i < wishes.length) {
                const wish = wishes[i];
                if (id == wish._id) {

                    let index = wishes.indexOf(wish);
                    const newIndex = index - 1;

                    const temp = wishes[index];
                    wishes[index] = wishes[newIndex];
                    wishes[newIndex] = temp;

                    console.log('NYE WISHES', wishes);
                } i++;
            }
            try {
                const document = await User.findOneAndUpdate(
                    { _id: res.locals.user._id },
                    { wishes },
                );

                console.log('DOKUMENT', document);
                res.status(200).json({ document });

            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            break;

        case '-':
            console.log('det var ned');
            i = 0;
            while (i < wishes.length) {
                const wish = wishes[i];
                if (id == wish._id) {
                    let index = wishes.indexOf(wish);
                    if (index < wishes.length - 1) { //lengden på array starter på 1 men array starter på null. når en array har en lengde er det antall felt i arrayen
                        const temp = wishes[index];
                        wishes[index] = wishes[index + 1];
                        wishes[index + 1] = temp;

                        console.log('NYE WISHES', wishes);
                    }
                    break;
                }
                i++;
            }
            try {
                const document2 = await User.findOneAndUpdate(
                    { _id: res.locals.user._id },
                    { wishes },
                );

                console.log('DOKUMENT', document2);
                res.status(200).json({ document2 });

            } catch (error) {
                res.status(400).json({ error: error.message })
            }
            break;
        default:
            break;
    }
};


const filter = async (req, res, next) => {
    const { username } = req.params;

    const bruker = await User.findOne({ username: username });
    const wishes = bruker.wishes;


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


module.exports = { addWish, deleteWish, filter, test, }