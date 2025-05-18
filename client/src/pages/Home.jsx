import CustomerTable from '../components/CustomerTable';
import FileUpload from '../components/FileUpload';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <section className="section">
        <h2 className="section-title">Customer List</h2>
        <CustomerTable />
      </section>

      <section className="section">
        <h3 className="section-subtitle">📁 Bulk Upload Customers</h3>
        <FileUpload />
      </section>
    </div>
  );
}

export default Home;
