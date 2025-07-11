import React, { useContext } from "react";
import PropTypes from "prop-types";
import HotelIcon from "@mui/icons-material/Hotel";
import ImageGallery from "./ImageGallery";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

function BedSection({ beds, onToggle, onImageToggle }) {
  const { language } = useContext(LoginContext);

  return (
    <div className="row">
      {beds.map((bed) => (
        <div className="col-md-4 mb-4 w-100" key={bed.id}>
          <div
            className={`card h-100 shadow-sm ${
              bed.shouldApprove ? "border-success" : "border"
            }`}
          >
            <div className="card-body">
              <h6 className="text-secondary   pt-3 pb-3">
                <HotelIcon className="me-1" />
                {language === "EN"
                  ? bed.data?.descriptionEn
                  : bed.data?.descriptionAr}
              </h6>

              <div className="row g-3">
                <div className="col-md-4 col-sm-6">
                  <div className="p-2 border rounded h-100">
                    <span className="small d-block">{t.price[language]}</span>
                    <span className="fw-semibold">{bed.data?.price} EGP</span>
                  </div>
                </div>
              </div>

              <ImageGallery images={bed.images} onToggle={onImageToggle} />

              <button
                className={`btn mt-2 w-100 ${
                  bed.shouldApprove ? "btn-danger" : "btn-outline-success"
                }`}
                onClick={() => onToggle(bed.id)}
              >
                {bed.shouldApprove
                  ? t.unselectBed[language]
                  : t.approveBed[language]}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
BedSection.propTypes = {
  beds: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      shouldApprove: PropTypes.bool.isRequired,
      data: PropTypes.shape({
        descriptionEn: PropTypes.string,
        descriptionAr: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
      images: PropTypes.array,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onImageToggle: PropTypes.func.isRequired,
};

export default BedSection;
