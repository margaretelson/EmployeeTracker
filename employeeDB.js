const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util')
const mysql = require("mysql");
const consoleTable = require("console.table");

const roleArray = [];
const managerArray = [];


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Dre525252",
    database: "employee_trackerDB"

});

const PORT = process.env.PORT || 8080;

connection.connect(function(err){
    if (err) throw err;
    startApp();
})

getRoles();



async function startApp(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                "View all Employees",
                "View Employees By Department",
                "View Employees By Role",
                "Update Employee",
                "Add Employee",
                "Add Role",
                "Add Department",
                "Quit",
            ]
        }
    ]).then(function(res){
            switch (res.options){
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
                    addEmployee();
                break;

                case "Add Role":
                    addRole();
                break;

                case "Add Department":
                    addDepartment();
                break;

                default:
                    quit();
            }
        })
}

function allEmployees(){
    connection.query("SELECT employee.first_name, employee.last_name, title_role.title, title_role.salary, department.dep_name AS Manager FROM employee INNER JOIN title_role on title_role.id = employee.role_id INNER JOIN department on department.id = title_role.department_id left join employee e on employee.manager_id = e.id;"),
    function(err, res){
        if (err) throw err
        console.table(res)
        startApp();
    }
}

function employeeDepartment(){
    connection.query,
    function(err, res){
        if (err) throw err
        console.table(res)
        startApp();
    }
}

function employeeRole(){
    connection.query,
    function(err, res){
        if (err) throw err
        console.table(res)
        startApp();
    }
}

function updateEmployee(){
    connection.query,
    function(err, res){
        if (err) throw err
        console.table(res)
        startApp();
    }
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
            managerArray.push(res[i].first_name)
        }
    })
} return managerArray;

async function addEmployee(){
    var getTitles = getRoles();
    console.log(getTitles)
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
            choices: addRole
        },
        {
            type: 'rawlist',
            name: 'managerChoice',
            message: 'Who is their manager?',
            choices: chooseManager
        },
    ]).then(function(res){
        var roleValue = chooseRole();
        var managerChoiceValue = chooseManager();
        connection.query,
        {
            firstName: res.firstName,
            lastName: res.lastName,
            role: roleValue,
            managerChoice: managerChoiceValue,
        }, function(error){
            if (error) throw console.error();
            console.table(res);
            startApp();
        }
    })
}    
employeePrompt();

function getRoles(){
    var titles = []
    connection.query("SELECT title FROM title_role", function(err, res){
        for (let i = 0; i < res.length; i++){
            titles.push(res[i])
        } 
        return titles;
    })
}

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
    ]).then(function(res){
        // connection.query("INSERT INTO title_role SET ?")
    })
}

function addDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'dep_name',
            message: 'What is the name of the department?',
        },
    ]).then(function(res){
        connection.query("INSERT INTO department SET ?",
            { name: res.dep_name }, 
            function(err){
                if (err) throw err
                console.table(res)
                startApp();
            })
    })
}

function quit(){
    connection.end()
}

app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);

