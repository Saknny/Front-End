import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./BlockedApartmentDetails.scss";
import React from "react";
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
import BlockApartmentSection from "../../../Components/BlockApartmentSection/BlockApartmentSection";

function BlockedApartmentDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, language } = useContext(LoginContext);

  const [apartment, setApartment] = useState(null);
  const [roomImagesList, setRoomImagesList] = useState([]);

  const [roomData, setRoomData] = useState(null);
  const [bedData, setBedData] = useState(null);
  const [roomImages, setRoomImages] = useState([]);
  const [bedImages, setBedImages] = useState([]);

  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showBedModal, setShowBedModal] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axiosInstance.get(`/apartment/${id}`);
        const apartmentData = res.data.data.apartment;

        const imagesData = await fetchApartmentImagesBundle(id);

        setApartment({
          id,
          images: imagesData.apartmentImages || [],
          data: apartmentData,
        });

        setRoomImagesList(imagesData.rooms || []);
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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosInstance.get("/review/apartmentReviews", {
          params: {
            apartmentId: id,
          },
        });

        const fetchedReviews = res.data.data.reviews.map((review) => ({
          name: review.student.fullName,
          rating: review.rating,
          date: review.createdAt,
          image: review.student.photo,
          message: review.comment,
        }));

        setReviews(fetchedReviews);
      } catch (err) {
        console.error("❌ Failed to load apartment reviews:", err);
      }
    };

    if (id) fetchReviews();
  }, [id]);

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

      <h3 className="mb-4 title">
        🏢{" "}
        {t.BlockedApartmentsDetails?.[language] ||
          "Reservation Request Details"}
      </h3>

      {apartment && <BlockApartmentSection apartment={apartment} />}

      <Accordion defaultActiveKey="0" className="mb-4">
        {apartment?.data?.rooms?.map((room, index) => {
          const matchedRoom =
            roomImagesList.find((r) => r.roomId === room.id) || {};
          const matchedRoomImages = matchedRoom.roomImages || [];

          return (
            <Accordion.Item eventKey={index.toString()} key={room.id}>
              <Accordion.Header>
                🛏️ {language == "EN" ? "room" : "غرفه"} {index + 1}:{" "}
                {language == "EN" ? room.descriptionEn : room.descriptionAr}
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
                    {t.ViewRoomDetails[language]}
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
                          <h6>
                            {language == "EN"
                              ? bed.descriptionEn
                              : bed.descriptionAr}
                          </h6>
                          <p className="Status">
                            {t.status[language]}: {bed.status}
                          </p>
                          <p className="Price">
                            {t.price[language]}: {bed.price}
                          </p>
                          <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => {
                              setBedData(bed);
                              setBedImages(matchedBedImages);
                              setShowBedModal(true);
                            }}
                          >
                            {t.View_Bed_Details[language]}
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
        <button
          className="btn btn-success mx-2 w-100"
          style={{ backgroundColor: "#18878a" }}
          onClick={handleUnblock}
        >
          🔓 {t.unblock?.[language] || "Unblock"}
        </button>
      </div>
    </div>
  );
}

export default BlockedApartmentDetails;
