import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./BlockedApartmentDetails.scss";
import React from "react";
import ApartmentPopup from "../../../Components/Provider/ApartmentPopup";
import RoomPopup from "../../../Components/Provider/RoomPopup";
import BedPopup from "../../../Components/Provider/BedPopup";
import axiosInstance from "../../../utils/axiosInstance";
import { fetchApartmentImagesBundle } from "../../../Api/api";
import ReviewCard from "../../../Components/ReviewCard/ReviewCard";
import Accordion from "react-bootstrap/Accordion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { t } from "../../../translate/requestDetails";
import { LoginContext } from "../../../Context/Login/Login";
import { toast } from "react-toastify";
function BlockedApartmentDetails() {
  const { id } = useParams();

  const [apartmentData, setApartmentData] = useState(null);
  const [roomData, setRoomData] = useState(null);
  const [bedData, setBedData] = useState(null);

  const [apartmentImages, setApartmentImages] = useState([]);
  const [roomImages, setRoomImages] = useState([]);
  const [bedImages, setBedImages] = useState([]);
  const [roomImagesList, setRoomImagesList] = useState([]);

  const [showApartmentModal, setShowApartmentModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showBedModal, setShowBedModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { darkMode, language } = useContext(LoginContext);

  const reviewsPerPage = 3;

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axiosInstance.get(`/apartment/${id}`);

        const apartment = res.data.data.apartment;
        setApartmentData(apartment);

        const imagesData = await fetchApartmentImagesBundle(id);
        setApartmentImages(imagesData.apartmentImages || []);
        setRoomImagesList(imagesData.rooms || []);

        const ress = await axiosInstance.get(`/report/apartmentReports/${id}`);
        console.log(ress);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchAll();
  }, [id]);

  const handleUnblock = async () => {
    try {
      await axiosInstance.patch(`/report/unblock`, {
        apartmentId: id,
      });

      toast.success(
        `${t.apartment?.[language] || "Apartment"} ${
          t.unblock?.[language] || "unblocked"
        } ${t.success?.[language] || "successfully!"}`
      );
      navigate(-1);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          t.error?.[language] ||
          "Something went wrong, please try again."
      );
      console.error(err);
    }
  };

  if (!apartmentData) return <div className="text-center">Loading...</div>;

  const reviews = [
    {
      name: "Floyd Miles",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      message:
        "The apartment was clean and well-maintained. Very quiet area, I liked it!",
    },
    {
      name: "Ronald Richards",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      message:
        "Spacious and had everything I needed. I’d definitely book it againnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn.",
    },
    {
      name: "Savannah Nguyen",
      rating: 4,
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      message: "Great location and friendly host. AC could be better.",
    },
    {
      name: "Ali Ahmed",
      rating: 3,
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      message: "Nice place, but had some noise from the street at night.",
    },
  ];

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  return (
    <div
      className={`container py-4 blocked-details ${
        darkMode === "dr" ? "dark-mode" : ""
      }`}
    >
      <button
        className="btn btn-outline-secondary mb-4 w-25"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon className="me-2" />
        {t.back?.[language] || "Back"}
      </button>

      <h3 className="mb-4 text-primary">
        🏢{" "}
        {t.BlockedApartmentsDetails?.[language] ||
          "Reservation Request Details"}
      </h3>
      {/* Apartment Overview Button */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div
            className="p-3 border rounded bg-light"
            style={{ cursor: "pointer" }}
            onClick={() => setShowApartmentModal(true)}
          >
            <small className="view-details-btn">
              Apartment Request Details
            </small>
            <div className="fw-bold text-primary mt-1">
              Click to view details
            </div>
          </div>
        </div>
      </div>

      {/* Rooms and Beds - Accordion */}
      <Accordion defaultActiveKey="0" className="mb-4">
        {apartmentData.rooms?.map((room, index) => {
          const matchedRoom =
            roomImagesList.find((r) => r.roomId === room.id) || {};
          const matchedRoomImages = matchedRoom.roomImages || [];

          return (
            <Accordion.Item eventKey={index.toString()} key={room.id}>
              <Accordion.Header>
                🛏️ Room {index + 1}: {room.descriptionEn}
              </Accordion.Header>
              <Accordion.Body>
                <div className="d-flex justify-content-end mb-3">
                  <button
                    className="btn btn-outline-info btn-sm"
                    onClick={() => {
                      setRoomData(room);
                      setRoomImages(matchedRoomImages);
                      setShowRoomModal(true);
                    }}
                  >
                    View Room Details
                  </button>
                </div>

                <div className="row g-3">
                  {room.beds?.map((bed) => {
                    const matchedBed =
                      matchedRoom.beds?.find((b) => b.bedId === bed.id) || {};
                    const matchedBedImages = matchedBed.bedImages || [];

                    return (
                      <div className="col-md-4" key={bed.id}>
                        <div className="p-3 border rounded bg-light h-100 card-like-box">
                          <h6>{bed.descriptionEn}</h6>
                          <p className="Status">Status: {bed.status}</p>
                          <p className="Price">Price: {bed.price}</p>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => {
                              setBedData(bed);
                              setBedImages(matchedBedImages);
                              setShowBedModal(true);
                            }}
                          >
                            View Bed Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>

      {/* Popups */}
      <ApartmentPopup
        show={showApartmentModal}
        onClose={() => setShowApartmentModal(false)}
        apartmentData={apartmentData}
        apartmentImages={apartmentImages}
      />
      {roomData && (
        <RoomPopup
          show={showRoomModal}
          onClose={() => setShowRoomModal(false)}
          roomData={roomData}
          roomImages={roomImages}
        />
      )}
      {bedData && (
        <BedPopup
          show={showBedModal}
          onClose={() => setShowBedModal(false)}
          bedData={bedData}
          bedImages={bedImages}
        />
      )}

      {/* Reviews */}
      <h4 className="mb-3 fw-bold">Customer Reviews</h4>
      <div className="row g-4">
        {paginatedReviews.map((rev, i) => (
          <div className="col-md-4" key={i}>
            <ReviewCard {...rev} />
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>
        <div>
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i}
              className={`mx-1 px-2 py-1 rounded-circle ${
                currentPage === i + 1 ? "bg-primary text-white" : "bg-light"
              }`}
              style={{ cursor: "pointer" }}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
        </div>
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
      <div className="section text-center pt-4 mt-4 d-flex justify-content-center w-100">
        <button className="btn btn-success mx-2 w-100" onClick={handleUnblock}>
          🔓 {t.unblock?.[language] || "Unblock"}
        </button>
      </div>
    </div>
  );
}

export default BlockedApartmentDetails;
