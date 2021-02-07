const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require("mysql");
const consoleTable = require("console.table");

const roleArray = [];
const managerArray = [];

const connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: "Dre525252",
    database: "employee_trackerDB"

});

const PORT = process.env.PORT || 8080;

connection.connect(function(err){
    if (err) throw err;
    startApp();
})


function startApp(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'choices',
            message: 'What would you like to do?',
            choices: [
                "View all Employees",
                "View Employees By Department",
                "View Employees By Role",
                "Update Employee",
                "Add Role",
                "Add Department",
            ]
        }
            ]).then(function(response){
            switch (response.choice){
                case "View All Employees":
                    allEmployees();
                break; 

                case "View Employees By Department":
                    employeeDepartment();
                break;

                case "View Employees By Role":
                    employeeRole();
                break;

                case "Update Employee":
                    updateEmployee();
                break;

                case "Add Employee":
                    addEmployee()();
                break;

                case "Add Role":
                    addRole();
                break;

                case "Add Department":
                    addDepartment();
                break;
            }
        })
}

function allEmployees(){
    connection.query
}

function employeeDepartment(){
    connection.query
}

function employeeRole(){
    connection.query
}

function updateEmployee(){
    connection.query
}

function addEmployee(){
    connection.query
}

function addDepartment(){
    connection.query
}

//

function chooseRole(){
    connection.query("SELECT * FROM role", function(err, res){
        if (err) throw err;
        for (var i=0; i < res.length; i++){
            roleArray.push(res[i].role)
        }
    })
} return roleArray;

function chooseManager(){
    connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res){
        if (err) throw err;
        for (var i=0; i < res.length; i++){
            managerArray.push(res[i].first_name,last_name)
        }
    })
} return managerArray;

function employeePrompt(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: 'What is the first name of the employee?',
        },
        {
            type: 'input',
            name: 'lastName',
            message: 'What is the last name of the employee?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the employees role?',
            choices: chooseRole()
        },
        {
            type: 'rawlist',
            name: 'managerChoice',
            message: 'Who is their manager?',
            choices: chooseManager()
        },
    ]).then(function(response){
        var roleValue = chooseRole();
        var managerChoiceValue = chooseManager();
        connection.query,
        {
            firstName: response.firstName,
            lastName: response.lastName,
            role: roleValue,
            managerChoice: managerChoiceValue,
        }, function(error){
            if (error) throw console.error();
            console.table(response);
            startApp();
        }
    })
}    
employeePrompt();

function addRole(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the employee?',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the employee?',
        },
    ]).then(function(response){
        connection.query("INSERT INTO department SET ?")
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'dep_name',
            message: 'What is the name of the department?',
        },
    ]).then(function(response){
        connection.query("INSERT INTO role SET ?")
    })
}

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);

