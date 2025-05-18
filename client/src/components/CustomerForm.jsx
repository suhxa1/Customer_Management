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
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    const todayStr = new Date().toISOString().split('T')[0];

    // Name: only letters and spaces
    if (!name.trim() || name.trim().length < 3 || !/^[A-Za-z\s]+$/.test(name.trim())) {
      newErrors.name = 'Name must be at least 3 letters and contain only letters and spaces';
    }

    // DOB: not today or future
    if (!dob || dob >= todayStr) {
      newErrors.dob = 'DOB cannot be today or a future date';
    }

    // NIC: 9 digits + optional V/v/X/x
    if (!nic || !/^\d{9}[vVxX]?$/.test(nic.trim())) {
      newErrors.nic = 'NIC must be 9 digits with optional V or X';
    }

    // Mobiles: only digits, min 10
    mobiles.forEach((m, idx) => {
      if (!m.trim() || !/^\d{10,}$/.test(m.trim())) {
        newErrors[`mobile_${idx}`] = 'Mobile must contain only digits and be at least 10 numbers long';
      }
    });

    // Addresses: all fields required
    addresses.forEach((addr, idx) => {
      ['line1', 'line2', 'cityId', 'countryId'].forEach((field) => {
        if (!addr[field] || !addr[field].trim()) {
          newErrors[`address_${idx}_${field}`] = `${field} is required`;
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const payload = {
      name: name.trim(),
      dob,
      nic: nic.trim(),
      mobiles: mobiles.map(m => m.trim()),
      addresses: addresses.map(addr => ({
        line1: addr.line1.trim(),
        line2: addr.line2.trim(),
        cityId: addr.cityId.trim(),
        countryId: addr.countryId.trim()
      }))
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
      <input value={name} onChange={(e) => setName(e.target.value)} />
      {errors.name && <div className="error">{errors.name}</div>}

      <label>DOB*:</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
      {errors.dob && <div className="error">{errors.dob}</div>}

      <label>NIC*:</label>
      <input value={nic} onChange={(e) => setNic(e.target.value)} />
      {errors.nic && <div className="error">{errors.nic}</div>}

      <label>Mobile Numbers:</label>
      {mobiles.map((m, idx) => (
        <div key={idx}>
          <input
            value={m}
            onChange={(e) => handleMobileChange(idx, e.target.value)}
          />
          {errors[`mobile_${idx}`] && <div className="error">{errors[`mobile_${idx}`]}</div>}
          <button type="button" onClick={() => setMobiles([...mobiles, ''])}>+</button>
        </div>
      ))}

      <label>Addresses:</label>
      {addresses.map((addr, idx) => (
        <div key={idx}>
          <input
            placeholder="Line 1"
            value={addr.line1}
            onChange={(e) => handleAddressChange(idx, 'line1', e.target.value)}
          />
          {errors[`address_${idx}_line1`] && <div className="error">{errors[`address_${idx}_line1`]}</div>}

          <input
            placeholder="Line 2"
            value={addr.line2}
            onChange={(e) => handleAddressChange(idx, 'line2', e.target.value)}
          />
          {errors[`address_${idx}_line2`] && <div className="error">{errors[`address_${idx}_line2`]}</div>}

          <input
            placeholder="City ID"
            value={addr.cityId}
            onChange={(e) => handleAddressChange(idx, 'cityId', e.target.value)}
          />
          {errors[`address_${idx}_cityId`] && <div className="error">{errors[`address_${idx}_cityId`]}</div>}

          <input
            placeholder="Country ID"
            value={addr.countryId}
            onChange={(e) => handleAddressChange(idx, 'countryId', e.target.value)}
          />
          {errors[`address_${idx}_countryId`] && <div className="error">{errors[`address_${idx}_countryId`]}</div>}

          <button type="button" onClick={() =>
            setAddresses([...addresses, { line1: '', line2: '', cityId: '', countryId: '' }])
          }>+</button>
        </div>
      ))}

      <br />
      <button type="submit">Save Customer</button>
    </form>
  );
}

export default CustomerForm;
