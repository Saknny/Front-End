// 📁 components/StudentInfoSection.js
import React from "react";
import PropTypes from "prop-types";

const avatarFallback = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const StudentInfoSection = ({ student }) => {
  return (
    <div className="section mt-5">
      <h4 className="mb-4">👤 Student Information</h4>
      <div className="row g-4 align-items-start">
        <div className="col-md-5">
          {student.image || student.idCard ? (
            <div
              id="studentImagesCarousel"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner rounded">
                {student.image && (
                  <div className="carousel-item active">
                    <img
                      src={student.image || avatarFallback}
                      alt="Student"
                      className="d-block w-100 rounded border"
                      style={{ maxHeight: "400px" }}
                    />
                  </div>
                )}
                {student.idCard && (
                  <div
                    className={`carousel-item ${
                      !student.image ? "active" : ""
                    }`}
                  >
                    <img
                      src={student.idCard || avatarFallback}
                      alt="ID Card"
                      className="d-block w-100 rounded border"
                      style={{ maxHeight: "400px", filter: "blur(3px)" }}
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
                <span className="carousel-control-prev-icon"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#studentImagesCarousel"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon"></span>
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
            {[
              {
                label: "Name",
                value: `${student.firstName} ${student.lastName}`,
              },
              { label: "Status", value: student.status },
              { label: "Gender", value: student.gender },
              { label: "Phone", value: student.phone },
              { label: "University", value: student.university },
              {
                label: "Created At",
                value: new Date(student.createdAt).toLocaleString(),
              },
              {
                label: "Updated At",
                value: new Date(student.updatedAt).toLocaleString(),
              },
              { label: "Hobbies", value: student.hobbies.join(", ") },
            ].map((item, index) => (
              <div className="col-md-6" key={index}>
                <div className="p-2 border rounded h-100">
                  <span className="small d-block">{item.label}</span>
                  <span className="fw-semibold">{item.value}</span>
                </div>
              </div>
            ))}
            <div className="col-md-12">
              <div className="p-2 border rounded h-100">
                <span className="small d-block">Social Links</span>
                <span className="fw-semibold">
                  <a href={student.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>{" "}
                  |{" "}
                  <a href={student.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>{" "}
                  |{" "}
                  <a href={student.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
StudentInfoSection.propTypes = {
  student: PropTypes.shape({
    image: PropTypes.string,
    idCard: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    status: PropTypes.string,
    gender: PropTypes.string,
    phone: PropTypes.string,
    university: PropTypes.string,
    createdAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    updatedAt: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    hobbies: PropTypes.arrayOf(PropTypes.string),
    facebook: PropTypes.string,
    instagram: PropTypes.string,
    linkedin: PropTypes.string,
  }).isRequired,
};

export default StudentInfoSection;
