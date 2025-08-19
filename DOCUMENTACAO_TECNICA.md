# 📚 Documentação Técnica - Cogni IA Website

## 🎯 **Visão Geral do Projeto**

O website da Cogni IA é uma aplicação React moderna que combina design inovador com tecnologia 3D para criar uma experiência única de apresentação de ferramentas educacionais baseadas em IA.

## 🏗️ **Arquitetura do Sistema**

### **Stack Tecnológico**
- **Frontend**: React 19.1.1 + Vite 7.1.0
- **Animações**: GSAP 3.13.0 + ScrollTrigger
- **3D**: Spline (@splinetool/react-spline)
- **Ícones**: Lucide React
- **Estilização**: CSS3 com variáveis customizadas

### **Estrutura de Componentes**
```
src/
├── App.jsx                 # Componente principal e roteamento
├── SplineHome.jsx          # Página home com integração 3D
├── GlassNavigation.jsx     # Navegação com efeito glassmorphism
├── GlassSurface.jsx        # Componente de superfície de vidro
├── SplitText.jsx           # Animações de texto com GSAP
└── style.css               # Estilos globais e paleta de cores
```

## 🎨 **Design System**

### **Paleta de Cores**
```css
--color-background: #040406    /* Background principal */
--color-text-primary: #F3F4F6  /* Texto principal */
--color-text-secondary: #8B92A6 /* Texto secundário */
--color-widget-bg: #0F0F1A     /* Background dos widgets */
--color-accent1: #8B5CF6       /* Roxo principal */
--color-accent2: #60A5FA       /* Azul secundário */
--color-border: #1A1A2E        /* Bordas */
--color-input-bg: #0A0A12      /* Inputs */
```

### **Gradientes**
- **Widget Principal**: `linear-gradient(135deg, #0F0F1A 0%, #8B5CF6 100%)`
- **Botão Primário**: `linear-gradient(to right, #8B5CF6, #60A5FA)`
- **Transições**: Gradientes adaptativos para efeito parallax

## 🎬 **Funcionalidades Principais**

### **1. Integração 3D com Spline**
- Cena 3D interativa como background principal
- Loading state com spinner e barra de progresso
- Fallback visual com gradiente durante carregamento
- Tratamento de erros com opção de retry

### **2. Efeito Parallax Avançado**
- Background 3D fixo com movimento suave
- Conteúdo sobreposto com animações escalonadas
- Transições graduais de transparente para sólido
- Otimizado para performance e interatividade

### **3. Navegação Glassmorphism**
- Efeito de vidro com blur e transparência
- Posicionamento fixo no topo
- Ícones responsivos (22px)
- Animações de hover e estado ativo

### **4. Animações de Texto**
- SplitText com GSAP para efeitos de caracteres
- Aguarda carregamento de fontes (document.fonts.ready)
- Animações triggered por scroll
- Fallback para navegadores sem suporte

## ⚡ **Otimizações de Performance**

### **Carregamento**
- Lazy loading do Spline
- Preload de fontes essenciais
- Estados de loading informativos
- Cleanup automático de animações

### **Animações**
- `transform3d` para aceleração de hardware
- `will-change` removido para evitar conflitos
- ScrollTrigger com `invalidateOnRefresh`
- Debounce em eventos de scroll

### **Interatividade**
- Sistema de `pointer-events` seletivo
- Preservação de eventos de mouse para Spline
- Touch actions otimizadas
- Responsividade completa

## 📱 **Responsividade**

### **Breakpoints**
- **Desktop**: > 768px (layout completo)
- **Tablet**: 768px - 480px (adaptações de espaçamento)
- **Mobile**: < 480px (layout em coluna única)

### **Adaptações Mobile**
- Navegação em coluna única
- Botões com largura otimizada
- Espaçamentos reduzidos
- Textos redimensionados

## 🔧 **Configuração e Deploy**

### **Instalação**
```bash
npm install
npm run dev    # Desenvolvimento
npm run build  # Produção
```

### **Dependências Principais**
```json
{
  "react": "^19.1.1",
  "gsap": "^3.13.0",
  "@splinetool/react-spline": "latest",
  "lucide-react": "^0.539.0"
}
```

### **Variáveis de Ambiente**
- Nenhuma configuração adicional necessária
- URL do Spline hardcoded por segurança
- Build otimizado com Vite

## 🎯 **Estrutura de Páginas**

### **Home (SplineHome)**
1. **Seção 1**: Spline 3D em tela cheia
2. **Seção 2**: "Por que escolher" + Widgets principais
3. **Seção 3**: Call-to-action com botões duplos

### **Outras Páginas**
- **Sobre**: Missão, visão e valores
- **Projetos**: Detalhes das ferramentas
- **Blog**: Conteúdo educacional
- **Contato**: Formulário de contato

## 🔍 **Monitoramento e Debug**

### **Console Logs**
- Status de carregamento do Spline
- Dimensões do canvas 3D
- Estados de animação
- Erros de carregamento

### **Estados Visuais**
- Loading spinner durante carregamento
- Fallback gradient para debug
- Estados de erro com retry
- Transições suaves entre estados

## 🚀 **Próximas Melhorias**

- [ ] Analytics de interação com Spline
- [ ] Otimização de bundle size
- [ ] PWA capabilities
- [ ] Testes automatizados
- [ ] Acessibilidade avançada

---

**Desenvolvido com foco em performance, experiência do usuário e tecnologias modernas para demonstrar capacidades técnicas avançadas.**