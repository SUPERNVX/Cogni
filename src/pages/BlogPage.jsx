// Componente para a página "Blog"
const BlogPage = () => (
  <div className="main-grid-container">
    <div className="widget widget-secondary widget-full-width">
      <p className="section-title">Estratégias para Dominar Seus Estudos</p>
      <p className="section-subtitle">Dicas exclusivas, métodos comprovados e insights que vão acelerar seu progresso acadêmico.</p>
    </div>
    <div className="widget widget-secondary blog-card">
      <p className="blog-title">5 Segredos para Redações Nota 1000</p>
      <p className="blog-text">
        Descubra as técnicas que os melhores estudantes usam e como a IA do Scribo pode potencializar sua escrita para alcançar a nota máxima.
      </p>
    </div>
    <div className="widget widget-secondary blog-card">
      <p className="blog-title">Como Calcular Suas Notas Estrategicamente</p>
      <p className="blog-text">
        Pare de torcer para passar! Aprenda a planejar suas notas com precisão matemática e elimine a ansiedade dos resultados.
      </p>
    </div>
  </div>
);

export default BlogPage;
