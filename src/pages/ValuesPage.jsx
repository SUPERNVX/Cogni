import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, TrendingUp, Users, Zap, Shield, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './ValuesPage.css';

// Componente para cards com efeitos
const ValuesCard = ({ children, className = "", delay = 0, size = "normal" }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Animação de entrada
    gsap.fromTo(card, 
      { 
        opacity: 0, 
        y: 50,
        scale: 0.95
      },
      { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 0.8,
        delay: delay,
        ease: "power3.out"
      }
    );

    // Efeitos de hover suavizados
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
  }, [delay]);

  const sizeClasses = {
    normal: "values-card",
    large: "values-card values-card-large",
    wide: "values-card values-card-wide"
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

// Mapeamento de ícones
const iconMap = {
  TrendingUp,
  Users,
  Zap,
  Shield,
  Heart,
  Award
};

// Componente principal da página de Valores
const ValuesPage = () => {
  const { t } = useTranslation();
  const coreValues = t('aboutPage.valuesPage.coreValues', { returnObjects: true });

  return (
    <div className="values-container">
      {/* Header da página */}
      <div className="values-header">
        <div className="values-hero">
          <div className="hero-icon">
            <Heart size={48} />
          </div>
          <h1 className="hero-title">{t('aboutPage.valuesPage.title')}</h1>
          <p className="hero-subtitle">{t('aboutPage.valuesPage.subtitle')}</p>
        </div>
      </div>

      {/* Grid principal com layout bento */}
      <div className="values-grid">
        
        {/* Card principal de conteúdo */}
        <ValuesCard size="wide" delay={0.1}>
          <div className="card-content">
            <p className="values-content">
              {t('aboutPage.valuesPage.content')}
            </p>
          </div>
          <div className="card-glow"></div>
        </ValuesCard>

        {/* Cards de valores centrais */}
        {Array.isArray(coreValues) && coreValues.map((value, index) => {
          const IconComponent = iconMap[value.icon] || Heart;
          const gradients = [
            'var(--gradient-primary)',
            'var(--gradient-secondary)', 
            'var(--gradient-tertiary)',
            'linear-gradient(135deg, #FF6B6B, #4ECDC4)',
            'linear-gradient(135deg, #667eea, #764ba2)',
            'linear-gradient(135deg, #f093fb, #f5576c)'
          ];
          
          return (
            <ValuesCard key={index} delay={0.2 + index * 0.1}>
              <div className="card-icon" style={{ background: gradients[index % gradients.length] }}>
                <IconComponent size={28} />
              </div>
              <div className="card-content">
                <h3 className="card-title">{value.title}</h3>
                <p className="card-description">{value.description}</p>
              </div>
              <div className="card-glow"></div>
            </ValuesCard>
          );
        })}

      </div>
    </div>
  );
};

export default ValuesPage;