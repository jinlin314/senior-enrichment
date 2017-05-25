'use strict'
const studentRouter = require('express').Router();
const Student = require('../../../db/models/student');
const Campus = require('../../../db/models/campus');

studentRouter.get('/', (req, res, next) => {
    Student.findAll()
        .then(students => res.status(200).send({allStudents: students}))
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
                res.status(200).send({foundStudent: student});
            }
        })
        .catch(next);
});

studentRouter.post('/', (req, res, next) => {
    var name = req.body.name;
    var email = req.body.email;
    var campusId = req.body.campus;//send campus id through select options

    Campus.findById(campusId)
        .then(campus => {
            return Student.findOrCreate({
                where: {
                    name: name,
                    email: email,
                }
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
    var campus = req.body.campus; // through select options

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
                    .then(updatedStudent => res.status(204).send({updatedStudent: student}))
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
                    .then(() => {
                        res.status(204).send("delete Success");
                    })
            }
        })
        .catch(next);
});

module.exports = studentRouter