import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Get from './pages/Get';
import AddContainer from './pages/Add';
import GetBlock from './pages/GetBlock';
import Edit from './pages/Edit';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mx-auto">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <NavLink to={`/`} className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={`/add`} className="nav-link">
                Add container
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/add" element={<AddContainer />} />
        <Route path="/containers/:Id" element={<GetBlock />} />
        <Route path="/" element={<Get />} />
        <Route path="edit/:containerId" element={<Edit />} />
      </Routes>
    </Router>
  );
}

export default App;
