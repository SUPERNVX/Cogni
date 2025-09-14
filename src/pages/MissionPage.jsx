import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Target, Award, Users, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './MissionPage.css';

// Componente para cards com efeitos
const MissionCard = ({ children, className = "", delay = 0, size = "normal" }) => {
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
    normal: "mission-card",
    large: "mission-card mission-card-large",
    wide: "mission-card mission-card-wide"
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

// Componente principal da página de Missão
const MissionPage = () => {
  const { t } = useTranslation();

  return (
    <div className="mission-container">
      {/* Header da página */}
      <div className="mission-header">
        <div className="mission-hero">
          <div className="hero-icon">
            <Target size={48} />
          </div>
          <h1 className="hero-title">{t('aboutPage.missionPage.title')}</h1>
          <p className="hero-subtitle">{t('aboutPage.missionPage.subtitle')}</p>
        </div>
      </div>

      {/* Grid principal com layout bento */}
      <div className="mission-grid">
        
        {/* Card principal de conteúdo */}
        <MissionCard size="wide" delay={0.1}>
          <div className="card-content">
            <p className="mission-content">
              {t('aboutPage.missionPage.content')}
            </p>
          </div>
          <div className="card-glow"></div>
        </MissionCard>

        {/* Cards de valores */}
        {[
          { icon: Award, color: 'var(--gradient-primary)' },
          { icon: Users, color: 'var(--gradient-secondary)' },
          { icon: Shield, color: 'var(--gradient-tertiary)' }
        ].map((item, index) => (
          <MissionCard key={index} delay={0.2 + index * 0.1}>
            <div className="card-icon" style={{ background: item.color }}>
              <item.icon size={28} />
            </div>
            <div className="card-content">
              <h3 className="card-title">{t(`aboutPage.missionPage.values.${index}.title`)}</h3>
              <p className="card-description">{t(`aboutPage.missionPage.values.${index}.description`)}</p>
            </div>
            <div className="card-glow"></div>
          </MissionCard>
        ))}

      </div>
    </div>
  );
};

export default MissionPage;