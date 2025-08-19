# Setup do Spline com Efeito Parallax

## Dependências Necessárias

Para que o projeto funcione completamente, você precisa instalar as seguintes dependências:

```bash
# Instalar o Spline para React
npm install @splinetool/react-spline

# Instalar o plugin ScrollTrigger do GSAP (se não estiver instalado)
npm install gsap/ScrollTrigger
```

## O que foi implementado

### 1. **SplineHome.jsx**
- Componente principal que integra a cena 3D do Spline
- Efeito parallax usando GSAP ScrollTrigger
- Estrutura de scroll com múltiplas seções
- Animações suaves para revelar conteúdo

### 2. **SplineHome.css**
- Estilos específicos para o layout com Spline
- Background fixo com a cena 3D
- Gradientes para transição suave entre seções
- Responsividade completa
- Otimizações de performance

### 3. **Integração no App.jsx**
- Renderização condicional para a home com Spline
- Layout especial sem wrapper para tela cheia
- Navegação mantida no topo

## Funcionalidades Implementadas

### ✅ Efeito Parallax
- Background Spline fixo que se move com o scroll
- Elementos 3D sobem conforme o usuário desce a página
- Transições suaves entre seções

### ✅ Estrutura de Conteúdo
- **Seção Hero**: Textos principais sobre a cena 3D
- **Seção "Por que escolher"**: Mantida como solicitado
- **Conteúdo Adicional**: Widgets que aparecem no scroll
- **Seção CTA**: Call-to-action final

### ✅ Animações
- Textos aparecem com animação usando SplitText
- Widgets surgem com stagger effect
- Scroll suave e responsivo
- Suporte para `prefers-reduced-motion`

### ✅ Performance
- Lazy loading do Spline
- Transform3D para aceleração de hardware
- Otimizações de CSS para scroll suave
- Cleanup automático de event listeners

## Como usar

1. Instale as dependências listadas acima
2. Execute o projeto: `npm run dev`
3. A home page agora usa a cena 3D com efeito parallax
4. As outras páginas mantêm o layout original

## Personalização

### Alterar a cena Spline
Edite a URL no arquivo `SplineHome.jsx`:
```jsx
<Spline scene="SUA_URL_AQUI" />
```

### Ajustar velocidade do parallax
Modifique o valor `yPercent` no `SplineHome.jsx`:
```jsx
gsap.to(splineContainer, {
  yPercent: -50, // Altere este valor (-100 = mais rápido, -25 = mais lento)
  // ...
});
```

### Adicionar mais conteúdo
Adicione novas seções no `spline-scroll-content` do `SplineHome.jsx`

## Estrutura de Arquivos Criados/Modificados

```
src/
├── SplineHome.jsx          # Novo componente principal
├── SplineHome.css          # Estilos específicos do Spline
├── App.jsx                 # Modificado para integração
└── style.css               # Adicionado .main-content-spline
```

## Compatibilidade

- ✅ React 19+
- ✅ Vite
- ✅ GSAP 3.13+
- ✅ Navegadores modernos
- ✅ Mobile responsivo
- ✅ Acessibilidade (reduced motion)

## Próximos Passos Opcionais

1. **Otimização de Loading**: Adicionar loading state para o Spline
2. **Interatividade**: Conectar eventos do scroll com elementos 3D
3. **Mais Animações**: Adicionar micro-interações
4. **Analytics**: Tracking de scroll depth