import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = mongoose.model('User');

// Get All Users
module.exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.staus(500).json({message: 'Error' + err });
      return;
    }
    res.status(201).json(users);
  })
}

// Get User By Id
module.exports.getUser = (req, res) => {
  User.findById({_id: req.params.id}, (err, user) => {
    if (err) {
        res.status(500).json({message: `Error ${err}`});
    }
    res.status(201).json(user);
  })
}

// User Login
module.exports.login = (req, res) => {
  User.findOne({email:req.body.email}, (err, user) => {
    if (err) {
      res.status(500).json({message: `Error ${err}`});
      return;
    }
    if (!user) {
      res.status(401).json({message: 'Invalid Email or password'});
      return;
    }
    bcrypt.compare(req.body.password, user.password, (err, response) => {
      if (err) {
        res.status(500).json({message: `Error ${err}`});
        return;
      }
      if (user.email === req.body.email && response) {
        const token = jwt.sign({id: user._id }, process.env.SECRET);
        res.json({token});
      } else {
        res.status(401).json({message: 'Invalid Email or password'});
      }
    })
  });
}

// Register User
module.exports.registerUser = (req, res) => {
  if (!req.body.displayName) {
    res.status(400).json({message: 'Enter a Display name'});
    return;
  }

  if (!req.body.email) {
    res.status(400).json({message: 'Enter a Display name'});
    return;
  }
  if (!req.body.password) {
    res.status(400).json({message: 'Enter a Display name'});
    return;
  }

  const user = new User({
    displayName: req.body.displayName,
    email: req.body.email,
    password: req.body.password
  });

  // Encrypt password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(user.password, salt);
  user.password = hash;

  user.save((err) => {
    if (err) {
      res.status(500).json({message: 'Error: ' + err});
      return;
    }
    res.status(201).json({messasge: 'Added User ' + req.body.displayName});
  });
}

// Update User
module.exports.editUser = (req, res) => {
  User.update({_id: req.params.id}, req.body, (err, user) => {
    if (err) {
      res.status(500).json({messasge: `Error ${err}`});
    }
    res.status(201).json({message: `Updated user: ${req.body}`});
  })
}

// Delete User
module.exports.deleteUser = (req, res) => {
  User.remove({_id: req.params.id}, (err, user) => {
    if (err) {
      res.status(500).json({message: `Error ${err}`});
      return;
    }
    res.status(201).json({message: `Removed User: ${req.params.id}`})
  })
}
