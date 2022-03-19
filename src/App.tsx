import { About, Home } from "components";
import { useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

const tabs = [
  {
    title: 'Home',
    route: '/',
  },
  {
    title: 'About',
    route: '/about'
  }
];

export const App = () => {

  const [activeTab, setActiveTab] = useState('Home');

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            {tabs.map(el => (
              <li key={el.title}>
                <Link
                  className={el.title === activeTab ? 'active' : ''}
                  onClick={() => setActiveTab(el.title)}
                  to={el.route}>
                  {el.title}
                </Link>
              </li>
            ))}
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