const express = require('express');

const mysql = require('mysql2');

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

const prompt = [ 
  {
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [ 
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an mployee",
          "Update an employee role",
          "Quit"
      ]  
  }
];

// view all departments
function viewDepts() {


};

// view all roles
function viewRoles() {


};

// view all employees
function viewEmployees(){


};

// add a department
function addDept(){
app.post('/api/new-department', ({ body }, res) => {
  const sql = `INSERT INTO department (dept_name)
    VALUES (?)`;
  const params = [body.dept_name];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});
};

// add a role
function addRole() {
app.post('/api/new-role', ({ body }, res) => {
  const sql = `INSERT INTO role (
    title,
    salary,
    dept_id
    )
    VALUES (
      ?,
      ?,
      ?)`;
  const params = [body.title, body.salary, body.dept_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});
};

// add an employee
function addEmployee(){
app.post('/api/new-employee', ({ body }, res) => {
  const sql = `INSERT INTO employee (
    first_name,
    last_name,
    role_id,
    manager_id
    )
    VALUES (
      ?,
      ?,
      ?,
      ?)`;
  const params = [body.first_name, body.las_name, body.role_id, body.manager_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});
};

// update an employee role
function updateRole(){


};

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});