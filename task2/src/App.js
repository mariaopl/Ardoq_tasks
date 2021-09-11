//import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [stations, setStations] = useState([]);
  const [status, setStatus] = useState([]);

  async function getData() {
    const url1 =
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json";
    const response1 = await fetch(url1, {
      headers: {
        "Client-Identifier": "NTNU",
      },
    });
    const stationsData = await response1.json();
    const url2 =
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json";
    const response2 = await fetch(url2, {
      headers: {
        "Client-Identifier": "NTNU",
      },
    });
    const statusData = await response2.json();
    setStations(stationsData.data.stations);
    setStatus(statusData.data.stations);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <h1 className="header">
        <i class="fas fa-bicycle"></i> Oslo bysykkel
      </h1>
      {stations[0] && status[0] && (
        <div className="stations">
          {stations.map((station, index) => (
            <div key={index} className="station">
              <h3 className="name">Stasjonsnavn: {station.name}</h3>
              <h3 className="item">Adresse: {station.address}</h3>
              <h3 className="item">Kapasitet: {station.capacity}</h3>
              <h3 className="item">
                Tilgjengelige sykler: {status[index].num_bikes_available}
              </h3>
              <h3 className="item">
                Ledige plasser: {status[index].num_docks_available}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
