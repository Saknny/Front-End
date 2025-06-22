// ✅ ملف: CompleteProfileDetails.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchRequestById,
  approveItem,
  approveRequestStatus,
} from "../../Api/api";
import "./CompleteProfileDetails.scss";
import { toast } from "react-toastify";
import Loading2 from "../../Components/Loading2/Loading2";
import { LoginContext } from "../../Context/Login/Login";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { t } from "../../translate/requestDetails";

const CompleteProfileDetails = () => {
  const [requestData, setRequestData] = useState(null);
  const [fullProfile, setFullProfile] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode, language } = useContext(LoginContext);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await fetchRequestById(id);
        const resData = response.data || response;

        if (!resData) {
          setRequestData(null);
          return;
        }

        const isUpdateRequest = resData.type === "PROFILE_UPDATE";
        setIsUpdate(isUpdateRequest);

        if (isUpdateRequest) {
          setFullProfile(resData.fullProfile || null);
        }

        const normalizedRequest = resData;

        if (!normalizedRequest || !normalizedRequest.items) {
          setRequestData(null);
          return;
        }

        normalizedRequest.items.forEach((item) => {
          item.shouldApprove = false;
          item.imagesData = [
            {
              id: "profileImage",
              url: item.data.image
                ? `http://45.88.223.182:4000${item.data.image}`
                : null,
              shouldApprove: false,
              type: t.profileImage[language],
            },
            {
              id: "idCardImage",
              url: item.data.idCard
                ? item.data.idCard.startsWith("/") ||
                  item.data.idCard.startsWith("/9j")
                  ? `data:image/jpeg;base64,${item.data.idCard}`
                  : item.data.idCard
                : null,
              shouldApprove: false,
              type: t.idCard[language],
            },
          ];
        });

        setRequestData(normalizedRequest);
      } catch (error) {
        console.error("Error fetching request:", error);
        setRequestData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) return <Loading2 />;
  if (!requestData)
    return <div className="text-center my-5">{t.noData[language]}</div>;

  const item = requestData.items[0];

  const getField = (key) => {
    return item.data[key] !== undefined && item.data[key] !== null
      ? item.data[key]
      : fullProfile?.[key] ?? "-";
  };

  const getBooleanField = (key) => {
    const val =
      item.data[key] !== undefined ? item.data[key] : fullProfile?.[key];
    return val ? t.yes[language] : t.no[language];
  };

  const getHobbies = () => {
    const hobbies = item.data.hobbies || fullProfile?.hobbies || [];
    return hobbies.length > 0 ? (
      hobbies.map((hobby, index) => (
        <span key={index} className="badge bg-secondary me-2">
          {hobby}
        </span>
      ))
    ) : (
      <span>{t.noHobbies[language]}</span>
    );
  };

  const toggleItemApproval = () => {
    item.shouldApprove = !item.shouldApprove;
    setRequestData({ ...requestData });
  };

  const approveRequest = async (status) => {
    try {
      if (item.shouldApprove) {
        await approveItem(item.id);
      }
      await approveRequestStatus(requestData.id, status);

      toast[status === "APPROVED" ? "success" : "error"](
        `Request ${
          status === "APPROVED" ? t.approved[language] : t.rejected[language]
        } successfully`
      );

      navigate("/complete-profile/user");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error(t.errorApproving[language]);
    }
  };

  return (
    <div className={`complete-profile-details container py-4 ${darkMode}`}>
      <button
        className="btn btn-outline-secondary mb-4 w-25"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon className="me-2" /> {t.back[language]}
      </button>

      <h3 className="mb-4 title">🏢 {t.requestDetails[language]}</h3>

      <div className="row">
        {item.imagesData.map(
          (img) =>
            img.url && (
              <div
                key={img.id}
                className="col-sm-6 col-12 col-md-6 col-lg-4  mb-4"
              >
                <div className="col-md-6  w-100 mb-4 d-flex flex-column align-items-center">
                  <div className="card shadow-sm image-card w-100">
                    <img
                      loading="lazy"
                      src={img.url}
                      alt={img.type}
                      className="card-img-top profile-image"
                    />
                  </div>
                  <h6 className="mt-2 text-center">{img.type}</h6>
                </div>
              </div>
            )
        )}

        <div className="col-12">
          <div className="card shadow-sm p-3 profile-data-card">
            <h5 className="title mb-3">{t.userInfo[language]}</h5>
            <div className="row g-3">
              {[
                [t.firstName[language], "firstName"],
                [t.lastName[language], "lastName"],
                [t.facebook[language], "facebook"],
                [t.phone[language], "phone"],
                [t.major[language], "major"],
                [t.smoking[language], "smoking"],
                [t.socialPerson[language], "socialPerson"],
                [t.linkedin[language], "linkedin"],
                [t.instagram[language], "instagram"],
                [t.university[language], "university"],
                [t.level[language], "level"],
              ].map(([label, key]) => (
                <div className="col-12 col-md-6 col-lg-4" key={key}>
                  <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                    <span className="fw-semibold">
                      <strong>{label}:</strong>{" "}
                      {key === "smoking" || key === "socialPerson" ? (
                        getBooleanField(key)
                      ) : key === "facebook" ||
                        key === "linkedin" ||
                        key === "instagram" ? (
                        <a
                          href={getField(key)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {getField(key)}
                        </a>
                      ) : (
                        getField(key)
                      )}
                    </span>
                  </div>
                </div>
              ))}

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>{t.hobbies[language]}:</strong> {getHobbies()}
                  </span>
                </div>
              </div>
            </div>

            <button
              className={`btn w-100 mt-3 ${
                item.shouldApprove ? "btn-danger" : "btn-success"
              }`}
              onClick={toggleItemApproval}
            >
              {item.shouldApprove
                ? t.unselectItem[language]
                : t.approveItem[language]}
            </button>

            {requestData.status === "PENDING" && (
              <div className="d-flex gap-3 justify-content-center mt-4 w-100">
                <button
                  className="btn btn-success px-4 w-50"
                  onClick={() => approveRequest("APPROVED")}
                  disabled={!item.shouldApprove}
                >
                  ✅ {t.approveRequest[language]}
                </button>
                <button
                  className="btn btn-danger px-4 w-50"
                  onClick={() => approveRequest("REJECTED")}
                >
                  ❌ {t.rejectRequest[language]}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfileDetails;
