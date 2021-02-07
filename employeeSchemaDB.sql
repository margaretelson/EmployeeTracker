DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE title_role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,4) NULL,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  dep_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

TRUNCATE employee;
INSERT INTO employee(first_name, last_name, role_id) VALUES ("Margaret", "Elson", 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Johnny", "Appleseed", 2, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Sam", "Smith", 3, 1);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES ("Josh", "Brown", 4, 1);

TRUNCATE title_role;
INSERT INTO title_role(title, salary, department_id) VALUES ("Recruiter", 45000, 1);
INSERT INTO title_role(title, salary, department_id) VALUES ("Onboarding Specialist", 40000, 1);
INSERT INTO title_role(title, salary, department_id) VALUES ("Full-Stack Engineer", 70000, 2);
INSERT INTO title_role(title, salary, department_id) VALUES ("Lawyer", 90000, 3);

TRUNCATE department;
INSERT INTO department(dep_name) VALUES ("Legal");
INSERT INTO department(dep_name) VALUES ("HR");
INSERT INTO department(dep_name) VALUES ("Dev");
INSERT INTO department(dep_name) VALUES ("Sales");

SELECT * FROM employee_trackerDB.employee;

SELECT * FROM employee_trackerDB.title_role;

SELECT * FROM employee_trackerDB.department;
