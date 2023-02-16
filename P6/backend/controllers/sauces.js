const fs = require('fs');
const Sauces = require('../models/Sauces');


exports.createSauces = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce)
  delete saucesObject._id
  const sauces = new Sauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  
  sauces.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
       message : error
      })
    }
  )
}

exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id
  }).then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifySauces = (req, res, next) => {
  const saucesObject = req.file 
    ? {
      ...JSON.parse(req.body.sauces), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    : {...req.body}
    Sauces.updateOne({_id: req.params.id}, {...saucesObject, _id: req.params.id}).then(
    () => {
      res.status(201).json({
        message: 'Sauce updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id }).then(
        (sauces) => {
            if (!sauces) {
                console.log("error, no 'sauce' have been returned");
                res.status(404).json({
                    error: new Error('No such Sauce!')
                });
            }
            else if (sauces.userId !== req.auth.userId) {
                console.log("error, userId doesn't match\nsauces.userId: "+sauces.userId+" --- req.auth.userId: "+req.auth.userId);
                res.status(400).json({
                    error: new Error('Unauthorized request!')
                });
            }
            else{
                console.log("La sauce a été delete\nsauces.userId: "+sauces.userId+" --- req.auth.userId: "+req.auth.userId);
                const filename = sauces.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                  Sauces.deleteOne({ _id: req.params.id })
                    .then(
                        () => {
                            res.status(200).json({
                                message: 'Deleted!'
                            });
                        }
                    ).catch(
                        (error) => {
                            res.status(400).json({
                                error: error
                            });
                        }
                    );
                })
            }
        }
    )
};

exports.getAllSauces = (req, res, next) => {
  console.log("Toutes les sauces");
  Sauces.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};

exports.likeSauces = (req, res, next) => {
  const like = req.body.like;
  const userId = req.body.userId;
  usersLiked =[];
  usersDisliked = [];

  if (!like === 1 || !like === 0 || !like === -1 ){
    return res.status(400).json({
      error: error
    });
  
  } else if (like === 1){
    usersLiked.push(userId)
    console.log(usersLiked)
    console.log(like)
  
  } else if (like === -1){
    usersDisliked.push(userId)
    console.log(usersDisliked)
    console.log("nombre de dislike " + like)
  }
 
  
  console.log("Dans le controllers de la route likeSauce")
  
};