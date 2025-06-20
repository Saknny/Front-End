import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./BlockedApartments.scss";
import { FaEye } from "react-icons/fa";
import React from "react";
import { LoginContext } from "../../../Context/Login/Login";
import { fetchBlockedApartments, getApartmentImage } from "../../../Api/api";
function BlockedApartments() {
  const [apartments, setApartments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { darkMode, language } = useContext(LoginContext);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchBlockedApartments();
        const apartmentsWithImages = await Promise.all(
          data.map(async (apt) => ({
            ...apt,
            image: await getApartmentImage(apt.id),
          }))
        );

        setApartments(apartmentsWithImages);
      } catch (error) {
        console.error("Failed to fetch blocked apartments:", error);
      }
    };

    getData();
  }, []);

  // Filter apartments based on search query
  const filteredApartments = apartments.filter((apt) =>
    apt.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredApartments.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredApartments.length / itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div
      className={`container py-4 blocked-apartments ${
        darkMode === "dr" ? "dark-mode" : ""
      }`}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-teal">Blocked Apartments</h3>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table align-middle table-hover">
          <thead>
            <tr>
              <th>Apartment</th>
              <th>Location</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center">
                  No apartments found.
                </td>
              </tr>
            ) : (
              currentItems.map((apt) => (
                <tr key={apt.id}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img
                        src={apt.image}
                        alt={apt.title}
                        className="rounded border"
                        width="60"
                        height="60"
                      />
                      <div>
                        <strong>{apt.title}</strong>
                      </div>
                    </div>
                  </td>

                  <td>{apt.locationEnum}</td>
                  <td>
                    <span className="badge bg-danger">{apt.status}</span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary d-flex align-items-center gap-1"
                      onClick={() => navigate(`/blocked-apartments/${apt.id}`)}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-3">
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <li
                  key={i}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default BlockedApartments;
