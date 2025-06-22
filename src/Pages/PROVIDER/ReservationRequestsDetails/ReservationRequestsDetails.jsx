// 📁 pages/ReservationRequestsDetails.jsx
import React, { useEffect, useState, useContext, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const BedImageCarousel = lazy(() =>
  import("../../../Components/Provider/BedImageCarousel")
);
const RequestStatusCard = lazy(() =>
  import("../../../Components/Provider/RequestStatusCard")
);
const ApartmentPopup = lazy(() =>
  import("../../../Components/Provider/ApartmentPopup")
);
const StudentInfoSection = lazy(() =>
  import("../../../Components/Provider/StudentInfoSection")
);
const ActionButtons = lazy(() =>
  import("../../../Components/Provider/ActionButtons")
);
const RoomPopup = lazy(() => import("../../../Components/Provider/RoomPopup"));
import { LoginContext } from "../../../Context/Login/Login";
import "./ReservationRequestsDetails.scss";
import Loading2 from "../../../Components/Loading2/Loading2";
import { toast } from "react-toastify";
import { t } from "../../../translate/requestDetails";
import {
  fetchRentalRequestDetails,
  fetchApartmentImagesBundle,
  setRentalRequestStatus,
} from "../../../Api/api";
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
        const data = await fetchRentalRequestDetails(id);
        setRequestData(data);

        const apartmentId = data.bed.room.apartment.id;
        const imagesData = await fetchApartmentImagesBundle(apartmentId);

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
      await setRentalRequestStatus(requestData.id, status);
      navigate(-1);
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

      {requestData.status === "PENDING" && (
        <ActionButtons
          onApprove={() => handleStatus("approve")}
          onReject={() => handleStatus("reject")}
        />
      )}
    </div>
  );
};

export default ReservationRequestsDetails;
