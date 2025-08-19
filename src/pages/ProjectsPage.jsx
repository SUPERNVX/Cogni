// Componente para a página "Projetos"
const ProjectsPage = () => (
  <div className="main-grid-container">
    <div className="widget widget-secondary widget-full-width">
      <p className="section-title">Ferramentas que Garantem Resultados</p>
      <p className="section-subtitle">Pare de estudar mais. Comece a estudar melhor com nossas ferramentas inteligentes.</p>
    </div>
    <div className="widget widget-secondary">
      <p className="widget-title highlight-text">Scribo</p>
      <p className="widget-text">
        Transforme sua escrita em uma arma poderosa! IA avançada que corrige, ensina e aperfeiçoa suas redações para ENEM e vestibulares. Feedback instantâneo que realmente faz diferença.
      </p>
      <a href="#" className="widget-link">
        Experimente o Scribo Grátis &rarr;
      </a>
    </div>
    <div className="widget widget-secondary">
      <p className="widget-title highlight-text">Calculadora de Notas</p>
      <p className="widget-text">
        Elimine a ansiedade das notas! Saiba exatamente quanto precisa tirar em cada prova para atingir sua meta. Planejamento estratégico para seu sucesso acadêmico.
      </p>
      <a href="#" className="widget-link">
        Calcule Suas Metas Agora &rarr;
      </a>
    </div>
  </div>
);

export default ProjectsPage;
