import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Eye, User, Globe, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './VisionPage.css';

// Componente para cards com efeitos
const VisionCard = ({ children, className = "", delay = 0, size = "normal" }) => {
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
    normal: "vision-card",
    large: "vision-card vision-card-large",
    wide: "vision-card vision-card-wide"
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

// Componente principal da página de Visão
const VisionPage = () => {
  const { t } = useTranslation();

  return (
    <div className="vision-container">
      {/* Header da página */}
      <div className="vision-header">
        <div className="vision-hero">
          <div className="hero-icon">
            <Eye size={48} />
          </div>
          <h1 className="hero-title">{t('aboutPage.visionPage.title')}</h1>
          <p className="hero-subtitle">{t('aboutPage.visionPage.subtitle')}</p>
        </div>
      </div>

      {/* Grid principal com layout bento */}
      <div className="vision-grid">
        
        {/* Card principal de conteúdo */}
        <VisionCard size="wide" delay={0.1}>
          <div className="card-content">
            <p className="vision-content">
              {t('aboutPage.visionPage.content')}
            </p>
          </div>
          <div className="card-glow"></div>
        </VisionCard>

        {/* Cards de objetivos */}
        {[
          { icon: User, color: 'var(--gradient-primary)' },
          { icon: Globe, color: 'var(--gradient-secondary)' },
          { icon: Zap, color: 'var(--gradient-tertiary)' }
        ].map((item, index) => (
          <VisionCard key={index} delay={0.2 + index * 0.1}>
            <div className="card-icon" style={{ background: item.color }}>
              <item.icon size={28} />
            </div>
            <div className="card-content">
              <h3 className="card-title">{t(`aboutPage.visionPage.goals.${index}.title`)}</h3>
              <p className="card-description">{t(`aboutPage.visionPage.goals.${index}.description`)}</p>
            </div>
            <div className="card-glow"></div>
          </VisionCard>
        ))}

      </div>
    </div>
  );
};

export default VisionPage;