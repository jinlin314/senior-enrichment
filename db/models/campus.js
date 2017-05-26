'use strict';
var Sequelize = require('sequelize');
var db = require('../index.js');
var Student = require('./student');

module.exports = db.define('campus', {
    name: Sequelize.STRING,
    imgUrl: Sequelize.STRING,
},{
    hooks:{
        beforeDestroy:function(){
            console.log(">>>is hook invoked?")
            Student.destroy({
                where:{
                    campusId: this.id
                }
            })
                .catch(console.error);
        }
    }
});