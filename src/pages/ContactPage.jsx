import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { Mail, MessageCircle, Clock, HelpCircle, Send, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

// Estado global para controlar se já animou na primeira visita
let hasContactAnimated = false;

// Componente para cards com efeitos
const ContactCard = ({ children, className = "", delay = 0, size = "normal" }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Verificar se é mobile
    const isMobile = window.innerWidth <= 768;

    // Se for mobile, mostrar diretamente sem animações
    if (isMobile) {
      gsap.set(card, { 
        opacity: 1, 
        y: 0,
        visibility: "visible"
      });
      return;
    }

    // Se já animou antes, mostrar diretamente
    if (hasContactAnimated) {
      gsap.set(card, { 
        opacity: 1, 
        y: 0,
        visibility: "visible"
      });
      return;
    }

    // Inicializar elemento invisível para primeira animação (apenas desktop)
    gsap.set(card, { 
      opacity: 0, 
      y: 30, // Slide sutil de baixo para cima
      visibility: "visible"
    });

    // Intersection Observer com threshold maior para aparecer mais cedo
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Marcar que já animou
            hasContactAnimated = true;
            
            // Animação de fade in com slide sutil
            gsap.to(card, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: delay,
              ease: "power2.out"
            });
            
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 } // Threshold maior para aparecer mais cedo
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };

    // Efeitos de hover suavizados (apenas desktop)
    if (!isMobile) {
      const handleMouseEnter = () => {
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.6,
          ease: "power1.out"
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power1.out"
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        card.removeEventListener('mouseenter', handleMouseEnter);
        card.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [delay]);

  const sizeClasses = {
    normal: "contact-card",
    large: "contact-card contact-card-large",
    wide: "contact-card contact-card-wide",
    tall: "contact-card contact-card-tall"
  };

  return (
    <div 
      ref={cardRef}
      className={`${sizeClasses[size]} ${className}`}
    >
      {children}
    </div>
  );
};

// Componente FAQ com expansão
const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="faq-item">
      <button className="faq-question" onClick={onToggle}>
        <span>{question}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

// Componente principal da página Contato
const ContactPage = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqData = [
    {
      question: "Quanto tempo leva para receber uma resposta?",
      answer: "Respondemos em até 24 horas durante dias úteis. Para questões urgentes, use nosso chat."
    },
    {
      question: "Posso sugerir novas funcionalidades?",
      answer: "Sim! Adoramos feedback dos usuários. Suas sugestões nos ajudam a melhorar constantemente."
    },
    {
      question: "Há suporte técnico disponível?",
      answer: "Oferecemos suporte completo via email e chat. Nossa equipe está pronta para ajudar."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envio
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setFormData({ name: '', email: '', category: '', message: '' });
    
    // Aqui você implementaria o envio real
    console.log('Formulário enviado:', formData);
  };

  return (
    <div className="contact-container">
      <div className="contact-grid">
        
        {/* Card do Formulário Principal - Large */}
        <ContactCard size="large" delay={0.1}>
          <div className="card-icon">
            <Send size={32} />
          </div>
          <div className="card-content">
            <h3 className="card-title">Fale Conosco</h3>
            <p className="card-description">
              Dúvidas, sugestões ou precisa de ajuda? Estamos aqui para acelerar seu sucesso acadêmico.
            </p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="category" className="form-label">Categoria</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">Selecione uma categoria</option>
                  <option value="suporte">Suporte Técnico</option>
                  <option value="sugestao">Sugestão de Melhoria</option>
                  <option value="bug">Reportar Bug</option>
                  <option value="parceria">Parceria</option>
                  <option value="outros">Outros</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-input"
                  placeholder="Descreva sua dúvida ou sugestão..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
                <Send size={16} />
              </button>
            </form>
          </div>
          <div className="card-glow"></div>
        </ContactCard>

        {/* Card de Informações de Contato */}
        <ContactCard delay={0.2}>
          <div className="card-icon">
            <Mail size={28} />
          </div>
          <div className="card-content">
            <h3 className="card-title">Informações de Contato</h3>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <Mail size={16} />
                <div>
                  <span className="info-label">E-mail</span>
                  <span className="info-value">contato@cogni-ia.com</span>
                </div>
              </div>
              <div className="contact-info-item">
                <MessageCircle size={16} />
                <div>
                  <span className="info-label">Chat</span>
                  <span className="info-value">Disponível no site</span>
                </div>
              </div>
              <div className="contact-info-item">
                <MapPin size={16} />
                <div>
                  <span className="info-label">Localização</span>
                  <span className="info-value">Brasil</span>
                </div>
              </div>
            </div>
          </div>
        </ContactCard>

        {/* Card de Tempo de Resposta */}
        <ContactCard delay={0.3}>
          <div className="card-icon">
            <Clock size={28} />
          </div>
          <div className="card-content">
            <h3 className="card-title">Tempo de Resposta</h3>
            <div className="response-times">
              <div className="response-item">
                <div className="response-type">Suporte Geral</div>
                <div className="response-time">24h</div>
              </div>
              <div className="response-item">
                <div className="response-type">Bugs Críticos</div>
                <div className="response-time">4h</div>
              </div>
              <div className="response-item">
                <div className="response-type">Parcerias</div>
                <div className="response-time">48h</div>
              </div>
            </div>
          </div>
        </ContactCard>

        {/* Card de FAQ */}
        <ContactCard delay={0.4}>
          <div className="card-icon">
            <HelpCircle size={28} />
          </div>
          <div className="card-content">
            <h3 className="card-title">Perguntas Frequentes</h3>
            <div className="faq-list">
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openFAQ === index}
                  onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
                />
              ))}
            </div>
          </div>
        </ContactCard>

      </div>
    </div>
  );
};

export default ContactPage;
