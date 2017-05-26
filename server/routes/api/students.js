'use strict'
const studentRouter = require('express').Router();
const Student = require('../../../db/models/student');
const Campus = require('../../../db/models/campus');

studentRouter.get('/', (req, res, next) => {
    Student.findAll()
        .then(students => res.send(students).status(200))
        .catch(next);
});

studentRouter.get('/:studentId', (req, res, next) => {
    var studentId = parseInt(req.params.studentId);

    if (!studentId){
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Student.findById(studentId)
        .then(student => {
            if (!student){
                var err = new Error("Student not found");
                err.status = 404;
                next(err);
            }else{
                res.status(200).send(student);
            }
        })
        .catch(next);
});

studentRouter.get('/:studentId', (req, res, next) => {
    var studentId = parseInt(req.params.studentId);

    if (!studentId){
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Student.findById(studentId)
        .then(student => {
            if (!student){
                var err = new Error("Student not found");
                err.status = 404;
                next(err);
            }else{
                res.status(200).send(student);
            }
        })
        .catch(next);
});


//route to add new student
studentRouter.post('/', (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var campusId = req.body.campusId;//send campus id through select options
    console.log("inside api/students routes: ", name, email, campusId);

    Campus.findById(campusId)
        .then(campus => {
            Student.findOrCreate({
                defaults: { name: name},
                where: { email: email }
            })
                .then(results => {
                    var student = results[0];
                    var created = results[1];

                    if (!created){
                        var err = new Error("Student already existed");
                        err.status = 401;
                        next(err);
                    }else{
                        student.setCampus(campusId);
                        res.status(201).send(student);
                    }
                })
        })
        .catch(next);
});


studentRouter.put('/:studentId', (req, res, next) => {
    var studentId = parseInt(req.params.studentId);

    var name = req.body.name;
    var email = req.body.email;
    var campusId = parseInt(req.body.campus); // through select options

    console.log("inside api/students/id put route: ", name, email, campusId);

    if (!studentId){
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Student.findById(studentId)
        .then(student => {

            console.log("found student: ", student);
            if (!student){
                var err = new Error("Student not found");
                err.status = 404;
                next(err);
            }else{
                if (name){
                    student.name = name;
                }
                if (email){
                    student.email = email;
                }
                if (campusId){
                    student.setCampus(campusId);
                }
                student.save()
                    .then(updatedStudent => {
                        console.log("updated student: ", updatedStudent);
                        res.status(204).send(updatedStudent)
                    })
            }
        })
        .catch(next);
});


studentRouter.delete('/:studentId', (req, res, next) => {
    var studentId = parseInt(req.params.studentId);

    if (!studentId) {
        var err = new Error("Not a valid id");
        err.status = 500;
        next(err);
    }

    Student.findById(studentId)
        .then(student => {
            if (!student) {
                var err = new Error("student not found");
                err.status = 404;
                next(err);
            } else {
                return Student.destroy({
                    where: {
                        id: studentId
                    }
                })
                    .then((sutdent) => {
                        res.status(204).send(student.name);
                    })
            }
        })
        .catch(next);
});

studentRouter.delete('/all/:campusId', (req, res, next) => {

    var campusId = req.params.campusId;
    console.log("inside api/students/all/campusId delete routes: ", campusId);

    Campus.findById(campusId)
        .then(campus => {
            if (!campus){
                var err = new Error("Campus not exist");
                err.status = 404;
                next(err);
            }else {
                Student.destroy({
                    where: {campusId: campusId}
                })
                    .then(() => res.status(200).send("deleted"))
            }
        })
        .catch(next);
});

module.exports = studentRouter