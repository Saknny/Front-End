// 📁 components/RequestStatusCard.js
import React from "react";
import PropTypes from "prop-types";

const RequestStatusCard = ({ bed }) => {
  return (
    <div className="row g-3">
      <div className="col-md-6">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">Status</span>
          <span className="fw-semibold">{bed.status}</span>
        </div>
      </div>
      <div className="col-md-6">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">Price</span>
          <span className="fw-semibold">{bed.price} EGP</span>
        </div>
      </div>
      <div className="col-md-12">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">Description (EN)</span>
          <span className="fw-semibold">{bed.descriptionEn}</span>
        </div>
      </div>
      <div className="col-md-12">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">Created At</span>
          <span className="fw-semibold">
            {new Date(bed.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="col-md-12">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">Updated At</span>
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
    createdAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    updatedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  }).isRequired,
};

export default RequestStatusCard;
