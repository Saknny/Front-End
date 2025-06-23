import React, { useEffect, useState, useContext, lazy } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Accordion from "react-bootstrap/Accordion";
import { toast } from "react-toastify";
import { t } from "../../../translate/requestDetails";
import { LoginContext } from "../../../Context/Login/Login";
import "./ReservationRequestsDetails.scss";
import Loading2 from "../../../Components/Loading2/Loading2";

// Lazy imports
const ApartmentPopup = lazy(() =>
  import("../../../Components/Provider/ApartmentPopup")
);
const BedPopup = lazy(() => import("../../../Components/Provider/BedPopup"));
const StudentInfoSection = lazy(() =>
  import("../../../Components/Provider/StudentInfoSection")
);
const ActionButtons = lazy(() =>
  import("../../../Components/Provider/ActionButtons")
);
const BedImageCarousel = lazy(() =>
  import("../../../Components/Provider/BedImageCarousel")
);
const RoomStatusCard = lazy(() =>
  import("../../../Components/Provider/RoomStatusCard ")
);

import {
  fetchRoomRequestDetails,
  fetchApartmentImagesBundle,
  setRoomRequestStatus,
} from "../../../Api/api";

export default function RoomReservationRequestDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, language } = useContext(LoginContext);

  const [requestData, setRequestData] = useState(null);
  const [apartmentImages, setApartmentImages] = useState([]);
  const [roomImages, setRoomImages] = useState([]);
  const [bedImages, setBedImages] = useState([]);
  const [showApartmentModal, setShowApartmentModal] = useState(false);
  const [showBedModal, setShowBedModal] = useState(false);
  const [bedData, setBedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRoomRequestDetails(id);
        const request = data[0];
        const apartmentId = request?.apartment?.id;
        const roomId = request?.apartment?.room?.id;

        const imagesBundle = await fetchApartmentImagesBundle(apartmentId);

        // دمج الصور مع كل bed حسب id
        const matchedRoom = imagesBundle.rooms?.find(
          (r) => r.roomId === roomId
        );

        if (matchedRoom && request.apartment?.room?.beds?.length) {
          const updatedBeds = request.apartment.room.beds.map((bed) => {
            const bedWithImages = matchedRoom.beds?.find(
              (b) => b.bedId === bed.id
            );
            return {
              ...bed,
              bedImages: bedWithImages?.bedImages || [],
            };
          });

          request.apartment.room.beds = updatedBeds;
        }

        setRequestData(request);
        setApartmentImages(imagesBundle.apartmentImages || []);
        setRoomImages(matchedRoom?.roomImages || []);
      } catch (error) {
        console.error("Error fetching room reservation details:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleStatus = async (status) => {
    try {
      await setRoomRequestStatus(requestData.id, status);
      toast.success(
        `${t.request?.[language] || "Request"} ${
          t[status]?.[language] || status
        } ${t.success?.[language] || "successfully!"}`
      );
      navigate(-1);
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          t.error?.[language] ||
          "Something went wrong."
      );
    }
  };

  if (!requestData) return <Loading2 />;

  const room = requestData?.apartment?.room;
  if (!room) {
    return (
      <div className="text-danger text-center my-5">
        {t.error?.[language] || "Room data is not available."}
      </div>
    );
  }

  return (
    <div className={`container py-4 ${darkMode === "dr" ? "dark-mode" : ""}`}>
      <button
        className="btn btn-outline-secondary mb-4 w-25"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon className="me-2" />
        {t.back?.[language] || "Back"}
      </button>

      <h3 className="mb-4 title">
        🏢 {t.apartmentDetails?.[language] || "Reservation Request Details"}
      </h3>

      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          <BedImageCarousel images={roomImages} />
        </div>

        <div className="col-md-7">
          <RoomStatusCard room={room} />

          <div
            className="p-2 border rounded bg-light hover-shadow mt-3"
            style={{ cursor: "pointer" }}
            onClick={() => setShowApartmentModal(true)}
          >
            <span className="small d-block title">
              {t.apartmentDetails?.[language] || "Apartment Info"}
            </span>
            <span className="fw-semibold title">
              {t.clickToViewDetails?.[language] || "Click to view details"}
            </span>
          </div>
        </div>
      </div>

      <Accordion defaultActiveKey="0" className="my-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            🛏️ {language === "EN" ? "Room" : "غرفة"} 1:{" "}
            {language === "EN" ? room.descriptionEn : room.descriptionAr}
          </Accordion.Header>
          <Accordion.Body>
            <div className="row g-3">
              {room?.beds?.map((bed) => (
                <div className="col-md-4" key={bed.id}>
                  <div className="p-3 border rounded bg-light h-100 card-like-box">
                    <h6>
                      {language === "EN"
                        ? bed.descriptionEn
                        : bed.descriptionAr}
                    </h6>
                    <p>
                      {t.status[language]}: {bed.status}
                    </p>
                    <p>
                      {t.price[language]}: {bed.price}
                    </p>
                    <button
                      className="btn btn-outline-secondary btn-sm "
                      onClick={() => {
                        setBedData(bed);
                        setBedImages(bed.bedImages || []); // ✅ كده الصور هتوصل صح
                        setShowBedModal(true);
                      }}
                    >
                      {t.View_Bed_Details[language]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <ApartmentPopup
        show={showApartmentModal}
        onClose={() => setShowApartmentModal(false)}
        apartmentData={requestData.apartment}
        apartmentImages={apartmentImages}
      />

      {bedData && (
        <BedPopup
          show={showBedModal}
          onClose={() => setShowBedModal(false)}
          bedData={bedData}
          bedImages={bedImages}
        />
      )}

      <StudentInfoSection student={requestData.student} />

      {requestData.status === "PENDING" && (
        <ActionButtons
          onApprove={() => handleStatus("approve")}
          onReject={() => handleStatus("reject")}
        />
      )}
    </div>
  );
}
