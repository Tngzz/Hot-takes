const fs = require('fs');
const Thing = require('../models/Thing');

console.log("controller stuff");


exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing)
  delete thingObject._id
  const thing = new Thing({
    ...thingObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  
  thing.save().then(
    () => {
      res.status(201).json({
        message: 'Post saved successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      })
    }
  )
}

exports.getOneThing = (req, res, next) => {
  Thing.findOne({
    _id: req.params.id
  }).then(
    (thing) => {
      res.status(200).json(thing);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

exports.modifyThing = (req, res, next) => {
  const thingObject = req.file 
    ? {
      ...JSON.parse(req.body.thing), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    : {...req.body}
  // const thing = new Thing({
  //   _id: req.params.id,
  //   title: req.body.title,
  //   description: req.body.description,
  //   imageUrl: req.body.imageUrl,
  //   price: req.body.price,
  //   userId: req.body.userId
  // });
  Thing.updateOne({_id: req.params.id}, {...thingObject, _id: req.params.id}).then(
    () => {
      res.status(201).json({
        message: 'Thing updated successfully!'
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

exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id }).then(
        (thing) => {
            if (!thing) {
                console.log("error, no 'thing' have been returned");
                res.status(404).json({
                    error: new Error('No such Thing!')
                });
            }
            else if (thing.userId !== req.auth.userId) {
                console.log("error, userId doesn't match\nthing.userId: "+thing.userId+" --- req.auth.userId: "+req.auth.userId);
                res.status(400).json({
                    error: new Error('Unauthorized request!')
                });
            }
            else{
                console.log("oh heyn its good, it did match!\nthing.userId: "+thing.userId+" --- req.auth.userId: "+req.auth.userId);
                const filename = thing.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                  Thing.deleteOne({ _id: req.params.id })
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

exports.getAllStuff = (req, res, next) => {
  console.log("all stuff");
  Thing.find().then(
    (things) => {
      res.status(200).json(things);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};