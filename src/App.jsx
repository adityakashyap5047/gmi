// App.jsx

import React from 'react';
import Map from './components/Map';
import CurrentMarker from './components/CurrentMarker';

function App() {
  return (
    <div>
      <h1>Google Map with Marker</h1>
      {/* <Map lat={28.6139} lng={77.2090} /> */}
      <CurrentMarker/>
    </div>
  );
}

export default App;