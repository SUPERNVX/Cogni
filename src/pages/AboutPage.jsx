import { useEffect, useRef, useState } from 'react';
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
            <h3 className="card-title">Feedback que Transforma</h3>
            <p className="card-description">
              Estudos mostram que feedback direcionado aumenta a retenção de conhecimento em até <strong>75%</strong>. O Scribo não apenas corrige, mas ensina a estrutura e o estilo que faltam em sua escrita.
            </p>
            <span className="card-action-text">
              Saiba Mais sobre a Metodologia →
            </span>
          </div>
          <div className="card-glow"></div>
        </AboutCard>

        {/* Card de Visão - Grande */}
        <AboutCard size="large" delay={0.2}>
          <div className="card-icon">
            <Eye size={32} />
          </div>
          <div className="card-content">
            <h3 className="card-title">Foco na Produtividade</h3>
            <p className="card-description">
              Alunos que definem metas claras e tangíveis têm <strong>42%</strong> mais chances de alcançá-las. Gradus, nossa calculadora de notas, é a sua primeira etapa para um plano de estudos eficaz.
            </p>
            <span className="card-action-text">
              Entenda a Importância da Meta →
            </span>
          </div>
          <div className="card-glow"></div>
        </AboutCard>

        {/* Card de Estatísticas - Wide */}
        <AboutCard size="wide" delay={0.3}>
          <div className="stats-container">
            <div className="stat-item">
              <div className="stat-number">
                -
              </div>
              <div className="stat-label">Estudantes Ajudados</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                até 50%
              </div>
              <div className="stat-label">Melhoria nas Notas</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <div className="stat-label">Suporte Disponível</div>
            </div>
          </div>
        </AboutCard>

        {/* Card de Valores */}
        <AboutCard delay={0.4}>
          <div className="card-icon">
            <Star size={28} />
          </div>
          <div className="card-content">
            <h3 className="card-title">Nossos Valores</h3>
            <div className="values-list">
              <div className="value-item">
                <Award size={16} />
                <span>Resultados Reais</span>
              </div>
              <div className="value-item">
                <Users size={16} />
                <span>Acessibilidade</span>
              </div>
              <div className="value-item">
                <Zap size={16} />
                <span>Inovação Constante</span>
              </div>
            </div>
          </div>
        </AboutCard>

        {/* Card de Diferencial - Tall */}
        <AboutCard size="tall" delay={0.5}>
          <div className="card-icon">
            <Brain size={32} />
          </div>
          <div className="card-content">
            <h3 className="card-title">Por que somos diferentes</h3>
            <div className="differentials">
              <div className="differential-item">
                <TrendingUp size={20} />
                <div>
                  <h4>Foco em Resultados</h4>
                  <p>Ferramentas que se adaptam ao seu estilo de aprendizado</p>
                </div>
              </div>
              <div className="differential-item">
                <Brain size={20} />
                <div>
                  <h4>IA que Realmente Ajuda</h4>
                  <p>Tecnologia que ensina, orienta e acelera seu progresso</p>
                </div>
              </div>
              <div className="differential-item">
                <Users size={20} />
                <div>
                  <h4>Dados Persistentes</h4>
                  <p>Seu progresso nunca se perde. Histórico completo, análises detalhadas e evolução contínua sempre disponíveis</p>
                </div>
              </div>
              <div className="differential-item">
                <Award size={20} />
                <div>
                  <h4>Gamificação Inteligente</h4>
                  <p>Sistema de conquistas que motiva e recompensa cada avanço no seu aprendizado</p>
                </div>
              </div>
            </div>
          </div>
        </AboutCard>

        {/* Card de Tecnologia */}
        <AboutCard delay={0.6}>
          <div className="card-icon tech-icon">
            <Zap size={28} />
          </div>
          <div className="card-content">
            <h3 className="card-title">Tecnologia Avançada</h3>
            <p className="card-description">
              Utilizamos as mais recentes tecnologias de IA para criar uma experiência de aprendizado única e personalizada.
            </p>
          </div>
          <div className="tech-particles"></div>
        </AboutCard>

      </div>
    </div>
  );
};

export default AboutPage;
