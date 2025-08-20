# 🎨 Design Guidelines - Cogni IA

## Padrão de Qualidade Estabelecido

Este documento define os padrões de design, código e experiência do usuário baseados na implementação da seção "Sobre" - nosso benchmark de qualidade máxima.

---

## 📐 **Princípios de Layout**

### **Grid System Avançado**
- **Layout Bento**: Usar grids assimétricos com cards de tamanhos variados
- **Responsividade Inteligente**: 
  - Desktop: Grid complexo (4x4, 3x3, etc.)
  - Tablet: Grid simplificado (2x2)
  - Mobile: Coluna única otimizada
- **Espaçamento Consistente**: 
  - Gap entre elementos: `1.5rem` (desktop), `1rem` (mobile)
  - Padding interno: `2rem` (desktop), `1.5rem` (mobile)

### **Hierarquia Visual**
- Cards principais: Tamanhos `large`, `wide`, `tall`
- Cards secundários: Tamanho `normal`
- Elementos de destaque: Posicionamento estratégico no grid
- Conteúdo de apoio: Cards menores complementares

---

## 🎯 **Componentes Padrão**

### **Card Structure**
```jsx
<ComponentCard size="large" delay={0.1}>
  <div className="card-icon">
    <IconComponent size={32} />
  </div>
  <div className="card-content">
    <h3 className="card-title">Título Principal</h3>
    <p className="card-description">Descrição detalhada...</p>
    {/* Conteúdo específico */}
  </div>
  <div className="card-glow"></div>
</ComponentCard>
```

### **Tamanhos de Cards**
- `normal`: Card padrão (1x1)
- `large`: Card grande (2x1) 
- `wide`: Card largo (4x1 ou 3x1)
- `tall`: Card alto (2x2)

### **Ícones Obrigatórios**
- Usar **Lucide React** como biblioteca padrão
- Tamanhos: `32px` (cards grandes), `28px` (cards normais), `20px` (elementos internos)
- Cores: Gradientes ou cores do tema
- Animação: Escala + rotação no hover

---

## ✨ **Sistema de Animações**

### **Animações de Entrada (GSAP)**
```jsx
gsap.fromTo(element, 
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
    delay: staggerDelay,
    ease: "power3.out"
  }
);
```

### **Stagger Pattern**
- Delay incremental: `0.1s`, `0.2s`, `0.3s`, etc.
- Máximo 6 elementos com stagger
- Ordem: Esquerda para direita, cima para baixo

### **Hover Effects (Suaves e Fluídas)**
```jsx
// Entrada - Animação suave e orgânica
gsap.to(card, {
  y: -8,
  scale: 1.02,
  duration: 0.6,
  ease: "power1.out"
});

// Saída - Transição fluída sem quebras visuais
gsap.to(card, {
  y: 0,
  scale: 1,
  duration: 0.6,
  ease: "power1.out"
});
```

### **Micro-animações Obrigatórias**
- **Cards**: Elevação + escala no hover (0.6s, power1.out)
- **Ícones**: Escala + rotação (5deg) com transição suave
- **Listas**: TranslateX nos itens (0.6s duration)
- **Números**: Counter animation com Intersection Observer
- **Regra de Ouro**: Todas as animações devem ser fluídas e orgânicas, sem quebras visuais

### **Padrão de Timing para Animações**
```css
/* Timing padrão para transições CSS */
transition: all 0.6s ease;

/* Para animações mais complexas */
transition: transform 0.6s ease, opacity 0.6s ease;

/* GSAP - Configurações obrigatórias */
duration: 0.6,
ease: "power1.out" // Mais suave que power2.out
```

### **Regras de Suavização**
1. **Duração Mínima**: 0.6s para hover effects
2. **Easing Suave**: Preferir `power1.out` ao invés de `power2.out`
3. **Sem Quebras**: Evitar animações em "estágios" ou "saltos"
4. **Consistência**: Todos os elementos interativos devem seguir o mesmo timing
5. **Fluidez**: Movimento deve parecer natural e orgânico

---

## 🎨 **Sistema Visual**

### **Glassmorphism Padrão**
```css
.component-card {
  background: var(--color-widget-bg);
  border: 1px solid var(--color-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 20px;
}
```

### **Efeitos de Brilho**
```css
.card-glow {
  position: absolute;
  background: radial-gradient(circle at 50% 50%, 
    rgba(139, 92, 246, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .card-glow {
  opacity: 1;
}
```

### **Gradientes para Ícones**
- **Primário**: `linear-gradient(135deg, var(--color-accent1), var(--color-accent2))`
- **Secundário**: `linear-gradient(135deg, #FF6B6B, #4ECDC4)`
- **Terciário**: `linear-gradient(135deg, #667eea, #764ba2)`

---

## 📊 **Componentes Especiais**

### **Contador Animado**
```jsx
const AnimatedCounter = ({ end, duration = 2, suffix = "" }) => {
  // Implementação com GSAP + Intersection Observer
  // Anima apenas quando visível na tela
};
```

### **Lista de Valores/Features**
```jsx
<div className="feature-list">
  {items.map((item, index) => (
    <div className="feature-item" key={index}>
      <IconComponent size={16} />
      <span>{item.text}</span>
    </div>
  ))}
</div>
```

### **Estatísticas em Destaque**
- Layout horizontal em cards wide
- Números grandes (3rem desktop, 2rem mobile)
- Labels em uppercase com letter-spacing
- Cores accent para os números

---

## 🎯 **Padrões de Interatividade**

