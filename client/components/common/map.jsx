import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react"

export const Map = ({location}) => {
  const [userLocation, setUserLocation] = useState(null);
  const map = useRef(null);
  const mapContainer = useRef(null);

  mapboxgl.accessToken = 'pk.eyJ1Ijoic2thbC1jaGluIiwiYSI6ImNsMWJmdTNodTBlanYzaXFneTU5dGJ0dDIifQ.bWQQQpnyVGAS8lkQxmM78w';

  useEffect(async () => {
    setUserLocation(location);
  }, []);

  useEffect(async () => {
    console.log(userLocation);
    if (userLocation) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [userLocation.longitude, userLocation.latitude],
        zoom: 9,
      });
    }
  }, [userLocation]);

  return (
    <div>
      
      {userLocation && 
        <div ref={mapContainer}></div>

      }
    </div>
  )
}