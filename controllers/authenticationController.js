const User = require("../models/User");
const jwt = require("jsonwebtoken");
const maxAge = 3 * 24 * 60 * 60;


//handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { username: "", password: "" };

  //ikke riktig brukernavn eller ikke riktig passord
  if (err.message === 'Credentials could not be validated') {
    errors.username = 'Feil brukernavn eller passord!'
  }

  //duplicate error code
  if (err.code === 11000) {
    errors.username = "Brukernavnet er allerede tatt";
    return errors;
  }

  //validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWTSECRET, {
    expiresIn: maxAge,
  });
};


const createuser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.create({ username, password });
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({username:user.username, user:user._id});
    console.log('user created');

  } catch (err) {
    
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.login(username, password);
    const token = createToken(user._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({username:user.username, user:user._id});
    console.log('user logged inn');

  } catch (err) {

    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};



module.exports = { createuser, loginUser, };