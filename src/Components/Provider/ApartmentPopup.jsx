import React, { useContext } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

const avatarFallback = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const ApartmentPopup = ({ show, onClose, apartmentData, apartmentImages }) => {
  const { language } = useContext(LoginContext);

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          🏢 {t.apartmentDetailsTitle?.[language] || "Apartment Details"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          id="apartmentImagesCarousel"
          className="carousel slide mb-4"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner rounded">
            {apartmentImages.length > 0 ? (
              apartmentImages.map((img, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={img.id}
                >
                  <img
                    src={img.imageUrl || avatarFallback}
                    className="d-block w-100 rounded shadow-sm border"
                    alt="Apartment"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <img
                  src={avatarFallback}
                  alt="Default Apartment"
                  className="d-block w-100 rounded border"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}
          </div>
          {apartmentImages.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#apartmentImagesCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#apartmentImagesCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>

        <div className="apartment-info bg-light rounded p-3 shadow-sm">
          <h5 className="text-primary fw-bold mb-2">{apartmentData.title}</h5>
          <p className="text-muted">
            {language === "AR"
              ? apartmentData.descriptionAr
              : apartmentData.descriptionEn}
          </p>

          <div className="row g-3 mt-3">
            {[
              "status",
              "bookingStatus",
              "gender",
              "roomCount",
              "bathrooms",
              "size",
              "floor",
              "locationEnum",
            ].map((key, index) => (
              <div className="col-md-3" key={index}>
                <div className="info-card p-2 border rounded bg-white h-100">
                  <span className="text-muted small d-block">
                    {t[key]?.[language] ||
                      key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <span className="fw-semibold">{apartmentData[key]}</span>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <h6 className="fw-bold">
            {t.facilities?.[language] || "Facilities"}:
          </h6>
          <ul className="row list-unstyled ps-3">
            {[
              "tv",
              "refrigerator",
              "stove",
              "microwave",
              "kettle",
              "washingMachine",
              "waterHeater",
              "standFan",
              "iron",
              "wifi",
            ]
              .filter((key) => apartmentData[key])
              .map((key, i) => (
                <li className="col-4 mb-1" key={i}>
                  ✅ {t[key]?.[language] || key}
                </li>
              ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          {t.close?.[language] || "Close"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ApartmentPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  apartmentData: PropTypes.object.isRequired,
  apartmentImages: PropTypes.array.isRequired,
};

export default ApartmentPopup;
