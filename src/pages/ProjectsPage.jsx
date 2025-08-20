import MagicBento from '../components/MagicBento';

// Componente para a página "Projetos"
const ProjectsPage = () => (
  <MagicBento 
    textAutoHide={true}
    enableStars={true}
    enableSpotlight={true}
    enableBorderGlow={true}
    enableTilt={true}
    enableMagnetism={false}
    clickEffect={false}
    spotlightRadius={300}
    particleCount={12}
    glowColor="132, 0, 255"
  />
);

export default ProjectsPage;
