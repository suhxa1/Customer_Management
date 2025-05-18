import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './form.css';


function EditCustomer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    name: '',
    dob: '',
    nic: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/customers/${id}`)
      .then(res => setCustomer(res.data))
      .catch(err => alert('Failed to fetch customer'));
  }, [id]);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/customers/${id}`, customer)
      .then(() => {
        alert('Customer updated successfully');
        navigate('/');
      })
      .catch(() => alert('Update failed'));
  };

  return (
    <div className="form-container">
      <h2>Edit Customer</h2>
      <form onSubmit={handleUpdate}>
        <label>Name</label>
        <input name="name" value={customer.name} onChange={handleChange} required />

        <label>DOB</label>
        <input type="date" name="dob" value={customer.dob} onChange={handleChange} required />

        <label>NIC</label>
        <input name="nic" value={customer.nic} onChange={handleChange} required />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditCustomer;
