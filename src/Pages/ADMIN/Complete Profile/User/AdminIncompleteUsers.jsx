import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./AdminIncompleteUsers.scss";
import api from "../../../../utils/axiosInstance";
import Loading2 from "../../../../Components/Loading2/Loading2";
import { LoginContext } from "../../../../Context/Login/Login";
const AdminIncompleteUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setloading] = useState(true);
  const { darkMode } = useContext(LoginContext);
  const usersPerPage = 9;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/pending-requests");
        const fetchedRequests = res.data.data.filter(
          (item) =>
            item.type === "PROFILE_UPDATE" || item.type === "PROFILE_COMPLETE"
        );

        const extractedUsers = fetchedRequests.flatMap((request) =>
          (request.items || []).map((item) => {
            const data = item.data || {};
            return {
              id: request.id,
              firstName: data.firstName || "no name ",
              lastName: data.lastName || "no name",
              request_type: request.type,
            };
          })
        );

        setUsers(extractedUsers);
        setloading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setloading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Loading2 />;
  }
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className={`admin-users container py-4  ${darkMode}`}>
      <h2 className="mb-4">Users with Incomplete Profiles</h2>

      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="list-group">
        {currentUsers.map((user) => (
          <Link
            to={`/complete-profile/user/${user.id}`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            key={`${user.id}`}
          >
            <div>
              <span className="user-name">
                {user.firstName} {user.lastName}
              </span>
              <div className="request-type">{user.request_type}</div>
            </div>
            <i className="bx bx-chevron-right"></i>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>
          Showing {indexOfFirstUser + 1}–
          {Math.min(indexOfLastUser, filteredUsers.length)} of{" "}
          {filteredUsers.length}
        </span>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminIncompleteUsers;
