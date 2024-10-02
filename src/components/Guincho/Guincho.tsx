import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import styles from './Guincho.module.css';

const defaultIcon = L.icon({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const GeolocationApp: React.FC = () => {

    useEffect(() => {
    document.title = "Chamando o Guincho - Diagnoscar";
  }, []);


  const [location, setLocation] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });
  
  const [error, setError] = useState<string | null>(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
        },
        (error) => {
          setError('Erro ao pegar localização, tente novamente.\n' + error.message);
        }
      );
    } else {
      setError('Geolocalização não é suportada pelo navegador.');
    }
  };

  const confirmado = () => {
    window.alert("Guincho sendo enviado");
    window.location.href = "obrigado.html";
  };

  const cancelado = () => {
    window.location.href = "inicio.html";
  };

  return (
    <div className={styles.container}>
      <h1>Geolocalização do Usuário</h1>
      <button onClick={getLocation} className={styles.buttons}>Pegar Localização</button>
      
      {error && <p className={styles.error}>{error}</p>}

      {location.latitude && location.longitude ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>

          <MapContainer
            center={[location.latitude, location.longitude]}
            zoom={13}
            className={styles['leaflet-container']}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker 
              position={[location.latitude, location.longitude]}
              icon={defaultIcon}
            >
              <Popup>
                Você está aqui: [{location.latitude}, {location.longitude}]
              </Popup>
            </Marker>
          </MapContainer>

          <div className={styles['buttons-container']}>
            <h1>Enviar Guincho ?</h1>
            <button onClick={confirmado} className={styles.buttons}>Enviar</button>
            <button onClick={cancelado} className={styles.buttons}>Cancelar</button>
          </div>
        </div>
      ) : (
        <p>Localização ainda não obtida</p>
      )}
    </div>
  );
};

export default GeolocationApp;
