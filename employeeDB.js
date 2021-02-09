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
    return new Promise(function(resolve, reject){
        connection.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL", function(err, res){
            if (err) throw err;
            for (var i=0; i < res.length; i++){
                managerArray.push(res[i].first_name)
            }
            resolve(managerArray)
        })
    })  
}

async function addEmployee(){
    var getTitles = await getRoles();
    var managerNames = await chooseManager();
    console.log(getTitles)
    console.log(managerNames)
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
            choices: getTitles
        },
        {
            type: 'list',
            name: 'managerChoice',
            message: 'Who is their manager?',
            choices: managerNames
        },
    ]).then(async function(res){
        console.log(res.firstName, res.lastName, res.role, res.managerChoice);
        var roleID = await new Promise(function(resolve, reject){
            connection.query("SELECT * FROM title_role WHERE title = ?", [res.role], function(err, res){
            if (err) reject(err);
            resolve(res[0].id);
        })
    })
        var managerID = await new Promise(function(resolve, reject){
            connection.query("SELECT * FROM employee WHERE first_name = ?", [res.managerChoice], function(err, res){
            if (err) reject(err);
            resolve(res[0].id);
        })
    })
        console.log(managerID);
        console.log(roleID)
        connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("${res.firstName}", "${res.lastName}", "${roleID}", "${managerID}")`,
        async function(err, res){
            if (err) throw err;
            var allEmployees = await getEmployees();
            console.table(allEmployees);
            startApp();
        })
    })
}    

function getRoles(){
    return new Promise(function(resolve, reject){
        var titles = []
        connection.query("SELECT title FROM title_role", function(err, res){
            if(err) reject(err);
            for (let i = 0; i < res.length; i++){
                titles.push(res[i].title)
            } 
            resolve(titles);
        })
    })
}

function getEmployees(){
    return new Promise(function (resolve, reject){
        connection.query("SELECT * FROM employee", function(err, res){
            if(err) reject(err);
            resolve(res);
        })
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

