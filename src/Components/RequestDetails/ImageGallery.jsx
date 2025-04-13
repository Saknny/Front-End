import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

function ImageGallery({ images = [], onToggle }) {
  const { language } = useContext(LoginContext);

  return (
    <div className="row mt-2">
      {images.map((img) => (
        <div className="col-md-4 col-sm-6 mb-3" key={img.id}>
          <div
            className={`card shadow-sm ${
              img.shouldApprove ? "border-success" : "border"
            }`}
          >
            <img
              src={img.url}
              className="card-img-top rounded-top"
              alt="preview"
            />
            <div className="card-body">
              <p className="card-text">
                {t.status[language]}: {img.status}
              </p>
              <button
                className={`btn btn-sm w-100 ${
                  img.shouldApprove ? "btn-danger" : "btn-outline-success"
                }`}
                onClick={() => onToggle(img)}
              >
                {img.shouldApprove
                  ? t.unselectImage[language]
                  : t.approveImage[language]}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      url: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      shouldApprove: PropTypes.bool.isRequired,
    })
  ),
  onToggle: PropTypes.func.isRequired,
};

export default ImageGallery;
