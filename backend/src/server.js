const express = require("express");
const morgan = require("morgan");
const database = require("./database");

const app = express();

app.use(morgan("common"));
app.use(express.json());

/*
 * Health check
 */
app.get("/healthz", function(req, res) {
  res.status(200).send("I am happy and healthy\n");
});

/*
 * Root endpoint
 */
app.get("/", async function(req, res, next) {
  try {
    const result = await database.raw("SELECT VERSION() AS version");

    const rows = result[0];

    res.json({
      message: `Employee Management API`,
      database: rows[0].version
    });
  } catch (error) {
    next(error);
  }
});

/*
 * GET all employees
 */
app.get("/employees", async function(req, res, next) {
  try {
    const employees = await database("employees")
      .select(
        "id",
        "name",
        "email",
        "department",
        "designation",
        "salary",
        "created_at",
        "updated_at"
      )
      .orderBy("id", "asc");

    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
});

/*
 * GET employee by ID
 */
app.get("/employees/:id", async function(req, res, next) {
  try {
    const employee = await database("employees")
      .where({ id: req.params.id })
      .first();

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json(employee);
  } catch (error) {
    next(error);
  }
});

/*
 * CREATE employee
 */
app.post("/employees", async function(req, res, next) {
  try {
    const {
      name,
      email,
      department,
      designation,
      salary
    } = req.body;

    if (!name || !email || !department || !designation || salary === undefined) {
      return res.status(400).json({
        message: "name, email, department, designation and salary are required"
      });
    }

    const [id] = await database("employees").insert({
      name,
      email,
      department,
      designation,
      salary
    });

    const employee = await database("employees")
      .where({ id })
      .first();

    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
});

/*
 * UPDATE employee
 */
app.put("/employees/:id", async function(req, res, next) {
  try {
    const {
      name,
      email,
      department,
      designation,
      salary
    } = req.body;

    const existingEmployee = await database("employees")
      .where({ id: req.params.id })
      .first();

    if (!existingEmployee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    await database("employees")
      .where({ id: req.params.id })
      .update({
        name,
        email,
        department,
        designation,
        salary,
        updated_at: database.fn.now()
      });

    const updatedEmployee = await database("employees")
      .where({ id: req.params.id })
      .first();

    res.status(200).json(updatedEmployee);
  } catch (error) {
    next(error);
  }
});

/*
 * DELETE employee
 */
app.delete("/employees/:id", async function(req, res, next) {
  try {
    const existingEmployee = await database("employees")
      .where({ id: req.params.id })
      .first();

    if (!existingEmployee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    await database("employees")
      .where({ id: req.params.id })
      .del();

    res.status(200).json({
      message: "Employee deleted successfully"
    });
  } catch (error) {
    next(error);
  }
});

/*
 * Error handler
 */
app.use(function(error, req, res, next) {
  console.error(error);

  res.status(500).json({
    message: "Internal server error"
  });
});

module.exports = app;