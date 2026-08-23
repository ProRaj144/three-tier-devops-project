import React, { useEffect, useMemo, useState } from "react";
import {
  Users,
  UserPlus,
  Search,
  Pencil,
  Trash2,
  BriefcaseBusiness,
  IndianRupee,
  X,
  Mail,
  Building2,
  ShieldCheck,
  TrendingUp,
  UserRound,
  ArrowLeft,
  Sparkles,
  RefreshCw
} from "lucide-react";

import LandingPage from "./LandingPage";
import "./App.css";

const emptyForm = {
  name: "",
  email: "",
  department: "",
  designation: "",
  salary: ""
};

function App() {
  /*
   * =========================================================
   * PAGE NAVIGATION
   * =========================================================
   */

  const [showWorkspace, setShowWorkspace] = useState(false);

  /*
   * =========================================================
   * EMPLOYEE STATE
   * =========================================================
   */

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /*
   * =========================================================
   * MODAL STATE
   * =========================================================
   */

  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  /*
   * =========================================================
   * LOAD EMPLOYEES
   * =========================================================
   */

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/employees");

      if (!response.ok) {
        throw new Error("Unable to load employees");
      }

      const data = await response.json();

      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the employee service.");
    } finally {
      setLoading(false);
    }
  };

  /*
   * =========================================================
   * INITIAL LOAD
   * =========================================================
   */

  useEffect(() => {
    if (showWorkspace) {
      loadEmployees();
    }
  }, [showWorkspace]);

  /*
   * =========================================================
   * SEARCH
   * =========================================================
   */

  const filteredEmployees = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return employees;
    }

    return employees.filter((employee) => {
      return (
        employee.name?.toLowerCase().includes(searchValue) ||
        employee.email?.toLowerCase().includes(searchValue) ||
        employee.department?.toLowerCase().includes(searchValue) ||
        employee.designation?.toLowerCase().includes(searchValue)
      );
    });
  }, [employees, search]);

  /*
   * =========================================================
   * STATISTICS
   * =========================================================
   */

  const totalEmployees = employees.length;

  const totalPayroll = employees.reduce((total, employee) => {
    return total + Number(employee.salary || 0);
  }, 0);

  const departments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  const averageSalary =
    totalEmployees > 0
      ? totalPayroll / totalEmployees
      : 0;

  /*
   * =========================================================
   * OPEN CREATE MODAL
   * =========================================================
   */

  const openCreateModal = () => {
    setEditingEmployee(null);
    setForm(emptyForm);
    setError("");
    setShowModal(true);
  };

  /*
   * =========================================================
   * OPEN EDIT MODAL
   * =========================================================
   */

  const openEditModal = (employee) => {
    setEditingEmployee(employee);

    setForm({
      name: employee.name || "",
      email: employee.email || "",
      department: employee.department || "",
      designation: employee.designation || "",
      salary: employee.salary || ""
    });

    setError("");
    setShowModal(true);
  };

  /*
   * =========================================================
   * CLOSE MODAL
   * =========================================================
   */

  const closeModal = () => {
    if (saving) {
      return;
    }

    setShowModal(false);
    setEditingEmployee(null);
    setForm(emptyForm);
    setError("");
  };

  /*
   * =========================================================
   * HANDLE INPUT
   * =========================================================
   */

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  /*
   * =========================================================
   * CREATE / UPDATE EMPLOYEE
   * =========================================================
   */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.department.trim() ||
      !form.designation.trim() ||
      !form.salary
    ) {
      setError("Please complete all employee fields.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const url = editingEmployee
        ? `/api/employees/${editingEmployee.id}`
        : "/api/employees";

      const method = editingEmployee ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          department: form.department.trim(),
          designation: form.designation.trim(),
          salary: Number(form.salary)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to save employee"
        );
      }

      setShowModal(false);
      setEditingEmployee(null);
      setForm(emptyForm);

      await loadEmployees();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to save employee.");
    } finally {
      setSaving(false);
    }
  };

  /*
   * =========================================================
   * DELETE EMPLOYEE
   * =========================================================
   */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      const response = await fetch(`/api/employees/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to delete employee"
        );
      }

      await loadEmployees();
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to delete employee.");
    } finally {
      setDeletingId(null);
    }
  };

  /*
   * =========================================================
   * BACK TO COMPANY HOME
   * =========================================================
   */

  const goToCompanyHome = () => {
    setShowWorkspace(false);
    setSearch("");
  };

  /*
   * =========================================================
   * LANDING PAGE
   * =========================================================
   */

  if (!showWorkspace) {
    return (
      <LandingPage
        onEnterWorkspace={() => setShowWorkspace(true)}
      />
    );
  }

  /*
   * =========================================================
   * EMPLOYEE WORKSPACE
   * =========================================================
   */

  return (
    <div className="app-shell">

      {/* =====================================================
          TOP NAVIGATION
          ===================================================== */}

      <nav className="workspace-nav">

        <div className="workspace-brand">

          <div className="workspace-brand-icon">
            <Sparkles size={18} />
          </div>

          <div>
            <strong>NEXORA</strong>
            <span>Employee Workspace</span>
          </div>

        </div>

        <div className="workspace-nav-actions">

          <button
            className="back-company-btn"
            onClick={goToCompanyHome}
          >
            <ArrowLeft size={16} />
            Company Home
          </button>

          <button
            className="refresh-btn"
            onClick={loadEmployees}
            title="Refresh employees"
          >
            <RefreshCw size={16} />
          </button>

          <button
            className="add-employee-btn"
            onClick={openCreateModal}
          >
            <UserPlus size={16} />
            Add Employee
          </button>

        </div>

      </nav>

      {/* =====================================================
          MAIN CONTENT
          ===================================================== */}

      <main className="workspace-content">

        {/* Header */}

        <section className="workspace-header">

          <div>

            <div className="workspace-label">
              <span></span>
              PEOPLE OPERATIONS
            </div>

            <h1>
              Employee
              <span> Workspace</span>
            </h1>

            <p>
              Manage your people, teams and workforce information
              from one connected workspace.
            </p>

          </div>

          <div className="workspace-status">

            <ShieldCheck size={18} />

            <div>
              <strong>System Online</strong>
              <span>Employee service connected</span>
            </div>

          </div>

        </section>

        {/* Error */}

        {error && (
          <div className="error-banner">
            <span>{error}</span>

            <button onClick={() => setError("")}>
              <X size={16} />
            </button>
          </div>
        )}

        {/* =================================================
            STATISTICS
            ================================================= */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon purple">
              <Users size={21} />
            </div>

            <div className="stat-info">
              <span>Total People</span>
              <strong>{totalEmployees}</strong>
            </div>

            <div className="stat-decoration">
              01
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon blue">
              <Building2 size={21} />
            </div>

            <div className="stat-info">
              <span>Departments</span>
              <strong>{departments}</strong>
            </div>

            <div className="stat-decoration">
              02
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon green">
              <IndianRupee size={21} />
            </div>

            <div className="stat-info">
              <span>Total Payroll</span>
              <strong>
                ₹{totalPayroll.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="stat-decoration">
              03
            </div>

          </div>

          <div className="stat-card">

            <div className="stat-icon orange">
              <TrendingUp size={21} />
            </div>

            <div className="stat-info">
              <span>Average Salary</span>
              <strong>
                ₹{Math.round(averageSalary).toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="stat-decoration">
              04
            </div>

          </div>

        </section>

        {/* =================================================
            EMPLOYEE DIRECTORY
            ================================================= */}

        <section className="directory-section">

          <div className="directory-header">

            <div>

              <span className="section-label">
                TEAM DIRECTORY
              </span>

              <h2>
                Your People
              </h2>

              <p>
                View and manage employee information.
              </p>

            </div>

            <div className="search-wrapper">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search people, teams..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                >
                  <X size={15} />
                </button>
              )}

            </div>

          </div>

          {/* =================================================
              LOADING
              ================================================= */}

          {loading ? (

            <div className="empty-state">

              <div className="loading-spinner"></div>

              <h3>Loading your people...</h3>

              <p>
                Connecting to the employee service.
              </p>

            </div>

          ) : filteredEmployees.length === 0 ? (

            /* =================================================
               EMPTY
               ================================================= */

            <div className="empty-state">

              <div className="empty-icon">
                <UserRound size={25} />
              </div>

              <h3>
                {search
                  ? "No matching employees"
                  : "No employees yet"}
              </h3>

              <p>
                {search
                  ? "Try another search term."
                  : "Add your first employee to get started."}
              </p>

              {!search && (
                <button
                  className="add-employee-btn"
                  onClick={openCreateModal}
                >
                  <UserPlus size={16} />
                  Add Employee
                </button>
              )}

            </div>

          ) : (

            /* =================================================
               EMPLOYEE TABLE
               ================================================= */

            <div className="employee-table-wrapper">

              <table className="employee-table">

                <thead>

                  <tr>
                    <th>EMPLOYEE</th>
                    <th>DEPARTMENT</th>
                    <th>DESIGNATION</th>
                    <th>SALARY</th>
                    <th>ACTIONS</th>
                  </tr>

                </thead>

                <tbody>

                  {filteredEmployees.map((employee) => (

                    <tr key={employee.id}>

                      {/* Employee */}

                      <td>

                        <div className="employee-profile">

                          <div className="employee-avatar">
                            {employee.name
                              ?.charAt(0)
                              .toUpperCase()}
                          </div>

                          <div>

                            <strong>
                              {employee.name}
                            </strong>

                            <span>
                              <Mail size={12} />
                              {employee.email}
                            </span>

                          </div>

                        </div>

                      </td>

                      {/* Department */}

                      <td>

                        <div className="department-cell">

                          <Building2 size={14} />

                          {employee.department}

                        </div>

                      </td>

                      {/* Designation */}

                      <td>

                        <span className="designation-badge">
                          <BriefcaseBusiness size={13} />
                          {employee.designation}
                        </span>

                      </td>

                      {/* Salary */}

                      <td>

                        <strong className="salary-value">
                          ₹
                          {Number(
                            employee.salary || 0
                          ).toLocaleString("en-IN")}
                        </strong>

                      </td>

                      {/* Actions */}

                      <td>

                        <div className="table-actions">

                          <button
                            className="edit-btn"
                            onClick={() =>
                              openEditModal(employee)
                            }
                            title="Edit employee"
                          >
                            <Pencil size={15} />
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDelete(employee.id)
                            }
                            disabled={
                              deletingId === employee.id
                            }
                            title="Delete employee"
                          >
                            <Trash2 size={15} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

          {/* Footer */}

          {!loading &&
            filteredEmployees.length > 0 && (

              <div className="directory-footer">

                <span>
                  Showing{" "}
                  <strong>
                    {filteredEmployees.length}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {employees.length}
                  </strong>{" "}
                  employees
                </span>

                <span>
                  Connected to Nexora Employee API
                </span>

              </div>

            )}

        </section>

      </main>

      {/* =====================================================
          ADD / EDIT MODAL
          ===================================================== */}

      {showModal && (

        <div
          className="modal-overlay"
          onMouseDown={(event) => {

            if (event.target === event.currentTarget) {
              closeModal();
            }

          }}
        >

          <div className="employee-modal">

            {/* Modal Header */}

            <div className="modal-header">

              <div>

                <span className="section-label">
                  {editingEmployee
                    ? "EDIT EMPLOYEE"
                    : "NEW EMPLOYEE"}
                </span>

                <h2>
                  {editingEmployee
                    ? "Update employee"
                    : "Add a new employee"}
                </h2>

              </div>

              <button
                className="modal-close"
                onClick={closeModal}
                disabled={saving}
              >
                <X size={18} />
              </button>

            </div>

            {/* Form */}

            <form
              className="employee-form"
              onSubmit={handleSubmit}
            >

              {/* Name */}

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Arjun Kumar"
                  value={form.name}
                  onChange={handleChange}
                  disabled={saving}
                />

              </div>

              {/* Email */}

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="e.g. arjun@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={saving}
                />

              </div>

              <div className="form-row">

                {/* Department */}

                <div className="form-group">

                  <label>
                    Department
                  </label>

                  <input
                    type="text"
                    name="department"
                    placeholder="e.g. Engineering"
                    value={form.department}
                    onChange={handleChange}
                    disabled={saving}
                  />

                </div>

                {/* Designation */}

                <div className="form-group">

                  <label>
                    Designation
                  </label>

                  <input
                    type="text"
                    name="designation"
                    placeholder="e.g. Software Engineer"
                    value={form.designation}
                    onChange={handleChange}
                    disabled={saving}
                  />

                </div>

              </div>

              {/* Salary */}

              <div className="form-group">

                <label>
                  Annual Salary
                </label>

                <div className="salary-input">

                  <span>₹</span>

                  <input
                    type="number"
                    name="salary"
                    min="0"
                    placeholder="50000"
                    value={form.salary}
                    onChange={handleChange}
                    disabled={saving}
                  />

                </div>

              </div>

              {/* Form Actions */}

              <div className="form-actions">

                <button
                  type="button"
                  className="cancel-btn"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-btn"
                  disabled={saving}
                >

                  {saving ? (
                    <>
                      <span className="button-spinner"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      {editingEmployee
                        ? "Update Employee"
                        : "Create Employee"}
                      <ArrowLeft
                        size={16}
                        style={{
                          transform: "rotate(180deg)"
                        }}
                      />
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default App;