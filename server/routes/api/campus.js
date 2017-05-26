'use strict'
const campusRouter = require('express').Router();
const Campus = require('../../../db/models/campus');
const Student = require('../../../db/models/student');

campusRouter.get('/', (req, res, next) => {
    Campus.findAll()
        .then(campuses => {
            res.status(200).send(campuses);
            return campuses;
        })
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
                res.status(200).send(campus);
                return campus;
            }
        })
        .catch(next);
});

campusRouter.get('/:campusId/students', (req, res, next) => {
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
                Student.findAll({
                    where: {
                        campusId: campusId
                    }
                })
                    .then(students => {
                        res.send(students).status(200)
                    });

            }
        })
        .catch(next);
});



campusRouter.post('/', (req, res, next) => {
    var name = req.body.name;
    var imgUrl = req.body.imgUrl;

    console.log("inside campus post route: req.body = ", req.body);

    Campus.findOrCreate({
        where: {name: name},
        defaults: {imgUrl: imgUrl}
    })
        .then(results => {
            var campus = results[0];
            var created = results[1];
            // var campus = results;

            console.log("inside campus post route: createdCampus = ", campus.name);

            if (!created){
                var err = new Error("Campus already existed");
                err.status = 401;
                next(err);
            }else{
                res.status(201).send(campus);
                return campus;
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
                    .then(updatedCampus => {
                        res.status(204).send(updatedCampus);
                        return updatedCampus;
                    })
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
                        return campus;
                    })
            }
        })
        .catch(next);
});


module.exports = campusRouter;