// ✅ ApartmentSection.jsx with full translation support
import React, { useContext } from "react";
import Carousel from "react-material-ui-carousel";
import ImageGallery from "./ImageGallery";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "./translate/requestDetails";
import PropTypes from "prop-types";

function ApartmentSection({ apartment, onToggle, onImageToggle }) {
  const { language } = useContext(LoginContext);

  return (
    <div className="details-grid mb-5 flex-lg-row flex-column gap-4">
      <div className="carousel-section">
        <Carousel
          navButtonsAlwaysVisible
          animation="slide"
          indicators={false}
          className="w-100 h-100 carousel"
        >
          {(apartment?.images?.length
            ? apartment.images
            : ["/placeholder.jpg"]
          ).map((img, i) => (
            <div className="CarouselItem" key={i}>
              <img
                src={img.url || img}
                className="carousel-image"
                alt={`apartment-${i}`}
              />
            </div>
          ))}
        </Carousel>
      </div>

      <div className="details-section">
        <div className="row g-3">
          {[
            "title",
            "floor",
            "size",
            "roomCount",
            "bathrooms",
            "furnished",
            "wifi",
            "elavator",
            "tv",
            "refrigerator",
            "washingMachine",
            "microwave",
            "stove",
            "Iron",
            "kettle",
            "standFan",
            "waterHeater",
            "gender",
          ].map((key, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div className="p-3 border rounded h-100 d-flex flex-column align-items-start">
                <span className="small">{t[key]?.[language] || key}</span>
                <span className="fw-semibold">
                  {typeof apartment?.data[key] === "boolean"
                    ? apartment.data[key]
                      ? t.available[language]
                      : t.notAvailable[language]
                    : apartment.data[key] || "-"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {language === "EN" ? (
          <p className="text-muted fs-4">{apartment?.data?.descriptionEn}</p>
        ) : (
          <p className="text-muted small fst-italic">
            {apartment?.data?.descriptionAr}
          </p>
        )}

        <ImageGallery images={apartment.images} onToggle={onImageToggle} />

        <button
          className={`btn mt-2 w-100 ${
            apartment.shouldApprove ? "btn-danger" : "btn-outline-success"
          }`}
          onClick={() => onToggle(apartment.id)}
        >
          {apartment.shouldApprove
            ? t.unselectApartment[language]
            : t.approveApartment[language]}
        </button>
      </div>
    </div>
  );
}
ApartmentSection.propTypes = {
  apartment: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired,
  onImageToggle: PropTypes.func.isRequired,
};

export default ApartmentSection;
