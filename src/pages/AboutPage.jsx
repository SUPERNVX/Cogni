import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { Target, Eye, Star, TrendingUp, Users, Zap, Brain, Award } from 'lucide-react';

// Componente para números animados
const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          gsap.to({ value: 0 }, {
            value: end,
            duration: duration,
            ease: "power2.out",
            onUpdate: function() {
              setCount(Math.floor(this.targets()[0].value));
            }
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={countRef}>{count.toLocaleString()}{suffix}</span>;
};

// Componente para cards com efeitos
const AboutCard = ({ children, className = "", delay = 0, size = "normal" }) => {
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

    // Prevenir interferência com links
    const handleCardClick = (e) => {
      // Se o clique foi em um link, não fazer nada
      if (e.target.closest('.card-action-link')) {
        return;
      }
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('click', handleCardClick);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('click', handleCardClick);
    };
  }, [delay]);

  const sizeClasses = {
    normal: "about-card",
    large: "about-card about-card-large",
    wide: "about-card about-card-wide",
    tall: "about-card about-card-tall"
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

// Componente principal da página Sobre
const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <div className="about-container">
      {/* Grid principal com layout bento */}
      <div className="about-grid">
        
        {/* Card de Missão - Grande */}
        <AboutCard size="large" delay={0.1}>
          <div className="card-icon">
            <Target size={32} />
          </div>
          <div className="card-content">
            <h3 className="card-title">{t('about.mission.title')}</h3>
            <p className="card-description">
              {t('about.mission.description')}
            </p>
          </div>
          <div className="card-glow"></div>
        </AboutCard>

        {/* Card de Visão - Grande */}
        <AboutCard size="large" delay={0.2}>
          <div className="card-icon">
            <Eye size={32} />
          </div>
          <div className="card-content">
            <h3 className="card-title">{t('about.vision.title')}</h3>
            <p className="card-description">
              {t('about.vision.description')}
            </p>
          </div>
          <div className="card-glow"></div>
        </AboutCard>

        {/* Card de Estatísticas - Wide */}
        <AboutCard size="wide" delay={0.3}>
          <div className="card-icon">
            <TrendingUp size={32} />
          </div>
          <div className="card-content">
            <h3 className="card-title">{t('about.stats.title')}</h3>
            <div className="stats-container">
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter end={15000} suffix="+" />
                </div>
                <div className="stat-label">{t('about.stats.students')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter end={500} suffix="+" />
                </div>
                <div className="stat-label">{t('about.stats.schools')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <div className="stat-label">{t('about.stats.satisfaction')}</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter end={35} suffix="%" />
                </div>
                <div className="stat-label">{t('about.stats.improvement')}</div>
              </div>
            </div>
          </div>
          <div className="card-glow"></div>
        </AboutCard>

        {/* Card de Valores */}
        <AboutCard delay={0.4}>
          <div className="card-icon">
            <Star size={28} />
          </div>
          <div className="card-content">
            <h3 className="card-title">{t('about.values.title')}</h3>
            <p className="card-description">
              {t('about.values.description')}
            </p>
          </div>
        </AboutCard>

        {/* Card de Diferencial - Tall */}
        <AboutCard size="tall" delay={0.5}>
          <div className="card-icon">
            <Brain size={32} />
          </div>
          <div className="card-content">
            <h3 className="card-title">{t('about.differential.title')}</h3>
            <p className="card-description">
              {t('about.differential.description')}
            </p>
          </div>
        </AboutCard>

        {/* Card de Tecnologia */}
        <AboutCard delay={0.6}>
          <div className="card-icon tech-icon">
            <Zap size={28} />
          </div>
          <div className="card-content">
            <h3 className="card-title">{t('about.technology.title')}</h3>
            <p className="card-description">
              {t('about.technology.description')}
            </p>
          </div>
          <div className="tech-particles"></div>
        </AboutCard>

      </div>
    </div>
  );
};

export default AboutPage;
