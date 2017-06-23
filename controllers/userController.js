import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../repositories/UserRepository';

const User = mongoose.model('User');

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

  UserRepository.save(user).subscribe((user) => {
    res.status(200).json({message: `Added User ${req.body.displayName}`});
  }, err => {
    res.status(500).json({message: `Error ${err}`});
  });
}

// User Login
module.exports.login = (req, res) => {

  UserRepository.findOne(req.params.email, req.body).subscribe((user) => {
    if (!user) {
      res.status(401).json({message: 'Invalid Email or password'});
    }
    bcrypt.compare(req.body.password, user.password, (err, response) =>{
      if (err) {
        res.status(500).json({message: `Error ${err}`});
      }
      if (user.email == req.body.email && response) {
        const token = jwt.sign({email: req.body.email}, process.env.SECRET);
        res.status(200).json(token);
      } else {
        res.status(401).json({message: 'Invalid Email or password'});
      }
    })
  });
}


// Get All Users
module.exports.getUsers = (req, res) => {
  UserRepository.find({}).subscribe((users) => {
    res.status(201).json(users);
  }, err => {
    res.status(500).json({message: `Error ${err}`});
  })
}

// Get User By Id
module.exports.getUser = (req, res) => {
  UserRepository.findById(req.params.id).subscribe((user) => {
    res.status(200).json(user)
  }, err => {
    res.status(500).json({message: `Error ${err}`});
  })
}


// Update User
module.exports.editUser = (req, res) => {
  UserRepository.update(req.params.id, req.body).subscribe((user) => {
    res.status(201).json({message: `Updated user: ${req.params.id}`});
  }, err => {
    res.status(500).json({messasge: `Error ${err}`});
  })
}

// Delete User
module.exports.deleteUser = (req, res) => {
  UserRepository.delete(req.params.id).subscribe((user) => {
    res.status(201).json({message: `Removed User: ${req.params.id}`});
  }, err => {
    res.status(500).json({message: `Error ${err}`});
  })
}
