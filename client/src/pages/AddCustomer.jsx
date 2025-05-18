import CustomerForm from '../components/CustomerForm';
import { useNavigate } from 'react-router-dom';

function AddCustomer() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <CustomerForm onSuccess={() => navigate('/')} />
    </div>
  );
}

export default AddCustomer;
