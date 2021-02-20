const express = require('express');
const promotionsRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

const Promotion = require('../models/promotion');


promotionsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200))
.get(cors.cors, (req, res, next) => {
    Promotion.find()
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Promotion.create(req.body)
    .then(promotion => {
        console.log('Promotion Created ', promotion);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promotion);
    })
    .catch(err => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /campsites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotion.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});


promotionsRouter.route('/:promotionsId')
.options(cors.corsWithOptions, (req, res) => res.sendStatus(200)) 
.get(cors.cors, (req, res, next) => {
    Promotion.findById(req.params.promotionsId)
    .then(promtion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promtion);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, (req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /campsites/${req.params.promotionsId}`);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin,(req, res, next) => {
    Promotion.findByIdAndUpdate(req.params.promotionsId, {
        $set: req.body
    }, { new: true })
    .then(promotion => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(promtion);
    })
    .catch(err => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser,  authenticate.verifyAdmin, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionsId)
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    })
    .catch(err => next(err));
});

module.exports = promotionsRouter;
