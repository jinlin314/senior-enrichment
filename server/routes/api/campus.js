'use strict'
const campusRouter = require('express').Router();
const Campus = require('../../../db/models/campus');

campusRouter.get('/', (req, res, next) => {
    Campus.findAll()
        .then(campuses => res.status(200).send({allCampuses: campuses}))
        .catch(next);
});

campusRouter.get('/:campusId', (req, res, next) => {
    var campusId = parseInt(req.params.campusId);

    if (!campusId){
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Campus.findById(campusId)
        .then(campus => {
            if (!campus){
                var err = new Error("Campus not found");
                err.status = 404;
                next(err);
            }else{
                res.status(200).send({foundCampus: campus});
            }
        })
        .catch(next);
});

campusRouter.post('/', (req, res, next) => {
    var name = req.body.name;
    var imgUrl = req.body.imgUrl;

    Campus.findOrCreate({
        where: {
            name: name,
            imgUrl: imgUrl
        }
    })
        .then(results => {
            var campus = results[0];
            var created = results[1];

            if (!created){
                var err = new Error("Campus already existed");
                err.status = 401;
                next(err);
            }else{
                res.status(201).send(campus);
            }
        })
        .catch(next);
});

campusRouter.put('/:campusId', (req, res, next) => {
    var campusId = parseInt(req.params.campusId);
    var name = req.body.name;
    var imgUrl = req.body.imgUrl;

    if (!campusId){
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Campus.findById(campusId)
        .then(campus => {
            if (!campus){
                var err = new Error("Campus not found");
                err.status = 404;
                next(err);
            }else{
                if (name){
                    campus.name = name;
                }
                if (imgUrl){
                    campus.imgUrl = imgUrl;
                }
                campus.save()
                    .then(updatedCampus => res.status(204).send({updatedCampus: campus}))
            }
        })
        .catch(next);
});

campusRouter.delete('/:campusId', (req, res, next) => {
    var campusId = parseInt(req.params.campusId);

    if (!campusId){
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Campus.findById(campusId)
        .then(campus => {
            if (!campus){
                var err = new Error("Campus not found");
                err.status = 404;
                next(err);
            }else{
                return Campus.destroy({
                    where: {
                        id: campusId
                    }
                })
                    .then(() => {
                        res.status(204).send("delete Success");
                    })
            }
        })
        .catch(next);
});


module.exports = campusRouter