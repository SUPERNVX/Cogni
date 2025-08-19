// Componente para a página "Contato"
const ContactPage = () => (
  <div className="contact-form-container">
    <div className="widget widget-secondary">
      <p className="section-title">Precisa de Ajuda? Estamos Aqui!</p>
      <p className="section-subtitle">
        Dúvidas sobre nossas ferramentas? Quer sugerir melhorias? Fale conosco e acelere seu sucesso acadêmico.
      </p>
      <form className="contact-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nome
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Mensagem
          </label>
          <textarea
            id="message"
            rows={4}
            className="form-input"
          ></textarea>
        </div>
        <button
          type="submit"
          className="main-button submit-button"
        >
          Enviar Minha Mensagem
        </button>
      </form>
    </div>
  </div>
);

export default ContactPage;
