// Componente para a página "Sobre"
const AboutPage = () => (
  <div className="main-grid-container grid-cols-1 md:grid-cols-2">
    <div className="widget widget-secondary">
      <h2 className="section-title">Nossa Missão, Visão e Valores</h2>
      <p className="section-subtitle">
        Revolucionamos a educação com IA que realmente entende estudantes.
      </p>
      <div className="section-content">
        <div>
          <h3 className="section-item-title highlight-text">Missão</h3>
          <p className="section-item-text">
            Capacitar cada estudante a alcançar seu máximo potencial acadêmico através de ferramentas inteligentes e personalizadas.
          </p>
        </div>
        <div>
          <h3 className="section-item-title highlight-text">Visão</h3>
          <p className="section-item-text">
            Tornar-se a plataforma número 1 em ferramentas educacionais de IA, transformando como estudantes aprendem e se preparam.
          </p>
        </div>
        <div>
          <h3 className="section-item-title highlight-text">Valores</h3>
          <p className="section-item-text">Resultados reais, tecnologia acessível, inovação constante e sucesso estudantil.</p>
        </div>
      </div>
    </div>

    <div className="widget widget-secondary">
      <h2 className="section-title">Por que somos diferentes</h2>
      <p className="section-subtitle">
        Não somos mais uma plataforma de cursos. Somos seus parceiros no sucesso.
      </p>
      <div className="section-content">
        <div>
          <h3 className="section-item-title text-emerald">Foco em Resultados</h3>
          <p className="section-item-text">
            Enquanto outros oferecem conteúdo genérico, nós criamos ferramentas que se adaptam ao seu estilo de aprendizado e objetivos específicos.
          </p>
        </div>
        <div>
          <h3 className="section-item-title text-red">IA que Realmente Ajuda</h3>
          <p className="section-item-text">
            Nossa tecnologia não apenas corrige - ela ensina, orienta e acelera seu progresso acadêmico de forma personalizada.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default AboutPage;