### **Estados de Hover (Suavizados)**
1. **Elevação**: `translateY(-8px)` com 0.6s duration
2. **Escala**: `scale(1.02)` com easing suave
3. **Borda**: Mudança para cor accent (transição 0.6s)
4. **Sombra**: Box-shadow com cor accent (fade suave)
5. **Ícone**: Escala + rotação com timing consistente
6. **Regra**: Todos os efeitos devem ser simultâneos e fluídos

### **Estados de Foco**
- Outline customizado com cor accent
- Transições suaves (0.6s) - consistente com hover
- Feedback visual claro e orgânico

### **Loading States**
- Skeleton screens para conteúdo dinâmico
- Animações de shimmer
- Transições suaves entre estados

---

## 📱 **Responsividade Avançada**

### **Breakpoints**
```css
/* Mobile First */
@media (max-width: 768px) { /* Mobile */ }
@media (max-width: 1024px) { /* Tablet */ }
@media (min-width: 1025px) { /* Desktop */ }
```

### **Grid Responsivo**
```css
.component-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Desktop */
  gap: 1.5rem;
}

@media (max-width: 1024px) {
  .component-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .component-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
```

---

## 🛠️ **Estrutura de Código**

### **Organização de Componentes**
```
ComponentName/
├── ComponentName.jsx
├── ComponentName.css
├── hooks/
│   ├── useAnimation.js
│   └── useIntersection.js
└── utils/
    └── animations.js
```

### **Hooks Customizados Obrigatórios**
```jsx
// Para animações de entrada
const useStaggerAnimation = (elements, delay = 0.1) => {
  // Implementação com GSAP
};

// Para intersection observer
const useIntersectionAnimation = (callback, threshold = 0.5) => {
  // Implementação com Intersection Observer
};

// Para hover effects
const useHoverAnimation = (ref, config) => {
  // Implementação com GSAP
};
```

### **Padrão de Props**
```jsx
const Component = ({
  size = "normal",
  delay = 0,
  className = "",
  children,
  ...props
}) => {
  // Implementação
};
```

---

## 🎨 **Paleta de Cores Expandida**

### **Cores Funcionais**
```css
:root {
  /* Gradientes para ícones */
  --gradient-primary: linear-gradient(135deg, #8B5CF6, #60A5FA);
  --gradient-secondary: linear-gradient(135deg, #FF6B6B, #4ECDC4);
  --gradient-tertiary: linear-gradient(135deg, #667eea, #764ba2);
  
  /* Estados de hover */
  --hover-glow: rgba(139, 92, 246, 0.15);
  --hover-border: var(--color-accent1);
  
  /* Backgrounds especiais */
  --card-bg-hover: rgba(15, 15, 26, 0.9);
  --feature-bg: rgba(139, 92, 246, 0.05);
  --feature-bg-hover: rgba(139, 92, 246, 0.1);
}
```

---

## 📋 **Checklist de Qualidade**

### **Antes de Implementar**
- [ ] Layout bento definido com grid assimétrico
- [ ] Animações stagger planejadas
- [ ] Ícones selecionados da Lucide React
- [ ] Conteúdo estruturado em cards
- [ ] Responsividade testada em 3 breakpoints

### **Durante Implementação**
- [ ] Componentes reutilizáveis criados
- [ ] Hooks customizados implementados
- [ ] Animações GSAP configuradas
- [ ] Efeitos de hover funcionando
- [ ] CSS organizado e comentado

### **Após Implementação**
- [ ] Performance testada (60fps)
- [ ] Acessibilidade verificada
- [ ] Responsividade validada
- [ ] Animações suaves em todos os dispositivos
- [ ] Código documentado

---

## 🚀 **Próximos Níveis de Qualidade**

### **Melhorias Futuras**
1. **Particle Systems**: Efeitos de partículas customizados
2. **3D Elements**: Transformações 3D sutis
3. **Advanced Shaders**: Efeitos visuais com WebGL
4. **Gesture Support**: Interações touch avançadas
5. **Voice Interactions**: Comandos de voz
6. **AI-Powered Animations**: Animações adaptativas

### **Tecnologias a Explorar**
- **Framer Motion**: Para animações mais complexas
- **Three.js**: Para elementos 3D
- **Lottie**: Para animações vetoriais
- **React Spring**: Para física realista
- **GSAP ScrollTrigger**: Para scroll animations

---

## 📚 **Referências de Inspiração**

### **Sites de Componentes**
- **Aceternity UI**: aceternity.com
- **Magic UI**: magicui.design  
- **Framer Motion**: framer.com/motion
- **React Bits**: react-bits.dev
- **UI Labs**: uilabs.dev

### **Padrões de Design**
- **Apple Human Interface**: developer.apple.com/design
- **Material Design 3**: m3.material.io
- **Fluent Design**: fluent2.microsoft.design

---

## ⚡ **Performance Guidelines**

### **Otimizações Obrigatórias**
- Lazy loading para componentes pesados
- Debounce em animações de scroll
- RequestAnimationFrame para animações customizadas
- Memoização de componentes caros
- Code splitting por rota

### **Métricas de Performance**
- **FCP**: < 1.5s
- **LCP**: < 2.5s  
- **CLS**: < 0.1
- **FID**: < 100ms
- **Animation FPS**: 60fps consistente

---

*Este documento deve ser seguido rigorosamente para manter o padrão de excelência estabelecido. Qualquer desvio deve ser justificado e documentado.*

**Versão**: 1.0  
**Última atualização**: Implementação da seção "Sobre"  
**Próxima revisão**: Após próxima implementação de qualidade similar