import React, { useContext } from "react";
import Carousel from "react-material-ui-carousel";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";
import PropTypes from "prop-types";

function BlockApartmentSection({ apartment }) {
  const { language } = useContext(LoginContext);

  const images = apartment?.images?.length
    ? apartment.images
    : ["/placeholder.jpg"];

  return (
    <div
      className={`details-grid p-3 mb-5 flex-column gap-4 ${
        apartment.shouldApprove ? "border-success" : "border"
      }`}
    >
      {/* ✅ Carousel */}
      <div className="carousel-section w-100">
        <Carousel
          navButtonsAlwaysVisible
          animation="slide"
          indicators={false}
          className="w-100 h-100 carousel"
        >
          {images.map((img, i) => (
            <div className="CarouselItem" key={i}>
              <img
                src={img.imageUrl || "/placeholder.jpg"}
                alt={`apartment-${i}`}
                loading="lazy"
                className="carousel-image"
                style={{
                  width: "100%",
                  height: "700px",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "10px",
                  backgroundColor: "#f8f9fa",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* ✅ Apartment Details */}
      <div className="details-section mt-4">
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

        {/* ✅ Description */}
        {language === "EN" ? (
          <p className="fs-4 pt-2 pb-2">{apartment?.data?.descriptionEn}</p>
        ) : (
          <p className="small fst-italic">{apartment?.data?.descriptionAr}</p>
        )}
      </div>
    </div>
  );
}

BlockApartmentSection.propTypes = {
  apartment: PropTypes.shape({
    id: PropTypes.string,
    images: PropTypes.array,
    shouldApprove: PropTypes.bool,
    data: PropTypes.object,
  }).isRequired,
};

export default BlockApartmentSection;
