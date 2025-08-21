import { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import cogniLogo from './assets/Cogni.png'; // Importando o novo logo

import './style.css';

// Importação de componentes
import GlassNavigation from './components/GlassNavigation';

// Importação dinâmica (Lazy Loading) das páginas
const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

// Componente de Header reutilizável - ATUALIZADO
const Header = () => (
  <div className="header-container">
    <div className="header-right-content">
      <div className="logo-container">
        <img src={cogniLogo} alt="Cogni IA Logo" className="logo-image" />
        <span className="logo-text">Cogni IA</span>
      </div>
    </div>
  </div>
);

// Componente de Layout que define a estrutura da página
const AppLayout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app-container dark-mode">
      <GlassNavigation position="top" />
      
      {isHomePage ? (
        <>
          <Header />
          <main className="main-content-spline">
            <Outlet /> {/* Renderiza a página da rota aninhada */}
          </main>
        </>
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
      <p>Carregando...</p>
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
