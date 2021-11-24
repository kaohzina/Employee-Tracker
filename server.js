const { response } = require('express');
const fs = require('fs');
const inquirer = require("inquirer");
const Connection = require('mysql2/typings/mysql/lib/Connection');
const generateMarkdown =  require('./utils/generateMarkdown');

function promptUser() {
  return inquirer.prompt([
  {
    type: "list",
    name: "menu",
    message: "What would you like to do?",
    choices: [
    'View all departments',
    'View all roles', 
    'View all employees', 
    'Add a department', 
    'Add a role', 
    'Add an employee', 
    'Update an employee role'
    ],
  },
])
  .then((response => {
    let choice = response.menu
    switch (choice) {
      case "View all departments":
        viewDepts();
        break;
      case "View all roles":
        viewRoles();
        break;
      case "View all employees":
        viewEmployees();
        break;
      case "Add a department":
        addDepts();
        break;
      case "Add a role":
        addRoles();
        break;
      case "Add an employee":
        addEmployees();
        break;
      case "Update an employee role":
        updateEmployee();
        break;
    }
  })
)}   
 
function viewDepts() {
  const queue = 'SELECT * FROM departments';
  db.promise().query(queue)
  .then(([rows]) => {
    let dept = rows;
    console.table(dept)
    menu();
  })
}
function viewRoles() {
  const queue = 'SELECT roles.id, roles.title, departments.name AS department FROM role INNER JOIN department ON roles.department_id = department.id';
  db.promise().query(queue)
  .then(([rows]) => {
    let dept = rows;
    console.table(dept)
    menu();
  })
}
function viewEmployees() {
  const queue = 'SELECT employees.id, employees.first_name, employees.last_name, role_id, department.name AS department, role.salary, CONCAT (manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id';
  db.promise().query(queue)
  .then(([rows]) => {
    let dept = rows;
    console.table(dept)
    menu();
  })
}
function addDepts() {
  inquirer.prompt([
  {
    type: 'input',
    name: 'addedDeptName',
    message: "What is the name of the department you would like to add?",
  validate: addedDeptName => {
    if (addedDeptName) {
      return true;
    } else {
      console.log('Enter a name for the department');
      return false;
    }
  }
  }
  ]).then(answer => {
    const sql = `INSERT INTO department (name) VALUES (?)`;
  db.query(queue, answer.addedDeptName, (err, result) => {
    if (err) throw err;
    console.log(answer.addedDeptName + ' has been added to the list of departments.');
  })
  .then(([rows]) => {
    let dept = rows;
    console.table(dept)
    menu();
  })
}
function addRoles() {

  db.promise().query(queue)
  .then(([rows]) => {
    let dept = rows;
    console.table(dept)
    menu();
  })
}
function addEmployees() {

  db.promise().query(queue)
  .then(([rows]) => {
    let dept = rows;
    console.table(dept)
    menu();
  })
}
function updateEmployee() {

  db.promise().query(queue)
  .then(([rows]) => {
    let dept = rows;
    console.table(dept)
    menu();
  })
}


async function menu(){
  const data = await promptUser();
  const generateReadMe = generateMarkdown(data)
  fs.writeFile('./dist/README.md', generateReadMe, err => {
    if (err) { reject(err); return;}
  });
};
menu();