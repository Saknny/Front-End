import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import "./CompleteProfileDetails.scss";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { LoginContext } from "../../Context/Login/Login";
import { useContext } from "react";
const CompleteProfileDetails = () => {
  const [requestData, setRequestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(LoginContext);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const res = await api.get(`/admin/request/${id}`);
        const fetchedRequest = res.data.data;

        fetchedRequest.items.forEach((item) => {
          item.shouldApprove = false;
          item.imagesData = [
            {
              id: "profileImage",
              url: item.data.image
                ? `http://45.88.223.182:4000${item.data.image}`
                : null,
              shouldApprove: false,
              type: "Profile Image",
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
              type: "ID Card",
            },
          ];
        });

        setRequestData(fetchedRequest);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching request:", error);
      }
    };

    fetchRequest();
  }, [id]);

  if (loading) return <Loading />;
  if (!requestData)
    return <div className="text-center my-5">No Data Found</div>;

  const item = requestData.items[0];
  const toggleItemApproval = () => {
    item.shouldApprove = !item.shouldApprove;
    setRequestData({ ...requestData });
  };

  const approveRequest = async (status) => {
    try {
      if (item.shouldApprove) {
        await api.patch(`/admin/item-approval`, {
          id: item.id,
          status: "APPROVED",
        });
      }

      await api.patch(`/admin/request-approval`, {
        id: requestData.id,
        status,
      });
      if (status === "APPROVED") {
        toast.success(" Request approved successfully");
      } else if (status === "REJECTED") {
        toast.error(" Request rejected successfully");
      }

      navigate("/complete-profile/user");
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error(" Error approving request");
    }
  };

  return (
    <div className={`complete-profile-details container py-4 ${darkMode}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Request Details</h2>
        <button
          className="btn btn-outline-primary"
          onClick={() => navigate("/complete-profile/user")}
        >
          🔙 Back to Users
        </button>
      </div>

      <div className="row">
        {item.imagesData.map(
          (img) =>
            img.url && (
              <div
                key={img.id}
                className="col-sm-6 col-12 col-md-6 col-lg-4  mb-4"
              >
                <div
                  key={img.id}
                  className="col-md-6  w-100 mb-4 d-flex flex-column align-items-center"
                >
                  <div className="card shadow-sm image-card w-100">
                    <img
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
            <h5 className="text-primary mb-3">User Information</h5>
            <div className="row g-3">
              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>First Name:</strong>{" "}
                    {item.data.firstName || "no name"}
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4  ">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>Last Name:</strong>{" "}
                    {item.data.lastName || "no name"}
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>Facebook:</strong>{" "}
                    <a
                      href={item.data.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.data.facebook || "No Facebook"}
                    </a>
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>Phone:</strong> {item.data.phone || "No Phone"}
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>Major:</strong> {item.data.major || "No Major"}
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>Smoking:</strong> {item.data.smoking ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>Social Person:</strong>{" "}
                    {item.data.socialPerson ? "Yes" : "No"}
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>LinkedIn:</strong>{" "}
                    <a
                      href={item.data.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.data.linkedin || "No LinkedIn"}
                    </a>
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>Instagram:</strong>{" "}
                    <a
                      href={item.data.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.data.instagram || "No Instagram"}
                    </a>
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>University:</strong>{" "}
                    {item.data.university || "No University"}
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>Level:</strong> {item.data.level || "No Level"}
                  </span>
                </div>
              </div>

              <div className="col-12 col-md-6 col-lg-4">
                <div className="p-3 border rounded overflow-hidden h-100 d-flex flex-column align-items-start">
                  <span className="fw-semibold">
                    <strong>Hobbies:</strong>{" "}
                    {item.data.hobbies && item.data.hobbies.length > 0 ? (
                      item.data.hobbies.map((hobby, index) => (
                        <span key={index} className="badge bg-secondary me-2">
                          {hobby}
                        </span>
                      ))
                    ) : (
                      <span>No Hobbies</span>
                    )}
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
              {item.shouldApprove ? "Unselect Item" : "Approve Item"}
            </button>

            {requestData.status === "PENDING" && (
              <div className="d-flex gap-3 justify-content-center mt-4">
                <button
                  className="btn btn-success px-4"
                  onClick={() => approveRequest("APPROVED")}
                  disabled={!item.shouldApprove}
                >
                  ✅ Approve Request
                </button>
                <button
                  className="btn btn-danger px-4"
                  onClick={() => approveRequest("REJECTED")}
                >
                  ❌ Reject Request
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
