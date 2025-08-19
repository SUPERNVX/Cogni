import { useEffect } from 'react';
import { Routes, Route, useLocation, Outlet } from 'react-router-dom';
import { Brain } from 'lucide-react';

import './style.css';

// Importação de componentes e páginas
import GlassNavigation from './components/GlassNavigation';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';

// Componente de Header reutilizável
const Header = () => (
  <div className="header-container">
    <div className="header-right-content">
      <div className="logo-container">
        <Brain size={32} className="logo-icon" />
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

// Componente principal da aplicação
const App = () => {
  // O efeito para carregar fontes foi movido para o index.html para melhor performance

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Rota de fallback para a home */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default App;
