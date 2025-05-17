// App.jsx

import React from 'react';
import Map from './components/Map';
import CurrentMarker from './components/CurrentMarker';
import MultipleMarkers from './components/MultipleMarkers';
import MovingMarker from './components/MovingMarker';

function App() {

  // const locations = [
  //   { lat: 28.6139, lng: 77.2090 }, // Delhi
  //   { lat: 19.0760, lng: 72.8777 }, // Mumbai
  //   { lat: 12.9716, lng: 77.5946 }, // Bangalore
  //   { lat: 13.0827, lng: 80.2707 }, // Chennai
  // ];


  return (
    <div>
      <h1>Google Map with Marker</h1>
      {/* <Map lat={28.6139} lng={77.2090} /> */}
      {/* <CurrentMarker/> */}
      {/* <MultipleMarkers locations={locations} /> */}
      {/* <MovingMarker/> */}
    </div>
  );
}

export default App;