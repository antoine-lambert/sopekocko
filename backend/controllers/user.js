const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { error } = require('console');

exports.signup = (req, res, next) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const pass = req.body.password;
  if (pass.match(regex)) {
  bcrypt.hash(pass, 10)
  .then(hash => {
      const user = new User({
          email: req.body.email,
          password: hash
      });
      user.save()
      .then(() => res.status(201).json({ message: 'utilisateur créé !'}))
      .catch(error => res.status(500).json({ error })); 
  })
  .catch(error => res.status(400).json({  error})); 
  } else {
       throw new Error("Le mot de passe n'est pas assez sécurisé");
  }
  
}
exports.login = (req, res, next) => {
   User.findOne({ email: req.body.email })
   .then(user => {
       if (!user) {
           return res.status(401).json({ error: 'Utilisateur non trouvé'});
       }
       bcrypt.compare(req.body.password, user.password)
       .then(valid => {
           if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect'});
           }
           res.status(200).json({
               userId: user.id,
               token: jwt.sign(
                   { userId: user._id },
                   'RANDOM_TOKEN_SECRET',
                   { expiresIn: '24h' }
               )
           });
       })
       .catch(error => res.status(500).json({ error }))
    })
   .catch(error => res.status(500).json({ error }))
};