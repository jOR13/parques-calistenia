import { useState, useEffect } from 'react'
import { parks } from './data/parks'
import { getCurrentPosition, findNearestParks, getAddressFromCoords } from './utils/location'
import ParkCard from './components/ParkCard'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [userLocation, setUserLocation] = useState(null)
  const [userAddress, setUserAddress] = useState(null)
  const [nearestParks, setNearestParks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const getLocation = async () => {
      try {
        setLoading(true)
        const location = await getCurrentPosition()
        setUserLocation(location)
        
        // Get address from coordinates
        const address = await getAddressFromCoords(location.lat, location.lng)
        setUserAddress(address)
        
        const nearest = findNearestParks(location, parks, showAll ? parks.length : 5)
        setNearestParks(nearest)
        setError(null)
      } catch (err) {
        setError('No se pudo obtener tu ubicación. Mostrando todos los parques.')
        setNearestParks(parks.map(park => ({ ...park, distance: null })))
      } finally {
        setLoading(false)
      }
    }

    getLocation()
  }, [showAll])

  const handleShowAll = () => {
    setShowAll(!showAll)
    if (userLocation) {
      const nearest = findNearestParks(userLocation, parks, !showAll ? parks.length : 5)
      setNearestParks(nearest)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    <div className="animated-bg">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-card">
            <h1>💪 Calistenia</h1>
            <div className="header-subtitle">Ciudad Juárez</div>
          </div>
          
          <p className="header-description">
            Descubre los mejores <strong>parques de entrenamiento</strong> más cercanos a tu ubicación con clases <strong>100% gratuitas</strong>
          </p>
          
          {/* Stats */}
          <div className="stats">
            <div className="stat-card">
              <span className="stat-number">{parks.length}</span>
              <span className="stat-label">Parques</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">9</span>
              <span className="stat-label">Instructores</span>
            </div>
            <div className="stat-card">
              <span className="stat-number">∞</span>
              <span className="stat-label">Gratis</span>
            </div>
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div style={{maxWidth: '600px', margin: '0 auto 40px'}}>
            <div style={{
              background: 'rgba(251, 191, 36, 0.2)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
              borderRadius: '20px',
              padding: '25px',
              textAlign: 'center'
            }}>
              <div style={{fontSize: '2rem', marginBottom: '10px'}}>⚠️</div>
              <p style={{color: 'white', fontWeight: '600'}}>{error}</p>
            </div>
          </div>
        )}

        {/* Controls */}
        <div className="controls">
          <button onClick={handleShowAll} className="btn">
            {showAll ? '🎯 Mostrar más cercanos' : '🗺️ Ver todos los parques'}
          </button>
          
          {userLocation && (
            <button
              onClick={() => {
                const getLocation = async () => {
                  try {
                    const location = await getCurrentPosition()
                    setUserLocation(location)
                    
                    // Get address from coordinates
                    const address = await getAddressFromCoords(location.lat, location.lng)
                    setUserAddress(address)
                    
                    const nearest = findNearestParks(location, parks, showAll ? parks.length : 5)
                    setNearestParks(nearest)
                  } catch (err) {
                    setError('No se pudo actualizar tu ubicación')
                  }
                }
                getLocation()
              }}
              className="btn btn-secondary"
            >
              📍 Actualizar ubicación
            </button>
          )}
        </div>

        {/* Location info */}
        {userLocation && !error && (
          <div className="location-info">
            <div className="location-card">
              <div className="location-text">
                <span className="location-indicator"></span>
                Tu ubicación detectada
              </div>
              {userAddress && (
                <p style={{
                  color: 'white',
                  fontWeight: '600',
                  marginBottom: '8px',
                  fontSize: '1rem'
                }}>
                  📍 {userAddress}
                </p>
              )}
              <p className="location-coords">
                ({userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)})
              </p>
            </div>
          </div>
        )}

        {/* Parks grid */}
        <div className="parks-grid">
          {nearestParks.map((park, index) => (
            <div key={park.id} style={{ animationDelay: `${index * 100}ms` }}>
              <ParkCard park={park} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-card">
            <div className="footer-content">
              <div className="footer-icon">💪</div>
              <div className="footer-text">
                <h3>Clases Gratuitas</h3>
                <p>Para toda la comunidad</p>
              </div>
            </div>
            <p className="footer-credit">
              Hecho con ❤️ para Ciudad Juárez, Chihuahua
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App