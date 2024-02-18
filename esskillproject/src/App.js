import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Get from './pages/Get';
import AddContainer from './pages/Add';
import GetBlock from './pages/GetBlock';

function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mx-auto">
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <NavLink to={`/`} className="nav-link">
                            All
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
            <Route path="/" element={<Get />} />
            <Route path="/add" element={<AddContainer />} />
            <Route path="/block/:blockId" element={<GetBlock />} />
        </Routes>
    </Router>
  );
}

export default App;
