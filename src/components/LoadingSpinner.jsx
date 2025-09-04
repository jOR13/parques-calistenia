function LoadingSpinner() {
  return (
    <div className="loading-container animated-bg">
      <div className="loading-content">
        {/* Modern loading animation */}
        <div className="loading-spinner"></div>
        
        {/* Loading text */}
        <div className="loading-card">
          <h2 className="loading-title">💪 Calistenia</h2>
          
          <div className="loading-text">
            <span className="location-indicator"></span>
            Detectando tu ubicación
          </div>
          
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
          
          <p className="loading-subtitle">
            Buscando los parques más cercanos...
          </p>
        </div>
        
        {/* Tip */}
        <div className="loading-tip">
          💡 Tip: Asegúrate de permitir el acceso a tu ubicación para mejores resultados
        </div>
      </div>
    </div>
  )
}

export default LoadingSpinner