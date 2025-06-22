import React, { useContext } from "react";
import PropTypes from "prop-types";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

const RoomStatusCard = ({ room }) => {
  const { language } = useContext(LoginContext);

  const renderBoolean = (value) =>
    value
      ? language === "AR"
        ? "نعم"
        : "Yes"
      : language === "AR"
      ? "لا"
      : "No";

  return (
    <div className="row g-3">
      <div className="col-md-4">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.status?.[language] || "Status"}
          </span>
          <span className="fw-semibold">{room.status}</span>
        </div>
      </div>

      <div className="col-md-4">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.bedCount?.[language] || "Bed Count"}
          </span>
          <span className="fw-semibold">{room.bedCount}</span>
        </div>
      </div>

      <div className="col-md-4">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.availableFor?.[language] || "Available From"}
          </span>
          <span className="fw-semibold">{room.availableFor}</span>
        </div>
      </div>

      <div className="col-md-4">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.hasAC?.[language] || "Air Conditioner"}
          </span>
          <span className="fw-semibold">
            {renderBoolean(room.hasAirConditioner)}
          </span>
        </div>
      </div>

      {[
        { key: "wardrobe", label: t.wardrobe?.[language] || "Wardrobe" },
        { key: "Desk", label: t.desk?.[language] || "Desk" },
        { key: "nightStand", label: t.nightStand?.[language] || "Night Stand" },
        { key: "ceilingFan", label: t.ceilingFan?.[language] || "Ceiling Fan" },
        { key: "curtains", label: t.curtains?.[language] || "Curtains" },
        { key: "balcony", label: t.balcony?.[language] || "Balcony" },
      ].map(({ key, label }) => (
        <div className="col-md-4" key={key}>
          <div className="p-2 border rounded h-100">
            <span className="small d-block">{label}</span>
            <span className="fw-semibold">{renderBoolean(room[key])}</span>
          </div>
        </div>
      ))}

      <div className="col-md-4">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.createdAt?.[language] || "Created At"}
          </span>
          <span className="fw-semibold">
            {new Date(room.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="col-md-4">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.updatedAt?.[language] || "Updated At"}
          </span>
          <span className="fw-semibold">
            {new Date(room.updatedAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="col-md-12">
        <div className="p-2 border rounded h-100">
          <span className="small d-block">
            {t.descriptionLabel?.[language] || "Description"}
          </span>
          <span className="fw-semibold">
            {language === "AR" ? room.descriptionAr : room.descriptionEn}
          </span>
        </div>
      </div>
    </div>
  );
};

RoomStatusCard.propTypes = {
  room: PropTypes.object.isRequired,
};

export default RoomStatusCard;
