import React, { useContext } from "react";
import PropTypes from "prop-types";
import HotelIcon from "@mui/icons-material/Hotel";
import ImageGallery from "./ImageGallery";
import { LoginContext } from "../../Context/Login/Login";
import { t } from "../../translate/requestDetails";

const RoomSection = ({ rooms, onToggle, onImageToggle }) => {
  const { language } = useContext(LoginContext);

  return (
    <div className="row">
      {rooms.map((room) => (
        <div className="col-md-6 mb-4 w-100" key={room.id}>
          <div
            className={`card h-100 shadow-sm ${
              room.shouldApprove ? "border-success" : "border"
            }`}
          >
            <div className="card-body">
              <h6 className="text-secondary pt-3 pb-3 d-flex align-items-center">
                {/* <HotelIcon className="me-1" />{" "} */}
                <div className="home-icon d-flex align-items-center me-2 ">
                  <img
                    className="w-100 me-1 "
                    loading="lazy"
                    src="/room_icon.png"
                    alt=""
                  />
                </div>
                {language === "EN"
                  ? room.data?.descriptionEn
                  : room.data?.descriptionAr}
              </h6>
              <div className="row g-3">
                {[
                  "bedCount",
                  "Desk",
                  "balcony",
                  "hasAirConditioner",
                  "ceilingFan",
                  "curtains",
                  "nightStand",
                  "wardrobe",
                  "availableFor",
                ].map((key, index) => (
                  <div className="col-md-4 col-sm-6" key={index}>
                    <div className="p-2 border rounded h-100">
                      <span className="small d-block">
                        {t[key]?.[language] || key}
                      </span>
                      <span className="fw-semibold">
                        {typeof room.data[key] === "boolean"
                          ? room.data[key]
                            ? t.available[language]
                            : t.notAvailable[language]
                          : room.data[key] || "-"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <ImageGallery images={room.images} onToggle={onImageToggle} />

              <button
                className={`btn mt-2 w-100 ${
                  room.shouldApprove ? "btn-danger" : "btn-outline-success"
                }`}
                onClick={() => onToggle(room.id)}
              >
                {room.shouldApprove
                  ? t.unselectRoom[language]
                  : t.approveRoom[language]}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
RoomSection.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      data: PropTypes.object.isRequired,
      shouldApprove: PropTypes.bool.isRequired,
      images: PropTypes.array,
    })
  ).isRequired,
  onToggle: PropTypes.func.isRequired,
  onImageToggle: PropTypes.func.isRequired,
};

export default RoomSection;
