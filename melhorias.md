# Plano de Melhorias e Refatoração do Projeto Cogni IA

Este documento detalha os passos de refatoração e otimização aplicados e a serem aplicados no projeto Cogni IA, visando melhorar a arquitetura, performance, manutenibilidade e aderência a padrões modernos de desenvolvimento.

---

## Passo 1: Arquitetura e Roteamento (Concluído)

**Objetivo:** Substituir o roteamento manual baseado em estado por uma solução de roteamento padrão (React Router DOM) para melhor escalabilidade, URLs amigáveis e organização do código.

**Ações Realizadas:**

1.  **Instalação do `react-router-dom`**: Adição da biblioteca ao projeto.
2.  **Reestruturação de Pastas**: Criação das pastas `src/pages` (para componentes de página) e `src/components` (para componentes reutilizáveis).
3.  **Movimentação de Componentes de Página**: Os componentes `AboutContent`, `ProjectsContent`, `BlogContent`, `ContactContent` foram extraídos de `App.jsx` e movidos para seus próprios arquivos em `src/pages/AboutPage.jsx`, `src/pages/ProjectsPage.jsx`, `src/pages/BlogPage.jsx`, `src/pages/ContactPage.jsx`, respectivamente. O componente `SplineHome` foi renomeado para `HomePage` e movido para `src/pages/HomePage.jsx`.
4.  **Refatoração de `App.jsx`**: O componente `App` foi transformado em um shell de roteamento, utilizando `Routes`, `Route`, `useLocation` e `Outlet` do `react-router-dom` para gerenciar a navegação e o layout condicional.
5.  **Atualização de `GlassNavigation.jsx`**: O componente de navegação foi modificado para usar `NavLink` do `react-router-dom`, permitindo navegação declarativa e estilização automática do item ativo.
6.  **Atualização de `HomePage.jsx`**: Os botões de navegação na `HomePage` foram atualizados para usar o hook `useNavigate` do `react-router-dom`.
7.  **Configuração de `main.jsx`**: O componente `App` foi envolvido pelo `BrowserRouter` em `main.jsx` para habilitar o roteamento em toda a aplicação.

---

## Passo 2: Otimização de Performance (Em Andamento / Revertido Parcialmente)

**Objetivo:** Identificar e otimizar gargalos de performance, especialmente relacionados a efeitos visuais complexos e manipulação do DOM.

**Ações Realizadas:**

1.  **Simplificação e Otimização de `GlassSurface.jsx`**:
    *   A versão original do `GlassSurface.jsx` (que gerava filtros SVG complexos) foi inicialmente substituída por uma versão mais leve, baseada puramente em `backdrop-filter` do CSS, visando melhor performance.
    *   **Reversão**: A pedido do usuário, a versão original do `GlassSurface.jsx` foi restaurada devido à preferência visual. A versão "light" foi salva em `src/components/GlassSurfaceLight/` para uso futuro em cenários de baixa performance.
    *   `GlassNavigation.jsx` foi ajustado para passar as props corretas para a versão original do `GlassSurface`.
2.  **Refatoração de `HomePage.jsx` para uso de `useRef` e `gsap.context()`**:
    *   A manipulação direta do DOM (`document.querySelector`) foi substituída pelo uso de `useRef` e `gsap.context()` para gerenciar as animações com GSAP, alinhando-se às melhores práticas do React e garantindo melhor limpeza e controle do ciclo de vida.
    *   **Correção de Erro**: Um erro de declaração de variável duplicada (`scrollContentRef`) introduzido durante a refatoração foi identificado e corrigido.
3.  **Otimização do Carregamento de Fontes**:
    *   A lógica de carregamento de fontes do Google Fonts foi removida do `useEffect` em `App.jsx` e as tags `<link>` foram inseridas diretamente no `<head>` do `index.html` para um carregamento mais rápido e evitar FOUT (Flash Of Unstyled Text).

---

## Passo 3: Modernização do CSS com CSS Modules (Próximo Passo)

**Objetivo:** Encapsular os estilos CSS para evitar conflitos de nomes de classes, melhorar a manutenibilidade e tornar os componentes mais autônomos.

**Ações a Realizar:**

1.  **Entendimento de CSS Modules**: Compreender como os CSS Modules funcionam e seus benefícios (escopo local, hash de classes, etc.).
2.  **Renomear Arquivos CSS**: Renomear os arquivos `.css` dos componentes para `.module.css` (ex: `GlassNavigation.css` para `GlassNavigation.module.css`).
3.  **Atualizar Importações**: Modificar as importações de CSS nos componentes para usar a sintaxe de CSS Modules (ex: `import styles from './GlassNavigation.module.css';`).
4.  **Atualizar Uso de Classes**: Substituir as strings de classes CSS no JSX pelo acesso às propriedades do objeto `styles` (ex: `className="glass-nav-container"` para `className={styles.glassNavContainer}`).

---

## Passo 4: Limpeza e Qualidade de Código Adicionais (Futuro)

**Objetivo:** Implementar otimizações e melhorias de código mais avançadas para refinar a aplicação.

**Ações a Realizar:**

1.  **Criação de Hooks Customizados**: Encapsular lógicas complexas e reutilizáveis (como a lógica de animação do `SplitText` ou partes da lógica de scroll da `HomePage`) em hooks customizados para maior modularidade e reuso.
2.  **Code Splitting (Lazy Loading)**: Implementar o carregamento preguiçoso (lazy loading) para os componentes de página usando `React.lazy` e `Suspense`. Isso permitirá que o código de cada página seja carregado apenas quando necessário, melhorando o tempo de carregamento inicial da aplicação.
3.  **Revisão de Acessibilidade**: Garantir que a interface seja acessível para todos os usuários, incluindo navegação por teclado, semântica HTML e atributos ARIA quando apropriado.
4.  **Otimização de Imagens e Assets**: Implementar técnicas para otimizar o carregamento de imagens e outros assets (compressão, formatos modernos, lazy loading).
5.  **Configuração de Linting e Formatação**: Garantir que ESLint e Prettier estejam configurados e sendo usados para manter a consistência do código.
