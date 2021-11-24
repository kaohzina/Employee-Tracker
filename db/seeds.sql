INSERT INTO department (name)
VALUES
('Sales'),
('Quality'),
('Accounting'),
('Administrative')

INSERT INTO role (title, salary, department id)
VALUES
('Sales Representative', 50000, 1),
('Quality Assurance', 65000, 2),
('Accountant', 60000, 3),
('Assistant to the regional manager', 50000, 4),
('Reception', 30000, 4),
('Human Resources', 65000, 4),
('Manager', 70000, 4)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Kevin', 'Malone', 3, null),
('Oscar', 'Martinez', 3, null),
('Angela', 'Martin', 3, null),
('Jim', 'Halper', 1, null),
('Stanley', 'Hudson', 1, null),
('Phyllis', 'Vance', 1, null),
('Pam', 'Halper', 1, null),
('Dwight', 'Schrute', 4, null),
('Meredith', 'Palmer', 2, null),
('Creed', 'Bratton', 2, null),
('Andy', 'Bernard', 1, null),
('Toby', 'Flenderson', 6, 6),
('Kelly', 'Kapoor', 6, null),
('Ryan', 'Howard', 6, null),
('Michael', 'Scott', 7, 4),
