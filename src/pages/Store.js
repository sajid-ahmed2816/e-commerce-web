import Header from "../components/Header";
import Footer from "../components/Footer";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { useState } from "react";

function Store() {

  // const [markerPosition, setMarkerPosition] = useState(null);

  // const handleMarkerButtonClick = () => {
  //   // Set the marker position to a specific latitude and longitude
  //   setMarkerPosition([51.51, -0.12]);
  // };

  return (
    <>
      <Header />

      <section className="stores">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="box">
                <div className="address">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, consequatur? 
                  </p>
                  <button className="btn-map">View on map</button>
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
                <Marker position={[51.505, -0.09]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
                {/* <button onClick={handleMarkerButtonClick}>Set Marker</button> */}
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