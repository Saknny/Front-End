// 📁 components/RequestStatusCard.js
import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

const RequestStatusCard = ({ bed }) => {
  const { language } = useContext(LoginContext);

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.status?.[language] || "Status"}
          </span>
          <span className="fw-semibold">{bed.status}</span>
        </div>
      </div>
      <div className="col-md-6">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.price?.[language] || "Price"}
          </span>
          <span className="fw-semibold">{bed.price} EGP</span>
        </div>
      </div>
      {language === "AR" ? (
        <div className="col-md-12">
          <div className="p-2 border rounded h-100">
            <span className="small d-block">
              {t.descriptionLabel?.[language]}
            </span>
            <span className="fw-semibold">{bed.descriptionAr}</span>
          </div>
        </div>
      ) : (
        <div className="col-md-12">
          <div className="p-2 border rounded h-100">
            <span className="small d-block">
              {t.descriptionLabel?.[language] || "Available For"}
            </span>
            <span className="fw-semibold">{bed.descriptionEn}</span>
          </div>
        </div>
      )}

      <div className="col-md-12">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.createdAt?.[language] || "Created At"}
          </span>
          <span className="fw-semibold">
            {new Date(bed.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="col-md-12">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.updatedAt?.[language] || "Updated At"}
          </span>
          <span className="fw-semibold">
            {new Date(bed.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

RequestStatusCard.propTypes = {
  bed: PropTypes.shape({
    status: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    descriptionEn: PropTypes.string,
    descriptionAr: PropTypes.string,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    updatedAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }).isRequired,
};

export default RequestStatusCard;
