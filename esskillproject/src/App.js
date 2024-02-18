import './App.css';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import Get from './Get';

function App() {
  return (
    <Router>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mx-auto">
            <div className="collapse navbar-collapse" id="navbarNav center">
                <ul className="navbar-nav mx-auto">
                    <li className="nav-item">
                        <NavLink to={`/`} className="nav-link">
                            All
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
        <Routes>
            <Route path="/" element={<Get />} />
        </Routes>
    </Router>
  );
}

export default App;
