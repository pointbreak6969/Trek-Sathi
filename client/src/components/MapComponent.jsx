import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = () => {
  // Markers along the Mardi Himal trek route
  const markers = [
    { id: 1, position: [28.2096, 83.9856], name: "Pokhara (Starting Point)", elevation: "827m" , description: "Pokhara is a city on Phewa Lake, in central Nepal. It’s known as a gateway to the Annapurna Circuit, a popular trail in the Himalayas.", image: "https://media.istockphoto.com/id/687611810/photo/view-at-annapurna-mountain-range-and-its-reflection-in-phewa-lake-in-pokhara-nepal.jpg?s=612x612&w=0&k=20&c=r1uza8OoSQeGGTrnnaHyq7HSxHG9DyvjHxxm4vqgDsc="},
    { id: 2, position: [28.2964, 83.8882], name: "Phedi", elevation: "1130m", description: "Phedi is a small village located at the base of the Mardi Himal trek. It is the starting point of the trek.", image: "https://c8.alamy.com/comp/APJ77H/thorung-phedi-4450m-annapurna-circuit-trek-nepal-APJ77H.jpg"},
    { id: 3, position: [28.3184, 83.8816], name: "Pothana", elevation: "1890m" , description: "Pothana is a small village located on the way to Mardi Himal. It is a popular stop for trekkers.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzkKM6I31g-QlKoHjRPkOEVvLjhkuLS4z5lA&s"},
    { id: 4, position: [28.3397, 83.8788], name: "Forest Camp (Kokar)", elevation: "2520m" , description: "Forest Camp, also known as Kokar, is a small settlement in the forested area of the Mardi Himal trek.", image: "c:\Users\DELL\AppData\Local\Temp\p1882478011-3.jpg"},
    { id: 5, position: [28.3544, 83.8830], name: "Low Camp", elevation: "2970m" , description: "Low Camp is a popular stop for trekkers on the way to Mardi Himal. It offers stunning views of the Annapurna range.", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiuNpf54FC1Qd3GsDh0X4DhPWNPLPD2Obu9A&s"},
    { id: 6, position: [28.3719, 83.8866], name: "High Camp", elevation: "3540m" , description: "High Camp is the last stop before reaching Mardi Himal Base Camp. It offers panoramic views of the surrounding mountains.", image: "https://himalayatrip.com/wp-content/uploads/2022/09/mardi-himal-base-camp-4500m.jpg"},
    { id: 7, position: [28.3875, 83.8883], name: "Mardi Himal Base Camp", elevation: "4500m" , description: "Mardi Himal Base Camp is the final destination of the trek. It offers breathtaking views of Mardi Himal and the Annapurna range.", image: "https://www.nepaltrekkinginhimalaya.com/images/articles/zkfvQ-mardi-himal.jpg"},
  ];

  // Create route line coordinates using all marker positions
  const routePoints = markers.map(marker => marker.position);

  // Polyline options
  const polylineOptions = {
    color: '#dc2626', // Red color for trek route
    weight: 3,        // Line thickness
    opacity: 0.8,     // Line opacity
  };

  return (
    <MapContainer 
      center={[28.3096, 83.9056]} // Centered between Pokhara and Mardi Himal
      zoom={12} 
      scrollWheelZoom={true}
      className="h-screen w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Draw the trek route */}
      <Polyline 
        positions={routePoints}
        pathOptions={polylineOptions}
      />

      {/* Add markers for each location */}
      {markers.map(marker => (
        <Marker key={marker.id} position={marker.position}>
          <Popup>
            <div className="p-2">
              <img src={marker.image} alt={marker.name} className="w-full h-32 object-cover mb-2" />
              <h3 className="font-bold">{marker.name}</h3>
              <p className="text-sm text-gray-600">Elevation: {marker.elevation}</p>
              <p className="text-sm text-gray-600">{marker.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;