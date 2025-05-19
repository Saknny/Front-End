// 📁 components/RoomPopup.js
import React from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const avatarFallback = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const RoomPopup = ({ show, onClose, roomData, roomImages }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>🛌 Room Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Room Images Carousel */}
        <div
          id="roomImagesCarousel"
          className="carousel slide mb-4"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner rounded">
            {roomImages.length > 0 ? (
              roomImages.map((img, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={img.id}
                >
                  <img
                    src={img.imageUrl || avatarFallback}
                    className="d-block w-100 rounded border"
                    alt="Room"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <img
                  src={avatarFallback}
                  alt="Default Room"
                  className="d-block w-100 rounded border"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}
          </div>
          {roomImages.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#roomImagesCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#roomImagesCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>

        {/* Room Info */}
        <div className="room-info bg-light rounded p-3 shadow-sm">
          <h5 className="text-primary fw-bold mb-2">Room Information</h5>
          <p className="text-muted">{roomData.descriptionEn}</p>

          <div className="row g-3">
            {["status", "availableFor", "bedCount"].map((key, index) => (
              <div className="col-md-4" key={index}>
                <div className="info-card p-2 border rounded bg-white h-100">
                  <span className="text-muted small d-block">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                  <span className="fw-semibold">{roomData[key]}</span>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <h6 className="fw-bold">Facilities:</h6>
          <ul className="row list-unstyled ps-3">
            {[
              "hasAirConditioner",
              "wardrobe",
              "Desk",
              "nightStand",
              "ceilingFan",
              "curtains",
              "balcony",
            ]
              .filter((key) => roomData[key])
              .map((key, i) => (
                <li className="col-4 mb-1" key={i}>
                  ✅{" "}
                  {key
                    .replace(/([A-Z])/g, " $1")
                    .replace(/^./, (str) => str.toUpperCase())}
                </li>
              ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
RoomPopup.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  roomData: PropTypes.object.isRequired,
  roomImages: PropTypes.array.isRequired,
};

export default RoomPopup;
