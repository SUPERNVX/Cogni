import { Home, NotebookPen, Brain, SquareGanttChart, Mail } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import GlassSurface from './GlassSurface';
import './GlassNavigation.css';

const GlassNavigation = ({ position = 'bottom' }) => {
  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={22} /> },
    { name: 'Sobre', path: '/about', icon: <Brain size={22} /> },
    { name: 'Projetos', path: '/projects', icon: <SquareGanttChart size={22} /> },
    { name: 'Blog', path: '/blog', icon: <NotebookPen size={22} /> },
    { name: 'Contato', path: '/contact', icon: <Mail size={22} /> },
  ];

  return (
    <div className={`glass-nav-container glass-nav-${position}`}>
      <GlassSurface
        width="auto"
        height={66}
        borderRadius={20}
        backgroundOpacity={0}
        brightness={40}
        opacity={0.8}
        blur={8}
        saturation={1.2}
        className="glass-nav-surface"
      >
        <div className="glass-nav-content">
          <div className="glass-nav-items">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `glass-nav-button ${isActive ? 'glass-nav-button-active' : ''}`
                }
              >
                <div className="glass-nav-icon">
                  {item.icon}
                </div>
                <span className="glass-nav-text">{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </GlassSurface>
    </div>
  );
};

export default GlassNavigation;