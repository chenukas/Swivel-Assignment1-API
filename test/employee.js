process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const Employee = require('../models/employee.model');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

describe('Employees', () => {
    beforeEach((done) => {
        //Before each test we empty the database
        Employee.remove({}, (err) => {
            done();
        });
    });
});

/*
* /GET/ route
* /employees
*/
describe('GET employees', () => {
    it('it should GET all the employees', (done) => {
        chai.request(server)
        .get('/employees').end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        done();
        });
    });
})

/*
* /POST/ route
* /employees
*/
describe('/POST employee', () => {
    it('it should not POST an employee without email', (done) => {
        let employee = {
            first_name: "Abella",
            last_name: "Wilson",
            number: "+94777777777",
            gender: "F"
        }
        chai.request(server)
        .post('/employees')
        .send(employee)
        .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error').eql('\"email\" is required');
        });
        done();
    });
})

/*
* /POST/ route
* /employees
*/
describe('/POST employee',() => {
    it('it should POST an employee', (done) => {
        let employee = {
            first_name: "Jonathan",
            last_name: "Parker",
            email: "jonathanparker@gmail.com",
            number: "+94777777555",
            gender: "M"
        }
        chai.request(server)
        .post('/employees')
        .send(employee)
        .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.have.property('_id');
        });
        done();
    })
})

/*
* /PUT/:id route
* /employees/:id
*/
describe('/PUT/:id employee', () => {
    it('it should UPDATE an employee given the id', (done) => {
        let employee = new Employee({
            first_name: "Jonathan",
            last_name: "Parker",
            email: "jonathanparker@gmail.com",
            number: "+94777777555",
            gender: "M",
            id: 1,
            photo: "https://randomuser.me/api/portraits/men/48.jpg"
        })
        employee.save((err, employee) => {
              chai.request(server)
              .put('/employees/' + employee._id)
              .send({
                first_name: "JonathanEd",
                last_name: "ParkerEd",
                email: "jonathanparkered@gmail.com",
                number: "+94777777555",
                gender: "M"
            })
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('_id');
                done();
              });
        });
    });
});

/*
* /DELETE/:id route
* /employees/:id
*/
describe('/DELETE/:id book', () => {
    it('it should DELETE an employee given the id', (done) => {
        let employee = new Employee({
            first_name: "Jonathan",
            last_name: "Parker",
            email: "jonathanparker@gmail.com",
            number: "+94777777555",
            gender: "M",
            id: 1,
            photo: "https://randomuser.me/api/portraits/men/48.jpg"
        })
        employee.save((err, employee) => {
              chai.request(server)
              .delete('/employees/' + employee._id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.data.should.have.property('_id');
                done();
              });
        });
    });
});