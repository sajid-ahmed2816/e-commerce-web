import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";

function Store() {

  const initialMarkerPosition = {
    lat: 24.9103194,
    lng: 67.0583741
  };

  const [markerPosition, setMarkerPosition] = useState(initialMarkerPosition);
  const [showMarker, setShowMarker] = useState(false);

  const storeLocObj = [
    {
      address: 'Dolmen Mall - Tariq Road',
      phoneNumber: 123456789,
      location: {
        latitude: 24.876807,
        longitude: 67.062692
      }
    },
    {
      address: 'Khaadi - Tipu Sultan Road',
      phoneNumber: 123456789,
      location: {
        latitude: 24.8825388,
        longitude: 67.0878843
      }
    },
    {
      address: 'Dolmen Mall - Hyderi',
      phoneNumber: 123456789,
      location: {
        latitude: 24.935493,
        longitude: 67.0402338
      }
    },
    {
      address: 'Metro Stargate - Airport',
      phoneNumber: 123456789,
      location: {
        latitude: 24.8876151,
        longitude: 67.1519491
      }
    },
    {
      address: 'Dolmen Mall - Clifton',
      phoneNumber: 123456789,
      location: {
        latitude: 24.8022565,
        longitude: 67.0286247
      }
    },
    {
      address: 'Atrium Mall - Zaibunnisa Street',
      phoneNumber: 123456789,
      location: {
        latitude: 24.8560786,
        longitude: 67.0276965
      }
    }
  ]

  const handleMarkerButtonClick = (lat, lng) => {
    setMarkerPosition({
      lat: lat,
      lng: lng
    });
    setShowMarker(true);
  };

  return (
    <Fragment>
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
                {storeLocObj.map((item, index) => (
                  <div key={index} className="address">
                    <p className="d-flex align-items-center gap-2">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLocationDot} />
                      </span>
                      {item.address}
                    </p>
                    <p className="d-flex align-items-center gap-2">
                      <span className="icon">
                        <FontAwesomeIcon icon={faPhone} />
                      </span>
                      {item.phoneNumber}
                    </p>
                    <button className="btn-map"
                      onClick={() => handleMarkerButtonClick(item.location.latitude, item.location.longitude)}
                    >
                      Show on map
                    </button>
                  </div>
                ))}
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
                    {showMarker && <Marker position={markerPosition} />}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Store;