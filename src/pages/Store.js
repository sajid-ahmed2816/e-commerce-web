import Header from "../components/Header";
import Footer from "../components/Footer";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { useState } from "react";
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
      address: 'Shop # 1, Abc Road, XYZ Area, Karachi',
      phoneNumber: 123456789,
      location: {
        latitude: 24.87738663284456,
        longitude: 67.06261553860841
      }
    },
    {
      address: 'Shop # 2, Abc Road, XYZ Area, Karachi',
      phoneNumber: 123456789,
      location: {
        latitude: 24.89800435971366,
        longitude: 67.07728226700415
      }
    },
    {
      address: 'Shop # 3, Abc Road, XYZ Area, Karachi',
      phoneNumber: 123456789,
      location: {
        latitude: 24.921103533751104, 
        longitude: 67.03231168213736
      }
    },
    {
      address: 'Shop # 4, Abc Road, XYZ Area, Karachi',
      phoneNumber: 123456789,
      location: {
        latitude: 24.88940162210062, 
        longitude: 67.15203807909147
      }
    },
    {
      address: 'Shop # 5, Abc Road, XYZ Area, Karachi',
      phoneNumber: 123456789,
      location: {
        latitude: 24.804266354404916, 
        longitude: 67.02909641048079
      }
    },
    {
      address: 'Shop # 6, Abc Road, XYZ Area, Karachi',
      phoneNumber: 123456789,
      location: {
        latitude: 24.855799445300946, 
        longitude: 67.01034840432558
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
                {storeLocObj.map((item, index) => (
                  <div key={index} className="address">
                    <p className="d-flex align-items-center gap-2">
                      <span className="icon">
                        <FontAwesomeIcon icon={faLocationDot}/>
                      </span>
                      {item.address}
                    </p>
                    <p className="d-flex align-items-center gap-2">
                      <span className="icon">
                        <FontAwesomeIcon icon={faPhone}/>
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

      <Footer />
    </>
  )
}

export default Store;