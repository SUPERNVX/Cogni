import "./GlassSurface.css";

const GlassSurface = ({
  children,
  width = 200,
  height = 80,
  borderRadius = 20,
  opacity = 0.6,
  blur = 11,
  saturation = 1.2,
  className = "",
  style = {},
}) => {
  // Verifica o suporte para backdrop-filter de uma maneira mais direta
  const supportsBackdropFilter =
    typeof window !== "undefined" &&
    (window.CSS?.supports?.("backdrop-filter", "blur(10px)") ||
      window.CSS?.supports?.("-webkit-backdrop-filter", "blur(10px)"));

  const containerStyle = {
    ...style,
    width: typeof width === "number" ? `${width}px` : width,
    height: typeof height === "number" ? `${height}px` : height,
    borderRadius: `${borderRadius}px`,
    "--glass-opacity": opacity,
    "--glass-blur": `${blur}px`,
    "--glass-saturation": saturation,
  };

  return (
    <div
      className={`glass-surface ${
        supportsBackdropFilter
          ? "glass-surface--supported"
          : "glass-surface--fallback"
      } ${className}`}
      style={containerStyle}
    >
      <div className="glass-surface__content">{children}</div>
    </div>
  );
};

export default GlassSurface;
