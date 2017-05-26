'use strict'
const instructorRouter = require('express').Router();
const Instructor = require('../../../db/models/instructor');
const Campus = require('../../../db/models/campus');

instructorRouter.get('/', (req, res, next) => {
    Instructor.findAll()
        .then(instructors => res.status(200).send({allInstructors: instructors}))
        .catch(next);
});

instructorRouter.get('/:instructorId', (req, res, next) => {
    var instructorId = parseInt(req.params.instructorId);

    if (!instructorId){
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Instructor.findById(instructorId)
        .then(instructor => {
            if (!instructor){
                var err = new Error("Instructor not found");
                err.status = 404;
                next(err);
            }else{
                res.status(200).send({foundInstructor: instructor});
            }
        })
        .catch(next);
});

instructorRouter.post('/', (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var campusId = req.body.campus;//send campus id through select options

    Instructor.findById(instructorId)
        .then(instructor => {
            return Instructor.findOrCreate({
                where: {
                    name: name,
                    email: email,
                }
            })
                .then(results => {
                    var instructor = results[0];
                    var created = results[1];

                    if (!created){
                        var err = new Error("Instructor already existed");
                        err.status = 401;
                        next(err);
                    }else{
                        instructor.setInstructor(instructorId);
                        res.status(201).send(instructorId);
                    }
                })
        })
        .catch(next);
});


instructorRouter.put('/:instructorId', (req, res, next) => {
    var instructorId = parseInt(req.params.instructorId);
    var name = req.body.name;
    var email = req.body.email;
    var campusId = req.body.campus; // through select options

    if (!instructorId){
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Instructor.findById(studentId)
        .then(instructor => {
            if (!instructor){
                var err = new Error("Instructor not found");
                err.status = 404;
                next(err);
            }else{
                if (name){
                    instructor.name = name;
                }
                if (email){
                    instructor.email = email;
                }
                if (campusId){
                    instructor.setCampus(campusId);
                }
                instructor.save()
                    .then(updatedInstructor => res.status(204).send({upddatedInstructor: updatedInstructor}))
            }
        })
        .catch(next);
});


instructorRouter.delete('/:instructorId', (req, res, next) => {
    var instructorId = parseInt(req.params.instructorId);

    if (!instructorId) {
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Instructor.findById(instructorId)
        .then(instructor => {
            if (!instructorId) {
                var err = new Error("Instructor not found");
                err.status = 404;
                next(err);
            } else {
                return Instructor.destroy({
                    where: {
                        id: instructorId
                    }
                })
                    .then(() => {
                        res.status(204).send("delete Success");
                    })
            }
        })
        .catch(next);
});

module.exports = instructorRouter;