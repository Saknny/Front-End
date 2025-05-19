import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import api from "../../../utils/axiosInstance";
import "./ReservationRequestsDetails.scss";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const avatarFallback = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

function ReservationRequestsDetails() {
  const { id } = useParams();
  const [requestData, setRequestData] = useState(null);
  const [bedImages, setBedImages] = useState([]);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [apartmentImages, setApartmentImages] = useState([]);

  const navigate = useNavigate();

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

        setApartmentImages(apartmentImages);
        setBedImages(bed?.bedImages || []);
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    fetchRequestData();
  }, [id]);

  const handleStatus = async (status) => {
    await api.post("/admin/request-approval", {
      id: requestData.id,
      status,
    });
    alert(`Request ${status}`);
  };

  const ApartmentPopup = () => (
    <Modal
      show={showRoomModal}
      onHide={() => setShowRoomModal(false)}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>🏢 Apartment Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Carousel for Apartment Images */}
        <div
          id="apartmentImagesCarousel"
          className="carousel slide mb-4"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner rounded">
            {apartmentImages.length > 0 ? (
              apartmentImages.map((img, index) => (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={img.id}
                >
                  <img
                    src={img.imageUrl || avatarFallback}
                    className="d-block w-100 rounded shadow-sm border"
                    alt="Apartment"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              ))
            ) : (
              <div className="carousel-item active">
                <img
                  src={avatarFallback}
                  alt="Default Apartment"
                  className="d-block w-100 rounded border"
                  style={{ maxHeight: "400px" }}
                />
              </div>
            )}
          </div>
          {apartmentImages.length > 1 && (
            <>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#apartmentImagesCarousel"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#apartmentImagesCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
              </button>
            </>
          )}
        </div>

        {/* Apartment Info Section */}
        <div className="apartment-info bg-light rounded p-3 shadow-sm">
          <h5 className="text-primary fw-bold mb-2">
            {requestData.bed.room.apartment.title}
          </h5>
          <p className="text-muted">
            {requestData.bed.room.apartment.descriptionEn}
          </p>

          <div className="row g-3 mt-3">
            {[
              { label: "Status", value: requestData.bed.room.apartment.status },
              {
                label: "Booking Status",
                value: requestData.bed.room.apartment.bookingStatus,
              },
              { label: "Gender", value: requestData.bed.room.apartment.gender },
              {
                label: "Room Count",
                value: requestData.bed.room.apartment.roomCount,
              },
              {
                label: "Bathrooms",
                value: requestData.bed.room.apartment.bathrooms,
              },
              {
                label: "Size (m²)",
                value: requestData.bed.room.apartment.size,
              },
              { label: "Floor", value: requestData.bed.room.apartment.floor },
              {
                label: "Location",
                value: requestData.bed.room.apartment.locationEnum,
              },
            ].map((item, index) => (
              <div className="col-md-3" key={index}>
                <div className="info-card p-2 border rounded bg-white h-100">
                  <span className="text-muted small d-block">{item.label}</span>
                  <span className="fw-semibold">{item.value}</span>
                </div>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <h6 className="fw-bold">Facilities:</h6>
          <ul className="row list-unstyled ps-3">
            {[
              { key: "tv", label: "TV" },
              { key: "refrigerator", label: "Refrigerator" },
              { key: "stove", label: "Stove" },
              { key: "microwave", label: "Microwave" },
              { key: "kettle", label: "Kettle" },
              { key: "washingMachine", label: "Washing Machine" },
              { key: "waterHeater", label: "Water Heater" },
              { key: "standFan", label: "Stand Fan" },
              { key: "iron", label: "Iron" },
              { key: "wifi", label: "WiFi" },
            ]
              .filter(
                (facility) => requestData.bed.room.apartment[facility.key]
              )
              .map((facility, i) => (
                <li className="col-4 mb-1" key={i}>
                  ✅ {facility.label}
                </li>
              ))}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowRoomModal(false)}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  if (!requestData) return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container py-4">
      <button
        className="btn btn-outline-secondary mb-4 w-25"
        onClick={() => navigate(-1)}
      >
        <ArrowBackIcon className="me-2" /> Back
      </button>

      <h3 className="mb-4 text-primary">🏢 Reservation Request Details</h3>

      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          {bedImages.length > 0 ? (
            <div
              id="bedImagesCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner rounded">
                {bedImages.map((img, index) => (
                  <div
                    className={`carousel-item ${index === 0 ? "active" : ""}`}
                    key={img.id}
                  >
                    <img
                      src={img.imageUrl || avatarFallback}
                      className="d-block w-100 rounded"
                      alt="Bed"
                      style={{ maxHeight: "400px" }}
                    />
                  </div>
                ))}
              </div>
              {bedImages.length > 1 && (
                <>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#bedImagesCarousel"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#bedImagesCarousel"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
          ) : (
            <img
              src={avatarFallback}
              alt="Default Bed"
              className="d-block w-100 rounded border"
              style={{ maxHeight: "400px" }}
            />
          )}
        </div>

        <div className="col-md-7">
          <div className="row g-3">
            <div className="col-md-6">
              <div className="p-2 border rounded h-100">
                <span className="small d-block">Status</span>
                <span className="fw-semibold">{requestData.bed.status}</span>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-2 border rounded h-100">
                <span className="small d-block">Price</span>
                <span className="fw-semibold">{requestData.bed.price} EGP</span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="p-2 border rounded h-100">
                <span className="small d-block">Description (EN)</span>
                <span className="fw-semibold">
                  {requestData.bed.descriptionEn}
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="p-2 border rounded h-100">
                <span className="small d-block">Created At</span>
                <span className="fw-semibold">
                  {new Date(requestData.bed.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div className="p-2 border rounded h-100">
                <span className="small d-block">Updated At</span>
                <span className="fw-semibold">
                  {new Date(requestData.bed.updatedAt).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="col-md-12">
              <div
                className="p-2 border rounded h-100 bg-light hover-shadow cursor-pointer"
                onClick={() => setShowRoomModal(true)}
                style={{ transition: "0.3s", cursor: "pointer" }}
              >
                <span className="small d-block text-muted">Room Info</span>
                <span className="fw-semibold text-primary">
                  Click to view details
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {ApartmentPopup()}

      {/* Student Info with Grid */}
      <div className="section mt-5">
        <h4 className="mb-4">👤 Student Information</h4>
        <div className="row g-4 align-items-start">
          {/* // Student Images */}
          <div className="col-md-5">
            {requestData.student.image || requestData.student.idCard ? (
              <div
                id="studentImagesCarousel"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner rounded">
                  {requestData.student.image && (
                    <div className="carousel-item active">
                      <img
                        src={requestData.student.image || avatarFallback}
                        alt="Student"
                        className="d-block w-100 rounded border"
                        style={{ maxHeight: "400px" }}
                      />
                    </div>
                  )}
                  {requestData.student.idCard && (
                    <div
                      className={`carousel-item ${
                        !requestData.student.image ? "active" : ""
                      }`}
                    >
                      <img
                        src={requestData.student.idCard || avatarFallback}
                        alt="ID Card (Encrypted)"
                        className="d-block w-100 rounded border"
                        style={{
                          maxHeight: "400px",

                          filter: "blur(3px)",
                        }}
                      />
                    </div>
                  )}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#studentImagesCarousel"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#studentImagesCarousel"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            ) : (
              <img
                src={avatarFallback}
                alt="Default Student"
                className="d-block w-100 rounded border"
                style={{ maxHeight: "400px" }}
              />
            )}
          </div>
          <div className="col-md-7">
            <div className="row g-3">
              <div className="col-md-6">
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">Name</span>
                  <span className="fw-semibold">
                    {requestData.student.firstName}{" "}
                    {requestData.student.lastName}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">Status</span>
                  <span className="fw-semibold">
                    {requestData.student.status}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">Gender</span>
                  <span className="fw-semibold">
                    {requestData.student.gender}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">Phone</span>
                  <span className="fw-semibold">
                    {requestData.student.phone}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">University</span>
                  <span className="fw-semibold">
                    {requestData.student.university}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">Created At</span>
                  <span className="fw-semibold">
                    {new Date(requestData.student.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">Updated At</span>
                  <span className="fw-semibold">
                    {new Date(requestData.student.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">Hobbies</span>
                  <span className="fw-semibold">
                    {requestData.student.hobbies.join(", ")}
                  </span>
                </div>
              </div>
              <div className="col-md-12">
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">Social Links</span>
                  <span className="fw-semibold">
                    <a
                      href={requestData.student.facebook}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Facebook
                    </a>{" "}
                    |{" "}
                    <a
                      href={requestData.student.instagram}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Instagram
                    </a>{" "}
                    |{" "}
                    <a
                      href={requestData.student.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      LinkedIn
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accept / Reject */}
      <div className="section text-center pt-4 mt-4 d-flex justify-content-center">
        <button
          className="btn btn-success mx-2"
          onClick={() => handleStatus("APPROVED")}
        >
          ✅ Accept
        </button>
        <button
          className="btn btn-danger mx-2"
          onClick={() => handleStatus("REJECTED")}
        >
          ❌ Reject
        </button>
      </div>
    </div>
  );
}

export default ReservationRequestsDetails;
