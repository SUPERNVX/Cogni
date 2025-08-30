import { useEffect, Suspense, lazy, useState } from 'react';
import { Routes, Route, useLocation, Outlet, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cogniLogo from './assets/Cogni.png'; // Importando o novo logo
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Home, Brain, SquareGanttChart, Mail } from 'lucide-react';

import './style.css';
import './components/Header.css';
import './components/GlassNavigation.css';

// Importação de componentes
import GlassNavigation from './components/GlassNavigation';
import LanguageSelector from './components/LanguageSelector';
import GlassSurface from './components/GlassSurface';

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Importação dinâmica (Lazy Loading) das páginas
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Componente de Header reutilizável - ATUALIZADO
const Header = () => {
  const { t } = useTranslation();
  
  return (
    <div className="header-container">
      <div className="header-right-content">
        <div className="logo-container">
          <img src={cogniLogo} alt={t('header.logoAlt')} className="logo-image" />
          <span className="logo-text">{t('header.logoText')}</span>
        </div>
        <LanguageSelector />
      </div>
    </div>
  );
};

const DesktopNavigation = () => {
  const { t } = useTranslation();
  const navItems = [
    { name: t('nav.home'), path: '/', icon: <Home size={22} /> },
    { name: t('nav.about'), path: '/about', icon: <Brain size={22} /> },
    { name: t('nav.projects'), path: '/projects', icon: <SquareGanttChart size={22} /> },
    { name: t('nav.contact'), path: '/contact', icon: <Mail size={22} /> },
  ];

  return (
    <div className="glass-nav-container glass-nav-top">
      <GlassSurface
        width={500}
        height={66}
        borderRadius={20}
        className="desktop-nav-surface"
        blur={20}
        displace={1.5}
        redOffset={0}
        greenOffset={0}
        blueOffset={0}
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
}

// Componente de Layout que define a estrutura da página
const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="app-container dark-mode">
      {isDesktop ? <DesktopNavigation /> : <GlassNavigation position="top" />}
      
      {isHomePage ? (
        <main className="main-content-spline">
          <Header />
          <Outlet /> {/* Renderiza a página da rota aninhada */}
        </main>
      ) : (
        <div className="main-content-wrapper">
          <Header />
          <main className="main-content">
            <Outlet /> {/* Renderiza a página da rota aninhada */}
          </main>
        </div>
      )}
    </div>
  );
};

// Componente principal da aplicação - ATUALIZADO
const App = () => {
  const { t } = useTranslation();
  
  const loadingFallback = (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      width: '100vw', 
      height: '100vh', 
      background: 'var(--color-background)',
      color: 'var(--color-text-primary)' 
    }}>
      <p>{t('common.loading')}</p>
    </div>
  );

  return (
    <Suspense fallback={loadingFallback}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Rota de fallback para a home */}
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;