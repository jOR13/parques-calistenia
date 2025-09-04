// Haversine formula to calculate distance between two points
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Get user's current position
export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// Get address from coordinates using reverse geocoding
export async function getAddressFromCoords(lat, lng) {
  try {
    // Using OpenStreetMap Nominatim API for reverse geocoding
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=es`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch address');
    }
    
    const data = await response.json();
    
    if (data && data.display_name) {
      // Extract relevant parts of the address
      const address = data.address || {};
      const parts = [];
      
      if (address.road) parts.push(address.road);
      if (address.house_number) parts[parts.length - 1] += ' ' + address.house_number;
      if (address.suburb || address.neighbourhood) parts.push(address.suburb || address.neighbourhood);
      if (address.city || address.town) parts.push(address.city || address.town);
      if (address.state) parts.push(address.state);
      
      return parts.length > 0 ? parts.join(', ') : data.display_name;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting address:', error);
    return null;
  }
}

// Find nearest parks to user location
export function findNearestParks(userLocation, parks, limit = 5) {
  const parksWithDistance = parks.map(park => ({
    ...park,
    distance: calculateDistance(
      userLocation.lat,
      userLocation.lng,
      park.lat,
      park.lng
    )
  }));

  return parksWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
}