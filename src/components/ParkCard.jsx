function ParkCard({ park }) {
  const handleGetDirections = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${park.lat},${park.lng}`
    window.open(googleMapsUrl, '_blank')
  }

  const formatDistance = (distance) => {
    if (distance === null || distance === undefined) return null
    return distance < 1 
      ? `${Math.round(distance * 1000)}m` 
      : `${distance.toFixed(1)}km`
  }

  const getDistanceClass = (distance) => {
    if (!distance) return ''
    if (distance < 2) return 'close'
    if (distance < 5) return 'medium'
    return 'far'
  }

  const getRankingIcon = (distance) => {
    if (!distance) return '📍'
    if (distance < 2) return '🥇'
    if (distance < 5) return '🥈'
    return '🥉'
  }

  return (
    <div className="park-card">
      {/* Header with distance badge */}
      <div className="park-header">
        {/* Distance badge */}
        {park.distance !== null && (
          <div className={`distance-badge ${getDistanceClass(park.distance)}`}>
            <span>{getRankingIcon(park.distance)}</span>
            <span>{formatDistance(park.distance)}</span>
          </div>
        )}

        {/* Park name */}
        <h3 className="park-title">{park.name}</h3>
      </div>

      {/* Content */}
      <div className="park-content">
        <div className="park-info">
          {/* Address */}
          <div className="park-info-item">
            <div className="park-icon location">📍</div>
            <p className="park-text">{park.address}</p>
          </div>

          {/* Instructor */}
          <div className="park-info-item">
            <div className="park-icon instructor">👨‍🏫</div>
            <p className="park-text">{park.instructor}</p>
          </div>

          {/* Schedule */}
          <div className="park-info-item">
            <div className="park-icon schedule">⏰</div>
            <p className="park-text small">{park.schedule}</p>
          </div>
        </div>

        {/* Days chips */}
        <div className="days-container">
          {park.days.map((day, index) => (
            <span key={index} className="day-tag">{day}</span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="park-actions">
          <button onClick={handleGetDirections} className="park-btn">
            <span>🗺️</span>
            <span>Ir</span>
          </button>
          
          <button
            className="park-btn info"
            onClick={() => {
              const facebookUrl = `https://www.facebook.com/groups/3081259238839436/user/100067731442945/`
              window.open(facebookUrl, '_blank')
            }}
          >
            <span>📘</span>
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ParkCard