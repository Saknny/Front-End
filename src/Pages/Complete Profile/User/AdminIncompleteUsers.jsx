import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminIncompleteUsers.scss";
import data from "../../../Data/complete_profile";

const AdminIncompleteUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 9;

  useEffect(() => {
    setUsers(data);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="admin-users container py-4">
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
            to={`/admin/complete-profile/${user.id}`}
            className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            key={user.id}
          >
            <span className="user-name">{user.fullName}</span>
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
