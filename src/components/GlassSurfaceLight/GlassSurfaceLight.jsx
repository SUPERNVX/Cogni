import './GlassSurface.css';

/**
 * Um componente de superfície de vidro performático que usa CSS backdrop-filter.
 * Ele não precisa de props complexas, pois o estilo é controlado via CSS.
 */
const GlassSurface = ({ children, className = '', style = {} }) => {
  // O `style` e `className` são passados para permitir customização externa.
  return (
    <div className={`glass-surface ${className}`} style={style}>
      {children}
    </div>
  );
};

export default GlassSurface;
