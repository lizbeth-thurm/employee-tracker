const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Fall2021!',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

function mainPrompt() {
  inquirer
    .prompt([
      {
        name: "trackerSelect",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
          "Quit"
        ]
      }
    ])
    .then((answer) => {
      if (answer.trackerSelect == "View all departments") {
        viewDepts();
      } else if (answer.trackerSelect == "View all roles") {
        viewRoles();
      } else if (answer.trackerSelect == "View all employees") {
        viewEmployees();
      } else if (answer.trackerSelect == "Add a department") {
        addDept();
      } else if (answer.trackerSelect == "Add a role") {
        addRole();
      } else if (answer.trackerSelect == "Add an employee") {
        addEmployee();
      } else if (answer.trackerSelect == "Update an employee role") {
        updateRole();
      } else if (answer.trackerSelect == "Quit") {
        console.log("Thanks for using our employee tracker!")
        connection.end();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

mainPrompt();

// view all departments
function viewDepts() {

  db.query("SELECT * FROM department", (err, res) => {
    try {
      console.table(res);
    } catch (err) {
      console.log(err);
    }
  });
  mainPrompt();
};

// view all roles
function viewRoles() {

  mainPrompt();
};

// view all employees
function viewEmployees() {

  mainPrompt();
};

// add a department
function addDept() {

  mainPrompt();
};

// add a role
function addRole() {

  mainPrompt();
};

// add an employee
function addEmployee() {

  mainPrompt();
};

// update an employee role
function updateRole() {

  mainPrompt();
};

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

