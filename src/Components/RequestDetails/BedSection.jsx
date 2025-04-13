import React, { useContext } from "react";
import PropTypes from "prop-types";
import BedIcon from "@mui/icons-material/Bed";
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
              {language === "EN" ? (
                <h6>
                  <BedIcon className="me-1 text-muted" />{" "}
                  {bed.data?.descriptionEn}
                </h6>
              ) : (
                <h6 className="text-muted small fst-italic">
                  {bed.data?.descriptionAr}
                </h6>
              )}

              <div className="row g-3">
                <div className="col-3">
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
