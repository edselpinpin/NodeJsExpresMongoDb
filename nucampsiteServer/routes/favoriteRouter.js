const express = require('express');
const favoriteRouter = express.Router();
const Favorite  = require('../models/favorite');
const authenticate = require('../authenticate');
const cors = require('./cors');
const favorite = require('../models/favorite');
const { response } = require('express');

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req, res, next) => {
    console.log({user: req.user._id})
    Favorite.find({user: req.user._id})
     .populate('user')
     .populate('campsites')
    //.populate('user')
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})

.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findOne({user: req.user._id })  
      .then(favorite => { 
           if(favorite) {
                req.body.forEach((campsite) => {
                    if (!favorite.campsites.includes(campsite._id)) {
                        favorite.campsites.push(campsite);
                       
                    }
                }); 
                favorite.save() 
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                })   
                .catch(err => next(err));

             }  

            else 
            {
                Favorite.create({user: req.user._id})
                .then(favorite => {
                    req.body.forEach((campsite) => {  
                        if (!favorite.campsites.includes(campsite._id)) {
                            favorite.campsites.push(campsite);
                        }
                    });
                      favorite.save() 
                     .then(favorite => {
                        res.statusCode = 200;
                         res.setHeader('Content-Type', 'application/json');
                         res.json(favorite); 
                      }) 
                      .catch(err => next(err));
                })
            }
        })  
        .catch(err => next(err));

})     

.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Favorite.findOneAndDelete({user: req.user._id })
   // Favorite.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});



favoriteRouter.route('/:campsiteId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))

.get(cors.cors, authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end("GET operation not supported on /favorite/:campsiteId");
})


.post(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    console.log(req.body)
   //Favorite.findOne({campsites: req.campisites._id })  
    Favorite.findOne({user: req.user._id})  
    
    .then(favorite => { 
         if(favorite) {
              req.body.forEach((campsite) => { 
                    if (!favorite.campsites.includes(campsite._id)) {
                       favorite.campsites.push(campsite); 
                        favorite.save() 
                        .then(favorite => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(favorite);
                            })   
                            .catch(err => next(err)); 
                    } 
                    else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.end('The campsite is already in the list of favorites')
                    } 
             });    
               
            } 
            else {
                 Favorite.create({user: req.user._id, campistes: [req.params.campsiteId]})
                 .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(favorite);
                 })
                 .catch(err => next(err)); 
            }
        })        
         
})
.put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
    Favorite.findByIdAndUpdate(req.params.campsiteId, {
        $set: req.body
    }, { new: true })
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(favorite);
    })
    .catch(err => next(err));
})

.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
     let idx;
     Favorite.findOne({user: req.user._id})
    .then(favorite  => {
         if (response) {
             idx = favorite.campsites.indexOf(req.params.campsiteId)
         };
         if (idx >= 0) {
               favorite.campsites.splice(idx, 1);

         }
         favorite.save()
         .then(response => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(response);           
         })
         .catch(err => next(err));  
     })
     .catch(err => next(err));  
});
module.exports =  favoriteRouter;