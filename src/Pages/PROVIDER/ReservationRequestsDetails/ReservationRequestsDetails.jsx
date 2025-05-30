// 📁 pages/ReservationRequestsDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../../utils/axiosInstance";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BedImageCarousel from "../../../Components/Provider/BedImageCarousel";
import RequestStatusCard from "../../../Components/Provider/RequestStatusCard";
import ApartmentPopup from "../../../Components/Provider/ApartmentPopup";
import StudentInfoSection from "../../../Components/Provider/StudentInfoSection";
import ActionButtons from "../../../Components/Provider/ActionButtons";
import RoomPopup from "../../../Components/Provider/RoomPopup";
import { LoginContext } from "../../../Context/Login/Login";
import "./ReservationRequestsDetails.scss";
import Loading2 from "../../../Components/Loading2/Loading2";
import { toast } from "react-toastify";
import { t } from "../../../translate/requestDetails";

const ReservationRequestsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showApartmentModal, setShowApartmentModal] = useState(false);
  const { darkMode, language } = useContext(LoginContext);
  const [requestData, setRequestData] = useState(null);
  const [bedImages, setBedImages] = useState([]);
  const [apartmentImages, setApartmentImages] = useState([]);
  const [roomImages, setRoomImages] = useState([]);

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const res = await api.get(`/rental-requests/provider/${id}`);
        const data = res.data.data;
        setRequestData(data);

        const apartmentId = data.bed.room.apartment.id;
        const imgRes = await api.get(`/image/apartments/${apartmentId}/images`);
        const imagesData = imgRes.data.data;

        const apartmentImages = imagesData.apartmentImages || [];
        const allRooms = imagesData.rooms || [];
        const beds = allRooms.flatMap((room) => room.beds || []);
        const bed = beds.find((b) => b.bedId === data.bed.id);
        const room = allRooms.find((r) => r.roomId === data.bed.room.id);

        setApartmentImages(apartmentImages);
        setBedImages(bed?.bedImages || []);
        setRoomImages(room?.roomImages || []);
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    fetchRequestData();
  }, [id]);

  const handleStatus = async (status) => {
    try {
      await api.post("/admin/request-approval", {
        id: requestData.id,
        status,
      });

      toast.success(
        `${t.request?.[language] || "Request"} ${
          t[status]?.[language] || status
        } ${t.success?.[language] || "successfully!"}`
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          t.error?.[language] ||
          "Something went wrong, please try again."
      );
      console.error(err);
    }
  };

  if (!requestData) return <Loading2 />;

  return (
    <div className={`container py-4 ${darkMode === "dr" ? "dark-mode" : ""}`}>
      <button
        className="btn btn-outline-secondary mb-4 w-25"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon className="me-2" />
        {t.back?.[language] || "Back"}
      </button>

      <h3 className="mb-4 text-primary">
        🏢 {t.apartmentDetails?.[language] || "Reservation Request Details"}
      </h3>

      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          <BedImageCarousel images={bedImages} />
        </div>

        <div className="col-md-7">
          <RequestStatusCard bed={requestData.bed} />
          <div className="d-flex gap-3 mt-3">
            <div
              className="p-2 border rounded bg-light hover-shadow w-50"
              style={{ cursor: "pointer" }}
              onClick={() => setShowApartmentModal(true)}
            >
              <span className="small d-block text-muted">
                {t.apartmentDetails?.[language] || "Apartment Info"}
              </span>
              <span className="fw-semibold text-primary">
                {t.clickToViewDetails?.[language] || "Click to view details"}
              </span>
            </div>
            <div
              className="p-2 border rounded bg-light hover-shadow w-50"
              style={{ cursor: "pointer" }}
              onClick={() => setShowRoomModal(true)}
            >
              <span className="small d-block text-muted">
                {t.rooms?.[language] || "Room Info"}
              </span>
              <span className="fw-semibold text-primary">
                {t.clickToViewDetails?.[language] || "Click to view details"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <ApartmentPopup
        show={showApartmentModal}
        onClose={() => setShowApartmentModal(false)}
        apartmentData={requestData.bed.room.apartment}
        apartmentImages={apartmentImages}
      />

      <RoomPopup
        show={showRoomModal}
        onClose={() => setShowRoomModal(false)}
        roomData={requestData.bed.room}
        roomImages={roomImages}
      />

      <StudentInfoSection student={requestData.student} />

      <ActionButtons
        onApprove={() => handleStatus("APPROVED")}
        onReject={() => handleStatus("REJECTED")}
      />
    </div>
  );
};

export default ReservationRequestsDetails;
