import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import AddCustomer from './pages/AddCustomer';
import ViewCustomer from './pages/ViewCustomer';
import EditCustomer from './pages/EditCustomer';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCustomer />} />
        <Route path="/edit/:id" element={<EditCustomer />} />
        <Route path="/view/:id" element={<ViewCustomer />} />
      </Routes>
    </div>
  );
}

export default App;
