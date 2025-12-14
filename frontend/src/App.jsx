import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ name: '', surname: '', department: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/employees');
      setEmployees(res.data.success ? res.data.data : []);
    } catch (err) {
      console.error(err);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch departments
  const fetchDepartments = async () => {
    try {
      const res = await axios.get('/api/departments');
      setDepartments(res.data.success ? res.data.data : []);
    } catch (err) {
      console.error(err);
      setDepartments([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const resetForm = () => {
    setForm({ name: '', surname: '', department: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: form.name,
        surname: form.surname,
        department: form.department // must be ObjectId from department._id
      };

      if (editingId) {
        await axios.put(`/api/employees/${editingId}`, payload);
      } else {
        await axios.post('/api/employees', payload);
      }

      fetchEmployees();
      resetForm();
    } catch (err) {
      console.error(err);
      alert('Failed to save employee: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleEdit = (emp) => {
    setForm({
      name: emp.name,
      surname: emp.surname,
      department: emp.department?._id || ''
    });
    setEditingId(emp._id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    try {
      await axios.delete(`/api/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert('Failed to delete employee');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Apollonia Dental Practice - Employee Management</h1>

      <div style={{ display: 'flex', gap: '20px', marginTop: '30px' }}>
        {/* Form */}
        <div style={{ flex: 1 }}>
          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
            <h3>{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
            <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label>First Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label>Last Name</label>
                <input
                  type="text"
                  value={form.surname}
                  onChange={(e) => setForm({ ...form, surname: e.target.value })}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label>Department</label>
                <select
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((d) => (
                    <option key={d._id} value={d._id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}
              >
                {editingId ? 'Update' : 'Add'} Employee
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  style={{ padding: '10px 20px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', marginLeft: '10px' }}
                >
                  Cancel
                </button>
              )}
            </form>
          </div>
        </div>

        {/* Employee List */}
        <div style={{ flex: 2 }}>
          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
            <h3>Employees ({employees.length})</h3>
            {loading ? (
              <p>Loading employees...</p>
            ) : employees.length === 0 ? (
              <p>No employees found. Add some using the form.</p>
            ) : (
              <table style={{ width: '100%', marginTop: '20px' }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((emp) => (
                    <tr key={emp._id}>
                      <td>{emp.name} {emp.surname}</td>
                      <td>{emp.department?.name || ''}</td>
                      <td>
                        <button onClick={() => handleEdit(emp)} style={{ marginRight: '10px', color: '#007bff' }}>Edit</button>
                        <button onClick={() => handleDelete(emp._id)} style={{ color: '#dc3545' }}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
