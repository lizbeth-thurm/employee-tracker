INSERT INTO department (dept_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO employee_role (title, salary, dept_id)
VALUES ("Sales Lead", 100000, 1),
       ("Lead Engineer", 80000, 2),
       ("Engineer I", 60000, 2),
       ("Accountant", 120000, 3),
       ("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Franklin", "Alberts", 1, NULL),
       ("George", "Johnson", 2, NULL),
       ("Barnaby", "Baker", 2, 2), 
       ("Susan", "Calloway", 4, NULL),
       ("Bernadette", "Smith", 5, NULL);