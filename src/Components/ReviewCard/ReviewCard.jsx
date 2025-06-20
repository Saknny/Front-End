import React from "react";
import PropTypes from "prop-types";
import { FaStar } from "react-icons/fa";

const ReviewCard = ({ name, rating, image, message }) => {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <img
            src={image}
            alt={name}
            className="rounded-circle me-3"
            width="50"
            height="50"
          />
          <div>
            <h6 className="mb-0 fw-bold name">{name}</h6>
            <div className="text-warning rate">
              {[...Array(5)].map((_, idx) => (
                <FaStar
                  key={idx}
                  className={idx < rating ? "" : "text-light "}
                />
              ))}
            </div>
          </div>
        </div>
        <p className="message small">{message}</p>
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  name: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default ReviewCard;
