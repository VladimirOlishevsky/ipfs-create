import { About, Home } from "components";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}