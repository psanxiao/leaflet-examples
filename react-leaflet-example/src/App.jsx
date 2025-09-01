import React from 'react';
import Map from './components/Map';
import CodeViewer from './components/CodeViewer';
import mapCode from './components/Map.jsx?raw';
import './App.css';

function App() {
  return (
    <div className="main-container">
      <h1>Ejemplo de Leaflet con React</h1>
      <p className="info-text">
        Construido con <a href="https://react-leaflet.js.org/" target="_blank" rel="noopener noreferrer">React Leaflet</a>.
      </p>
      <div className="content-container">
        <div className="card map-card">
          <Map />
        </div>
        <div className="card code-card">
          <CodeViewer code={mapCode} language="jsx" />
        </div>
      </div>
    </div>
  );
}

export default App;