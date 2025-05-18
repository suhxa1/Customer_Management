import { useState } from 'react';
import axios from 'axios';
import './CustomerForm.css';


function CustomerForm({ existingData = null, onSuccess }) {
  const [name, setName] = useState(existingData?.name || '');
  const [dob, setDob] = useState(existingData?.dob || '');
  const [nic, setNic] = useState(existingData?.nic || '');
  const [mobiles, setMobiles] = useState(existingData?.mobiles || ['']);
  const [addresses, setAddresses] = useState(existingData?.addresses || [{
    line1: '', line2: '', cityId: '', countryId: ''
  }]);

  const handleMobileChange = (index, value) => {
    const updated = [...mobiles];
    updated[index] = value;
    setMobiles(updated);
  };

  const handleAddressChange = (index, field, value) => {
    const updated = [...addresses];
    updated[index][field] = value;
    setAddresses(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name, dob, nic, mobiles, addresses,
  
    };
    try {
      await axios.post('http://localhost:8080/api/customers', payload);
      alert('Customer saved');
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert('Failed to save');
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
     <h2>{existingData ? 'Update' : 'Add New'} Customer</h2>
      <label>Name*:</label>
      <input required value={name} onChange={(e) => setName(e.target.value)} />

      <label>DOB*:</label>
      <input type="date" required value={dob} onChange={(e) => setDob(e.target.value)} />

      <label>NIC*:</label>
      <input required value={nic} onChange={(e) => setNic(e.target.value)} />

      <label>Mobile Numbers:</label>
      {mobiles.map((m, idx) => (
        <div key={idx}>
          <input value={m} onChange={(e) => handleMobileChange(idx, e.target.value)} />
          <button type="button" onClick={() => setMobiles([...mobiles, ''])}>+</button>
        </div>
      ))}

      <label>Addresses:</label>
      {addresses.map((addr, idx) => (
        <div key={idx}>
          <input placeholder="Line 1" value={addr.line1} onChange={(e) => handleAddressChange(idx, 'line1', e.target.value)} />
          <input placeholder="Line 2" value={addr.line2} onChange={(e) => handleAddressChange(idx, 'line2', e.target.value)} />
          <input placeholder="City ID" value={addr.cityId} onChange={(e) => handleAddressChange(idx, 'cityId', e.target.value)} />
          <input placeholder="Country ID" value={addr.countryId} onChange={(e) => handleAddressChange(idx, 'countryId', e.target.value)} />
          <button type="button" onClick={() => setAddresses([...addresses, { line1: '', line2: '', cityId: '', countryId: '' }])}>+</button>
        </div>
      ))}

      <br />
      <button type="submit">Save Customer</button>
    </form>
  );
}

export default CustomerForm;
