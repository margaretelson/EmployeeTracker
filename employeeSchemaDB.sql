DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE title_role (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL UNSIGNED NOT NULL,
  department_id INT UNSIGNED NOT NULL,
  INDEX department_index (department_id),
  CONSTRAINT department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT UNSIGNED NOT NULL,
  INDEX role_index (role_id),
  CONSTRAINT title_role FOREIGN KEY (role_id) REFERENCES title_role(id) ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX manager_index (manager_id),
  CONSTRAINT manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

INSERT INTO department
    (name)
VALUES
    ('HR'),
    ('Finance'),
    ('Sales'),
    ('Engineering');

INSERT INTO title_role
    (title, salary, department_id)
VALUES
    ('Recruiter', 30000, 1),
    ('Human Resource Consultant', 50000, 1),
    ('Financial Analyst', 70000, 2),
    ('Accountant', 75000, 2),
    ('Sales Associate', 60000, 3),
    ('Account Executive', 80000, 3),
    ('Full Stack Engineer', 95000, 4),
    ('Software Developer', 90000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Tony', 'Stark', 1, NULL),
    ('Steve', 'Rogers', 2, NULL),
    ('Peter', 'Parker', 3, 1),
    ('Natasha', 'Romanova', 4, 2),
    ('Bruce', 'Banner', 5, 1),
    ('Stephen', 'Strange', 6, NULL),
    ('Sam', 'Wilson', 7, 1),
    ('Wanda', 'Maximoff', 8, 6);


SELECT * FROM employee_trackerDB.employee;

SELECT * FROM employee_trackerDB.title_role;

SELECT * FROM employee_trackerDB.department;
