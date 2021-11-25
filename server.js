const fs = require("fs");
const inquirer = require("inquirer");

function promptUser() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "promptUser",
        message: "What would you like to do?",
        choices: [
          "View all departments",
          "View all roles",
          "View all employees",
          "Add a department",
          "Add a role",
          "Add an employee",
          "Update an employee role",
        ],
      },
    ])
    .then((response) => {
      let choice = response.promptUser;
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
    });
}

function viewDepts() {
  const queue = "SELECT * FROM departments";
  db.promise()
    .query(queue)
    .then(([rows]) => {
      let dept = rows;
      console.table(dept);
      promptUser();
    });
}
function viewRoles() {
  const queue =
    "SELECT roles.id, roles.title, departments.name AS department FROM role INNER JOIN department ON roles.department_id = department.id";
  db.promise()
    .query(queue)
    .then(([rows]) => {
      let dept = rows;
      console.table(dept);
      promptUser();
    });
}
function viewEmployees() {
  const queue =
    "SELECT employees.id, employees.first_name, employees.last_name, role_id, department.name AS department, role.salary, CONCAT (manager.first_name, manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id";
  db.promise()
    .query(queue)
    .then(([rows]) => {
      let dept = rows;
      console.table(dept);
      promptUser();
    });
}
function addDepts() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addedDeptName",
        message: "What is the name of the department you would like to add?",
        validate: (addedDeptName) => {
          if (addedDeptName) {
            return true;
          } else {
            console.log("Enter a name for the department");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const sql = `INSERT INTO department (name) VALUES (?)`;
      db.query(queue, answer.addedDeptName, (err, result) => {
        if (err) throw err;
        console.log(
          answer.addedDeptName + " has been added to the list of departments."
        );
      });
    });
}
function addRoles() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'role',
      message: 'What is the role you would like to add?',
      validate: addRole => {
        if (addRole) {
          return true;
        } else {
          console.log('Enter the name of the role you would like to add.');
        }
      }
    }
  ])
  db.promise()
    .query(queue)
    .then(([rows]) => {
      let dept = rows;
      console.table(dept);
      promptUser();
    });
}
function addEmployees() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'fistName',
      message: "What is the employee's first name?",
      validate: addFirstName => {
        if (addFirstName) {
            return true;
        } else {
            console.log('Please enter a first name');
            return false;
        }
      }
    },
    {
      type: 'input',
      name: 'lastName',
      message: "What is the employee's last name?",
      validate: addLastName => {
        if (addLastName) {
            return true;
        } else {
            console.log('Please enter a last name');
            return false;
        }
      }
    }
  ])
  db.promise()
    .query(queue)
    .then(([rows]) => {
      let dept = rows;
      console.table(dept);
      promptUser();
    });
}
function updateEmployee() {
        inquirer
          .prompt([
            {
              name: 'chosenEmployee',
              type: 'list',
              message: 'Which employee has a new role?',
              choices: employeeNamesArray
            },
            {
              name: 'chosenRole',
              type: 'list',
              message: 'What is their new role?',
              choices: rolesArray
            }
          ])
  db.promise()
    .query(queue)
    .then(([rows]) => {
      let dept = rows;
      console.table(dept);
      promptUser();
    });
  }

promptUser();