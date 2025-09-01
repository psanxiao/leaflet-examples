import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



const pointToLayer = (feature, latlng) => {
    let iconClass;
    let markerColorClass = '';

    switch (feature.properties.tipo) {
        case 'Playa':
            iconClass = 'fa-umbrella-beach';
            markerColorClass = 'playa';
            break;
        case 'Parque':
            iconClass = 'fa-tree';
            markerColorClass = 'parque';
            break;
        case 'Faro':
            iconClass = 'fa-lightbulb';
            markerColorClass = 'faro';
            break;
        default:
            iconClass = 'fa-map-marker-alt';
            break;
    }

    const customIcon = L.divIcon({
        className: `custom-marker ${markerColorClass}`,
        html: `<i class="fa-solid ${iconClass}"></i>`,
        iconSize: [30, 30]
    });

    return L.marker(latlng, { icon: customIcon });
};

const onEachFeature = (feature, layer) => {
    if (feature.properties && feature.properties.name) {
        layer.bindPopup(`<b>${feature.properties.name}</b><br>Tipo: ${feature.properties.tipo}`);
    }
};

function Map() {
    const [geojsonData, setGeojsonData] = useState(null);
    const mapRef = useRef(null);
    const geoJsonRef = useRef(null);

    useEffect(() => {
        fetch('oleiros.geojson')
            .then(response => response.json())
            .then(data => setGeojsonData(data))
            .catch(error => console.error("Error loading GeoJSON:", error));
    }, []);

    useEffect(() => {
        if (mapRef.current && geoJsonRef.current) {
            const map = mapRef.current;
            const bounds = geoJsonRef.current.getBounds();
            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }, [geojsonData]);

    return (
        <MapContainer ref={mapRef} center={[43.3336, -8.3174]} zoom={13} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {geojsonData && (
                <GeoJSON 
                    ref={geoJsonRef}
                    data={geojsonData} 
                    pointToLayer={pointToLayer}
                    onEachFeature={onEachFeature}
                />
            )}
        </MapContainer>
    );
}

export default Map;