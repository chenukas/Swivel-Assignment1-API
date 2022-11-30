const Employee = require('../models/employee.model');


//get all employees from database
const getAllEmployees = async () => await Employee.find({});

//add new employee to the database
const createNewEmployee = async (emp) => {

    const lastEmployee = await Employee.findOne().sort({ _id: -1 });
    const imageId = Math.floor(Math.random() * (99-0+1) + 0);

    emp.id = lastEmployee.id + 1;

    if (emp.gender == 'M') {
        emp.photo = `https://randomuser.me/api/portraits/men/${imageId}.jpg`
    } else if (emp.gender == 'F') {
        emp.photo = `https://randomuser.me/api/portraits/women/${imageId}.jpg` 
    }

    const employee = new Employee(emp);
    const result = await employee.save();

    return result;
};

//edit an employee
const editAnEmployee = async (id, emp) => {
    const email = emp.email;

    const isEmailExist = await Employee.findOne({ email });

    if (isEmailExist && isEmailExist._id != id) {
        return -1;
    }

    const imageId = Math.floor(Math.random() * (99-0+1) + 0);

    if (emp.gender == 'M') {
        emp.photo = `https://randomuser.me/api/portraits/men/${imageId}.jpg`
    } else if (emp.gender == 'F') {
        emp.photo = `https://randomuser.me/api/portraits/women/${imageId}.jpg` 
    }

    const result = await Employee.findByIdAndUpdate(id, emp, { new:  true });

    return result;
}

//delete an employee from the database
const deleteAnEmployee = async (id) => {
    const result = await Employee.findByIdAndDelete(id);

    return result;
}

module.exports = {
    getAllEmployees,
    createNewEmployee,
    editAnEmployee,
    deleteAnEmployee
}