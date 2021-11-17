const { response } = require('express');
const fs = require('fs');
const inquirer = require("inquirer");
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
  const queue = 'SELECT employees.id, employees.first_name, employees.last_name, role_id, department.name AS department'
  db.promise().query(queue)
  .then(([rows]) => {
    let dept = rows;
    console.table(dept)
    menu();
  })
}
function addDepts() {

  db.promise().query(queue)
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