// 📁 Components/Provider/BedPopup.jsx
import React, { useContext } from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

const avatarFallback = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const BedPopup = ({ show, onClose, bedData, bedImages }) => {
  const { language } = useContext(LoginContext);

  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          🛏️ {t.bedDetailsTitle?.[language] || "Bed Details"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Bed Images Carousel */}
        <div
          id="bedImagesCarousel"
          className="carousel slide mb-4"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner rounded">
            {bedImages.length > 0 ? (
              bedImages.map((img, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={img.id}
                >
                  <img
                    loading="lazy"
                    src={img.imageUrl || avatarFallback}
                    className="d-block w-100 rounded border"
                    alt="Bed"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <img
                  loading="lazy"
                  src={avatarFallback}
                  alt={t.defaultBed?.[language] || "Default Bed"}
                  className="d-block w-100 rounded border"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}
          </div>
          {bedImages.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#bedImagesCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" />
                <span className="visually-hidden">
                  {t.previous?.[language] || "Previous"}
                </span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#bedImagesCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" />
                <span className="visually-hidden">
                  {t.next?.[language] || "Next"}
                </span>
              </button>
            </>
          )}
        </div>

        {/* Bed Info */}
        <div className="bed-info bg-light rounded p-3 shadow-sm">
          <h5 className="text-primary fw-bold mb-2">
            {t.bedInformation?.[language] || "Bed Information"}
          </h5>
          <p className="text-muted">
            {language === "AR" ? bedData.descriptionAr : bedData.descriptionEn}
          </p>

          <div className="row g-3">
            {["status", "price", "createdAt"].map((key, index) => (
              <div className="col-md-4" key={index}>
                <div className="info-card p-2 border rounded bg-white h-100">
                  <span className="text-muted small d-block">
                    {t[key]?.[language] ||
                      key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <span className="fw-semibold">
                    {key === "createdAt"
                      ? new Date(bedData[key]).toLocaleDateString(
                          language === "AR" ? "ar-EG" : "en-US"
                        )
                      : bedData[key]}
                  </span>
                </div>
              </div>
            ))}
          </div>
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

BedPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  bedData: PropTypes.object.isRequired,
  bedImages: PropTypes.array.isRequired,
};

export default BedPopup;
