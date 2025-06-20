import React from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";
import "./ReviewCard.scss";
const ReviewCard = ({ name, rating, image, message, date }) => {
  const formattedDate = new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card h-100 shadow-sm border-0 review-card">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3 review-colect">
          <img
            src={image}
            alt={name}
            className="rounded-circle me-3"
            width="50"
            height="50"
            style={{ objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <h6 className="mb-0 fw-bold">{name}</h6>
            <div className="text-warning d-flex">
              {[...Array(5)].map((_, idx) => (
                <FaStar
                  key={idx}
                  className={idx < rating ? "" : "text-secondary"}
                />
              ))}
            </div>
          </div>
          <small className="text-muted">{formattedDate}</small>
        </div>
        <p className="mb-0 text-secondary small">{message}</p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  date: PropTypes.string, // optional
};

export default ReviewCard;
