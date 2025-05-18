import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ViewCustomer.css';

function ViewCustomer() {
    const { id } = useParams();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8080/api/customers/${id}`)
            .then(res => setCustomer(res.data))
            .catch(err => console.error(err));
    }, [id]);

    if (!customer) return <p>Loading...</p>;

    return (
        <div className="view-customer-container">
            <h2>Customer Details</h2>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Date of Birth:</strong> {customer.dob}</p>
            <p><strong>NIC:</strong> {customer.nic}</p>

            <h4 className="section-title">Mobile Numbers</h4>
            {customer.mobiles?.length > 0 ? (
                <ul>
                    {customer.mobiles.map((num, idx) => <li key={idx}>{num}</li>)}
                </ul>
            ) : (
                <p>No mobile numbers provided.</p>
            )}

            <h4 className="section-title">Addresses</h4>
            {customer.addresses?.length > 0 ? (
                customer.addresses.map((addr, idx) => (
                    <div key={idx} className="address-block">
                        <p>{addr.line1}, {addr.line2}</p>
                        <p>{addr.city?.name || addr.cityId}, {addr.country?.name || addr.countryId}</p>
                    </div>
                ))
            ) : (
                <p>No addresses provided.</p>
            )}

            <h4 className="section-title">Family Members</h4>
            {customer.familyMembers?.length > 0 ? (
                <ul>
                    {customer.familyMembers.map((fm, idx) => (
                        <li key={idx}>{fm.name} (NIC: {fm.nic})</li>
                    ))}
                </ul>
            ) : (
                <p>No family members listed.</p>
            )}
        </div>

    );
}

export default ViewCustomer;
