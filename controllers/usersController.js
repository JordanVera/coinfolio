const db = require('../models');

module.exports = {
    findAll: function(req, res) {
        db.User
          .find(req.query)
          .sort({ date: -1 })
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
    updatePortfolio: function(req, res) {
        const uid = req.params.id;
        //console.log(req.params.id)
        const coin = {
            ticker: req.body.ticker,
            shares: req.body.shares,
            buyPrice: req.body.buyPrice
        }
        db.User
          .findOneAndUpdate({uid: uid}, {$push: { portfolio: coin}})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
    displayPortfolio: function(req, res) {
        const uid = req.params.id;
        //console.log(req.body)
        db.User
          .find({uid: uid})
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
    authUser: function(req, res) {
        //console.log(req.body.uid);
        // check if the user exists in the db
        db.User.find({uid:req.body.uid})
            .then((results) => {
                //console.log(results);
                if(results.length > 0){
                    //console.log("Found user")
                      return res.json(results[0]);
                } else {
                    //console.log("Making new User")
                    db.User.create({
                        uid: req.body.uid
                    })
                    .then(results => {
                        return res.json(results);
                    })
                }
            })
            .catch(err => {
                console.log(err);
                 return res.json({error: err});
            });
    }
}