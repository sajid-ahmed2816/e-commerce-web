import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

function Store() {

  const [markerPosition, setMarkerPosition] = useState([0,0]);

  const handleMarkerButtonClick = () => {
    // Set the marker position to a specific latitude and longitude
    setMarkerPosition([24.9103194, 67.0583741]);
  };

  return (
    <>
      <Header />

      <div className="text-center mt-5">
        <h1>
          Store Locator
        </h1>
      </div>
      <section className="stores">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="box">
                <div className="address">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, consequatur? 
                  </p>
                  <button className="btn-map" onClick={handleMarkerButtonClick}>View on map</button>
                </div>
                <div className="address">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, consequatur? 
                  </p>
                  <button className="btn-map" onClick={handleMarkerButtonClick}>View on map</button>
                </div>
                <div className="address">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, consequatur? 
                  </p>
                  <button className="btn-map" onClick={handleMarkerButtonClick}>View on map</button>
                </div>
                <div className="address">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, consequatur? 
                  </p>
                  <button className="btn-map" onClick={handleMarkerButtonClick}>View on map</button>
                </div>
                <div className="address">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, consequatur? 
                  </p>
                  <button className="btn-map" onClick={handleMarkerButtonClick}>View on map</button>
                </div>
                <div className="address">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, consequatur? 
                  </p>
                  <button className="btn-map" onClick={handleMarkerButtonClick}>View on map</button>
                </div>
                <div className="address">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, consequatur? 
                  </p>
                  <button className="btn-map" onClick={handleMarkerButtonClick}>View on map</button>
                </div>
                <div className="address">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, consequatur? 
                  </p>
                  <button className="btn-map" onClick={handleMarkerButtonClick}>View on map</button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <MapContainer
                center={[24.8606702, 67.0011]}
                zoom={13}
                style={{ width: "100%", height: "400px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={markerPosition}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Store;