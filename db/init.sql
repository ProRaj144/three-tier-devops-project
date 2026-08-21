CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    department VARCHAR(100) NOT NULL,
    designation VARCHAR(100) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO employees
    (name, email, department, designation, salary)
VALUES
    ('Sujith', 'sujith@example.com', 'DevOps', 'DevOps Engineer', 50000.00),
    ('Rahul', 'rahul@example.com', 'Backend', 'Backend Developer', 55000.00),
    ('Priya', 'priya@example.com', 'HR', 'HR Manager', 60000.00);