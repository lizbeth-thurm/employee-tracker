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

mainPrompt();

function mainPrompt() {
  console.log(" ");
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

// view all departments
function viewDepts() {
  db.query("SELECT * FROM department", (err, res) => {
    try {
      console.log(" ");
      console.table(res);
      mainPrompt();
    } catch (err) {
      console.log(err);
    }
  });
};

// view all roles
function viewRoles() {
  db.query("SELECT * FROM employee_role", (err, res) => {
    try {
      console.log(" ");
      console.table(res);
      mainPrompt();
    } catch (err) {
      console.log(err);
    }
  });
};

// view all employees
function viewEmployees() {
  db.query(
    "SELECT employee.id, employee.first_name, employee.last_name, employee_role.title, department.dept_name, employee_role.salary, employee.manager_id FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.dept_id = department.id",
    (err, res) => {
      try {
        console.log(" ");
        console.table(res);
        mainPrompt();
      } catch (err) {
        console.log(err);
      }
    });
};

// add a department
function addDept() {
  console.log(" ");
  inquirer
    .prompt([
      {
        name: "addDept",
        type: "input",
        message: "Please enter the name of the department you would like to add."
      }
    ])
    .then((answer) => {
      db.query("INSERT INTO department (dept_name) VALUES (?)", answer.addDept, (err, res) => {
        try {
          console.log(" ");
          console.log("Department added successfully!");
          mainPrompt();
        } catch (err) {
          console.log(err);
        }
      });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

// add a role
function addRole() {
  console.log(" ");
  inquirer
    .prompt([
      {
        name: "addRoleTitle",
        type: "input",
        message: "Please enter the title of the role you would like to add."
      },
      {
        name: "addRoleSalary",
        type: "input",
        message: "Please enter the salary of the role you would like to add."
      },
      {
        name: "addRoleDept",
        type: "input",
        message: "Please enter the department ID of the role you would like to add."
      }
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee_role (title, salary, dept_id) VALUES (?, ?, ?)",
        [res.addRoleTitle, res.addRoleSalary, res.addRoleDept], (err, res) => {
          try {
            console.log(" ");
            console.log("Role added successfully!");
            mainPrompt();
          } catch (err) {
            console.log(err);
          }
        });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
};

// add an employee
function addEmployee() {
  console.log(" ");
  inquirer
    .prompt([
      {
        name: "addEmployeeFirstName",
        type: "input",
        message: "Please enter the first name of the employee you would like to add."
      },
      {
        name: "addEmployeeLastName",
        type: "input",
        message: "Please enter the last name of the employee you would like to add."
      },
      {
        name: "addEmployeeRole",
        type: "input",
        message: "Please enter the role ID of the employee you would like to add."
      },
      {
        name: "addEmployeeManager",
        type: "input",
        message: "Please enter the manager ID of the employee you would like to add (leave blank if they have no manager)."
      }
    ])
    .then((answer) => {
      db.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [answer.addEmployeeFirstName, answer.addEmployeeLastName, answer.addEmployeeRole, answer.addEmployeeManager], (err, res) => {
          try {
            console.log(" ");
            console.log("Employee added successfully!");
            mainPrompt();
          } catch (err) {
            console.log(err);
          }
        });
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else went wrong
      }
    });
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