import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';
import SplitText from '../components/SplitText';
import './HomePage.css';

// Registrar o plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const navigate = useNavigate();
  const splineContainerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const additionalContentRef = useRef(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [splineError, setSplineError] = useState(false);

  useEffect(() => {
    // Só inicializar animações após o Spline carregar
    if (!splineLoaded) return;

    // GSAP Context para gerenciamento e limpeza automática das animações,
    // usando a ref existente do container de scroll como escopo.
    const ctx = gsap.context(() => {
      // Animação de parallax para o Spline
      gsap.to(splineContainerRef.current, {
        y: "-50vh",
        ease: "none",
        scrollTrigger: {
          trigger: scrollContentRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Animação para o widget de vidro principal
      gsap.from(".glass-widget-main", {
        scaleX: 0.1,
        scaleY: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ".glass-widget-main",
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      });

      // Animação para o título e texto dentro do widget
      gsap.from(".glass-widget-title h2, .glass-widget-text-preview p", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".glass-widget-main",
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });

      // Animação para revelar o conteúdo expandido no scroll
      gsap.to(".glass-widget-expanded", {
        scrollTrigger: {
          trigger: ".glass-widget-expanded",
          start: "top 80%",
          toggleClass: 'visible',
          onEnter: () => {
            // Animar widgets overlay com stagger do GSAP
            gsap.to(".overlay-widget", {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.2,
            });
          }
        }
      });

    }, scrollContentRef); // <-- Escopo do contexto para limpeza

    // Cleanup
    return () => ctx.revert();

  }, [splineLoaded]);

  const handleSplineLoad = () => {
    console.log('✅ Spline carregado com sucesso!');
    console.log('🔍 Verificando canvas no DOM...');
    
    setTimeout(() => {
      const canvas = document.querySelector('canvas');
      const splineContainer = document.querySelector('.spline-container-debug');
      
      console.log('Canvas encontrado:', canvas);
      console.log('Container debug encontrado:', splineContainer);
      
      if (canvas) {
        console.log('Canvas dimensions:', {
          width: canvas.width,
          height: canvas.height,
          style: canvas.style.cssText,
          offsetWidth: canvas.offsetWidth,
          offsetHeight: canvas.offsetHeight
        });
      }
    }, 1000);
    
    setSplineLoaded(true);
    setSplineError(false);
  };

  const handleSplineError = (error) => {
    console.error('❌ Erro ao carregar Spline:', error);
    setSplineError(true);
    setSplineLoaded(false);
  };

  return (
    <div className="spline-home-container">
      {/* Background fixo com Spline */}
      <div className="spline-background" ref={splineContainerRef}>
        {/* Fallback visual para debug */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #8B5CF6, #60A5FA)',
          opacity: splineLoaded ? 0 : 0.2,
          transition: 'opacity 0.8s ease',
          zIndex: 0
        }} />
        
        {!splineLoaded && !splineError && (
          <div className="spline-loading">
            <div className="spline-loading-spinner"></div>
            <p>Preparando experiência 3D...</p>
            <div className="spline-loading-progress">
              <div className="spline-loading-bar"></div>
            </div>
          </div>
        )}
        
        {splineError && (
          <div className="spline-error">
            <div className="spline-error-content">
              <h3>Ops! Problema ao carregar a cena 3D</h3>
              <p>Mas não se preocupe, o conteúdo continua disponível abaixo.</p>
              <button onClick={() => window.location.reload()} className="spline-retry-button">
                Tentar Novamente
              </button>
            </div>
          </div>
        )}
        
        <div 
          style={{ 
            width: '100%', 
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 1,
            opacity: splineLoaded ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          className="spline-container-debug"
        >
          <Spline 
            scene="https://prod.spline.design/gYzfbsul0KzYa6uV/scene.splinecode"
            onLoad={handleSplineLoad}
            onError={handleSplineError}
            style={{
              pointerEvents: 'auto',
              touchAction: 'auto',
              width: '100%',
              height: '100%'
            }}
          />
        </div>
      </div>

      {/* Conteúdo que rola sobre o Spline */}
      <div className="spline-scroll-content" ref={scrollContentRef}>
        {/* Seção Hero - Apenas Spline inicialmente */}
        <section className="spline-hero-section">
          {/* Esta seção agora é apenas para o visual inicial do Spline */}
        </section>

        {/* Seção invisível para permitir scroll e revelar conteúdo expandido */}
        <section className="scroll-trigger-section">
          {/* Esta seção permite que o usuário role para ver mais conteúdo */}
        </section>

        {/* Novo Widget de Vidro - movido para o fluxo correto da página */}
        <div className="glass-widget-section">
          <div className="glass-widget-container" ref={additionalContentRef}>
            {/* Widget de vidro principal */}
            <div className="glass-widget-main">
              {/* Conteúdo inicial visível */}
              <div className="glass-widget-initial">
                <div className="glass-widget-title">
                  <h2>Por que escolher a Cogni IA?</h2>
                </div>
                <div className="glass-widget-text-preview">
                  <p>Pare de perder tempo com métodos ultrapassados. Nossas ferramentas de IA foram criadas especificamente para estudantes e escolas que querem resultados reais...</p>
                </div>
              </div>

              {/* Conteúdo expandido que aparece no scroll */}
              <div className="glass-widget-expanded">
                <div className="glass-widget-full-text">
                  <p>Melhore suas notas, aprimore sua escrita e organize seus estudos com tecnologia que entende suas necessidades acadêmicas.</p>
                </div>

                {/* Widgets Scribo e Calculadora sobre o vidro */}
                <div className="overlay-widgets-container">
                  <div className="overlay-widget scribo-widget">
                    <div className="widget-header">
                      <p className="widget-title">Scribo</p>
                      <span className="badge badge-blue">IA Avançada</span>
                    </div>
                    <p className="widget-text">
                      Domine a arte da escrita! Receba correções instantâneas e feedback personalizado para redações do ENEM e vestibulares. Sua nota 1000 está mais próxima do que imagina.
                    </p>
                    <div className="widget-link-container">
                      <a href="#" className="widget-link">
                        Comece a Escrever Melhor &rarr;
                      </a>
                    </div>
                  </div>

                  <div className="overlay-widget calculadora-widget">
                    <div className="widget-header">
                      <p className="widget-title">Calculadora de Notas</p>
                      <span className="badge badge-green">Planejamento</span>
                    </div>
                    <p className="widget-text">
                      Nunca mais seja pego de surpresa! Calcule exatamente o que precisa tirar nas próximas provas para atingir sua meta. Planeje seu sucesso acadêmico com precisão.
                    </p>
                    <div className="widget-link-container">
                      <a href="#" className="widget-link">
                        Planeje Suas Notas Agora &rarr;
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção final com call-to-action */}
        <section className="spline-cta-section">
          <div className="spline-cta-content">
            <h2 className="spline-cta-title">Pronto para transformar seus estudos?</h2>
            <p className="spline-cta-text">
              Domine seus estudos. Alcance suas metas. Supere seus limites com ferramentas que realmente funcionam.
            </p>
            <div className="spline-cta-buttons">
              <button
                onClick={() => navigate('/projects')}
                className="main-button primary-button spline-cta-button"
              >
                Começar Agora - É Grátis
              </button>
              <button
                onClick={() => navigate('/about')}
                className="main-button secondary-button spline-cta-button"
              >
                Conheça Nossa Missão
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
