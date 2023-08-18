import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";

function Store() {

  const [markerPosition, setMarkerPosition] = useState({
    lat: 24.9103194,
    lng: 67.0583741
  });

  const handleMarkerButtonClick = () => {
    // Set the marker position to the specific latitude and longitude
    setMarkerPosition({
      lat: 24.9103194,
      lng: 67.0583741
    });
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
              </div>
            </div>
            <div className="col-md-6">
              <div className="map-container">
              <LoadScript googleMapsApiKey="AIzaSyCVUiO9-ofV0biq9rjIMlBSaLKvnKimwDQ">
                <GoogleMap
                  center={markerPosition}
                  zoom={13}
                  mapContainerStyle={{ width: "100%", height: "400px" }}
                >
                  <Marker position={markerPosition} />
                </GoogleMap>
              </LoadScript>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default Store;