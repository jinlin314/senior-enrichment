const Promise = require('bluebird');
const db = require('./db');
const User = require('./db/models/user');
const Campus = require('./db/models/campus');
const Student = require('./db/models/student');

const data = {
    user: [
        {name: "JinLin", email: "jinlin314@hotmail.com" },
        {name: "admin", email: "admin@super.com" }
    ],
    student: [
        {name: "Jin Lin", email: "jinlin314@hotmail.com", campus: {name: "Terra", imgUrl: ""}},
        {name: "YiLing Jiang", email: "yilingjiang@hotmail.com", campus: {name: "Luna", imgUrl: ""}},
        {name: "Jing Wang", email: "jingwang@hotmail.com", campus: {name: "Mars", imgUrl: ""}},
        {name: "Karen Dan", email: "karendan@hotmail.com", campus: {name: "Titan", imgUrl: ""}}
    ],
};

db.sync({force: true})
    .then(function () {
        console.log("Dropped old data, now inserting data");
        const creatingStudent = data.student.map(function (student) {
            return Student.create(student, { include: [Campus] });
        });
        const creatingUsers = data.user.map(function (user) {
            return User.create(user);
        });
        return Promise.all([creatingStudent, creatingUsers]);
    })
    .then(function () {
        console.log("Finished inserting data (press ctrl-c to exit)");
    })
    .catch(function (err) {
        console.error('There was totally a problem', err, err.stack);
    });