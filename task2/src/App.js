//import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [stations, setStations] = useState([]);
  const [status, setStatus] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

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

  const filterStations = (query) => {
    let filteredStations = [];
    filteredStations = stations.filter(
      (element) =>
        element.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
    setFilteredData(filteredStations);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (stations.length < 1 || status.length < 1) {
      return;
    }
    mergedata();
    setFilteredData(stations);
  }, [stations, status]);

  const mergedata = () => {
    let allData = stations;
    for (let i = 0; i < stations.length; i++) {
      allData[i].num_bikes_available = status[i].num_bikes_available;
      allData[i].num_docks_available = status[i].num_docks_available;
    }
    console.log(allData);
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1 className="header">
          <i className="fas fa-bicycle"></i> Oslo bysykkel
        </h1>
        <div className="input-container">
          <input
            className="searchbar"
            type="text"
            id="myInput"
            placeholder="Søk etter stasjon.."
            onChange={(event) => filterStations(event.target.value)}
          ></input>
          <i className="fas fa-search"></i>
        </div>
      </div>
      {stations[0] && status[0] && (
        <div className="stations">
          {filteredData.map((station, index) => (
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
