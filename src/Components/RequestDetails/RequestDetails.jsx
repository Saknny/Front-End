// ✅ Finalized RequestDetails.jsx with translation file support
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BedIcon from "@mui/icons-material/Bed"; // Added import for BedIcon
import HotelIcon from "@mui/icons-material/Hotel"; // Added import for HotelIcon
import ApartmentSection from "./ApartmentSection";
import RoomSection from "./RoomSection";
import BedSection from "./BedSection";
import "./RequestDetails.scss";
import { LoginContext } from "../../Context/Login/Login";
import Loading from "../Loading/Loading";
import { t } from "../../translate/requestDetails";
import api from "../../utils/axiosInstance";
const RequestDetails = () => {
  const { language, darkMode } = useContext(LoginContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);

  useEffect(() => {
    api.get(`/admin/request/${id}`).then((res) => {
      const data = res.data.data;
      data.items.forEach((item) => {
        item.shouldApprove = false;
        item.images?.forEach((img) => (img.shouldApprove = false));
      });
      setRequest(data);
    });
  }, [id]);

  const refresh = () => {
    api.get(`/admin/request/${id}`).then((res) => setRequest(res.data.data));
  };

  const toggleImageApproval = (image) => {
    image.shouldApprove = !image.shouldApprove;
    setRequest({ ...request });
  };

  const toggleItemApproval = (itemId) => {
    const updatedItems = request.items.map((item) =>
      item.id === itemId
        ? { ...item, shouldApprove: !item.shouldApprove }
        : item
    );
    setRequest({ ...request, items: updatedItems });
  };

  const canApprove = () => {
    let hasApprovedItem = false;
    let hasApprovedImage = false;

    let approvedApartment = false;
    let approvedRoom = false;
    let approvedBed = false;

    request.items.forEach((item) => {
      if (item.shouldApprove) {
        hasApprovedItem = true;

        const hasApprovedImages = item.images?.some((img) => img.shouldApprove);
        if (hasApprovedImages) {
          if (item.entityType === "APARTMENT") {
            approvedApartment = true;
          } else if (item.entityType === "ROOM") {
            approvedRoom = true;
          } else if (item.entityType === "BED") {
            approvedBed = true;
          }
        }
      }

      item.images?.forEach((img) => {
        if (img.shouldApprove) hasApprovedImage = true;
      });
    });

    // نختار النوع اللي اتوافق عليه حسب الأولوية
    const hasValidApproval =
      approvedApartment ||
      (!approvedApartment && approvedRoom) ||
      (!approvedApartment && !approvedRoom && approvedBed);

    return hasApprovedItem && hasApprovedImage && hasValidApproval;
  };

  const approveRequest = async (status) => {
    try {
      const approvedImages = [];
      const approvedItems = [];

      request.items.forEach((item) => {
        if (item.shouldApprove) approvedItems.push(item.id);
        item.images?.forEach((img) => {
          if (img.shouldApprove) approvedImages.push(img.id);
        });
      });

      await Promise.all(
        approvedImages.map((imgId) =>
          api.patch(`/admin/${imgId}/image-approval`, {
            status: "APPROVED",
          })
        )
      );

      await Promise.all(
        approvedItems.map((itemId) =>
          api.patch(`/admin/item-approval`, {
            id: itemId,
            status: "APPROVED",
          })
        )
      );

      await api.patch(`/admin/request-approval`, {
        id: request.id,
        status,
      });
      console.log("✅ Approved Images:", approvedImages);
      console.log("✅ Approved Items:", approvedItems);
      console.log("✅ Final Request ID:", request.id);
      console.log("✅ Final Request Status:", status);

      toast.success(t.success[language]);
      navigate("/requests");
      refresh();
    } catch (err) {
      console.error("Error approving request:", err);
      toast.error(t.error[language]);
    }
  };

  if (!request)
    return (
      <div className="text-center mt-4">
        <Loading />
      </div>
    );

  const apartment = request.items.find((i) => i.entityType === "APARTMENT");
  const rooms = request.items.filter((i) => i.entityType === "ROOM");
  const beds = request.items.filter((i) => i.entityType === "BED");

  return (
    <div className={`container py-4 request-details-container ${darkMode}`}>
      <button
        className="btn btn-outline-secondary mb-4 w-25"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon className="me-2" /> {t.back[language]}
      </button>

      <h3 className="mb-4 text-primary">🏢 {t.apartmentDetails[language]}</h3>
      {apartment && (
        <ApartmentSection
          apartment={apartment}
          onToggle={toggleItemApproval}
          onImageToggle={toggleImageApproval}
          t={t}
          language={language}
        />
      )}

      <h4 className="mt-4">
        {/* <HotelIcon className="me-1" /> {t.rooms[language]} */}
        <div className="home-icon d-flex align-items-center ">
          <img className="w-100 me-2 " src="/room_icon.png" alt="" />
          {t.rooms[language]}
        </div>
      </h4>
      {rooms && (
        <RoomSection
          rooms={rooms}
          onToggle={toggleItemApproval}
          onImageToggle={toggleImageApproval}
          t={t}
          language={language}
        />
      )}

      <h4 className="mt-5">
        <HotelIcon className="me-1" /> {t.beds[language]}
      </h4>
      {beds && (
        <BedSection
          beds={beds}
          onToggle={toggleItemApproval}
          onImageToggle={toggleImageApproval}
          t={t}
          language={language}
        />
      )}

      {request.status === "PENDING" && (
        <div className="mt-4 d-flex gap-3 justify-content-center">
          <button
            className="btn btn-success px-4"
            onClick={() => approveRequest("APPROVED")}
            disabled={!canApprove()}
            title={!canApprove() ? t.validation[language] : ""}
          >
            <CheckCircleIcon className="me-2" /> {t.approveRequest[language]}
          </button>
          <button
            className="btn btn-danger px-4"
            onClick={() => approveRequest("REJECTED")}
          >
            <CancelIcon className="me-2" /> {t.rejectRequest[language]}
          </button>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
