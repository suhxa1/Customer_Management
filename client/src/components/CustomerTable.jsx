import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CustomerTable.css';

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/api/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure to delete?')) {
      axios.delete(`http://localhost:8080/api/customers/${id}`)
        .then(() => {
          setCustomers(customers.filter(c => c.id !== id));
          alert('Deleted successfully');
        })
        .catch(() => alert('Delete failed'));
    }
  };

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.nic.toLowerCase().includes(search.toLowerCase()) ||
    c.dob.includes(search)
  );

  return (
    <div className="table-container">

      <input
        type="text"
        placeholder="🔍 Search by name, NIC, or DOB..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />

      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>NIC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.dob}</td>
              <td>{c.nic}</td>
              <td>
                <Link to={`/view/${c.id}`} className="action-link">View</Link>
                <Link to={`/edit/${c.id}`} className="action-link">Edit</Link>
                <button onClick={() => handleDelete(c.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td colSpan="4" className="no-data">No matching customers found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
