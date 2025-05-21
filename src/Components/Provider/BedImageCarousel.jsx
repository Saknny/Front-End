// 📁 components/BedImageCarousel.js
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

const avatarFallback = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const BedImageCarousel = ({ images }) => {
  const { language } = useContext(LoginContext);

  return images.length > 0 ? (
    <div
      id="bedImagesCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner rounded">
        {images.map((img, index) => (
          <div
            className={`carousel-item ${index === 0 ? "active" : ""}`}
            key={img.id}
          >
            <img
              src={img.imageUrl || avatarFallback}
              className="d-block w-100 rounded"
              alt="Bed"
              style={{ maxHeight: "400px" }}
            />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#bedImagesCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
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
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">
              {t.next?.[language] || "Next"}
            </span>
          </button>
        </>
      )}
    </div>
  ) : (
    <img
      src={avatarFallback}
      alt={t.defaultBed?.[language] || "Default Bed"}
      className="d-block w-100 rounded border"
      style={{ maxHeight: "400px" }}
    />
  );
};

BedImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      imageUrl: PropTypes.string,
    })
  ).isRequired,
};

export default BedImageCarousel;
