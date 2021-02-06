const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require("mysql");
const consoleTable = require("console.table");

var roleArray = [];
var managerArray = [];

const connection = mysql.createConnection({
    host: "localhost",
    port: 8080,
    user: "root",
    password: password,
    database: "employee_trackerDB"

});

connection.connect(function(){
    if (error) throw error;
    startApp();
})

let newTeamProfile = []

function createApp(){
    teamMemPrompt()
}


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

function addRole(){
    connection.query
}

function addDepartment(){
    connection.query
}

//

function chooseRole(){
    connection.query
}

function chooseManager(){
    connection.query
}

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
            choices: chooseRole();
        },
        {
            type: 'rawlist',
            name: 'managerChoice',
            message: 'Who is their manager?',
            choices: chooseManager();
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
            startApp();
        }
    })
}    

// function addDepartment(){
//     inquirer.prompt([
//         {
//             type: 'input',
//             name: 'name',
//             message: 'What is the name of the intern you are inputting?',
//         },
//         {
//             type: 'input',
//             name: 'ID',
//             message: 'What is the employee ID of the intern?',
//         },
//         {
//             type: 'input',
//             name: 'email',
//             message: 'What is the interns email?',
//         },
//         {
//             type: 'input',
//             name: 'internSchool',
//             message: 'What school does the intern go to?',
//         },
//     ]).then(function(response){
//         var name = response.name;
//         var ID = response.ID;
//         var email = response.email;
//         var internSchool = response.internSchool
//         const newTeamMem = new Intern(name, ID, email, internSchool);
//         newTeamProfile.push(newTeamMem);
//         teamMemPrompt();
//     })
// } 
    
//     function teamMemPrompt(){
//         inquirer.prompt([
//             {
//                 type: 'list',
//                 name: 'addMore',
//                 message: 'Would you like to add a member to your team?',
//                 choices: ['Add an Engineer.', 'Add an Intern.', 'Add a Manager.', 'No, my team is complete.']
//             },
//         ])
//         .then(function (response) {

//             switch (response.addMore) {
//                 case "Add an Engineer.":
//                     engineerPrompt();
//                     break;

//                 case "Add an Intern.":
//                     internPrompt();
//                     break;

//                 case "Add a Manager.":
//                     managerPrompt();
//                     break;

//                 case "No, my team is complete.":
//                     completeTeam();
//                     break;
//             }
//         });
//     }

// function completeTeam() {
//     console.log("Congratulations! You have a team.")
    
//     beginHTML()
//     inputHTML();
//     endHTML();
// }