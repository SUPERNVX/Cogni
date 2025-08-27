import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Mail, MessageCircle, Clock, HelpCircle, Send, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

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
      question: t('contactPage.faq.q1'),
      answer: t('contactPage.faq.a1')
    },
    {
      question: t('contactPage.faq.q2'),
      answer: t('contactPage.faq.a2')
    },
    {
      question: t('contactPage.faq.q3'),
      answer: t('contactPage.faq.a3')
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
            <h3 className="card-title">{t('contactPage.title')}</h3>
            <p className="card-description">
              {t('contactPage.description')}
            </p>
            
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">{t('contactPage.form.name')}</label>
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
                <label htmlFor="email" className="form-label">{t('contactPage.form.email')}</label>
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
                <label htmlFor="category" className="form-label">{t('contactPage.form.category')}</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                >
                  <option value="">{t('contactPage.form.selectCategory')}</option>
                  <option value="suporte">{t('contactPage.form.support')}</option>
                  <option value="sugestao">{t('contactPage.form.suggestion')}</option>
                  <option value="bug">{t('contactPage.form.bug')}</option>
                  <option value="parceria">{t('contactPage.form.partnership')}</option>
                  <option value="outros">{t('contactPage.form.other')}</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">{t('contactPage.form.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="form-input"
                  placeholder={t('contactPage.form.placeholder')}
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('contactPage.form.submitting') : t('contactPage.form.submit')}
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
            <h3 className="card-title">{t('contactPage.info.title')}</h3>
            <div className="contact-info-list">
              <div className="contact-info-item">
                <Mail size={16} />
                <div>
                  <span className="info-label">{t('contactPage.info.email')}</span>
                  <span className="info-value">{t('contactPage.info.emailValue')}</span>
                </div>
              </div>
              <div className="contact-info-item">
                <MessageCircle size={16} />
                <div>
                  <span className="info-label">{t('contactPage.info.chat')}</span>
                  <span className="info-value">{t('contactPage.info.chatValue')}</span>
                </div>
              </div>
              <div className="contact-info-item">
                <MapPin size={16} />
                <div>
                  <span className="info-label">{t('contactPage.info.location')}</span>
                  <span className="info-value">{t('contactPage.info.locationValue')}</span>
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
            <h3 className="card-title">{t('contactPage.response.title')}</h3>
            <div className="response-times">
              <div className="response-item">
                <div className="response-type">{t('contactPage.response.general')}</div>
                <div className="response-time">{t('contactPage.response.generalTime')}</div>
              </div>
              <div className="response-item">
                <div className="response-type">{t('contactPage.response.critical')}</div>
                <div className="response-time">{t('contactPage.response.criticalTime')}</div>
              </div>
              <div className="response-item">
                <div className="response-type">{t('contactPage.response.partnerships')}</div>
                <div className="response-time">{t('contactPage.response.partnershipsTime')}</div>
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
            <h3 className="card-title">{t('contactPage.faq.title')}</h3>
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
