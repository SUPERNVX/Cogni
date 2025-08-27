import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cogniLogo from './assets/Cogni.png'; // Importando o novo logo

import './style.css';
import './components/Header.css';

// Importação de componentes
import GlassNavigation from './components/GlassNavigation';
import LanguageSelector from './components/LanguageSelector';

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

// Componente de Layout que define a estrutura da página
const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-container dark-mode">
      <GlassNavigation position="top" />
      
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
