import React, { useState, useEffect, useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Typography,
  Box,
  TextField,
  Button,
  MenuItem,
  Paper,
  TablePagination,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { LoginContext } from "../../../Context/Login/Login";
import { useNavigate } from "react-router-dom";
import Loading2 from "../../../Components/Loading2/Loading2";
import { t } from "../../../translate/requestDetails";
import {
  fetchRoomRequestsForProvider,
  getApartmentImage,
} from "../../../Api/api";
import "./ReservationRequests.scss";

export default function RoomReservationRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkMode, language } = useContext(LoginContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await fetchRoomRequestsForProvider(getApartmentImage); // adjust this
        setRequests(data);
      } catch (error) {
        console.error("Error fetching room requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(
    (item) =>
      item.apartment?.title?.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || item.status === statusFilter)
  );

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box
      className={`reservation-requests ${darkMode}`}
      sx={{ backgroundColor: alpha("#f8f9fa", 1) }}
      p={4}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" className="title" fontWeight="bold">
          {t.roomReservationRequests?.[language] || "Room Booking Requests"}
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            size="small"
            placeholder={t.searchPlaceholder?.[language] || "Search..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TextField
            select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            SelectProps={{ displayEmpty: true }}
          >
            <MenuItem value="">{t.all?.[language] || "All"}</MenuItem>
            <MenuItem value="ACCEPTED">
              {t.ACCEPTED?.[language] || "Accepted"}
            </MenuItem>
            <MenuItem value="PENDING">
              {t.PENDING?.[language] || "Pending"}
            </MenuItem>
            <MenuItem value="REJECTED">
              {t.REJECTED?.[language] || "Rejected"}
            </MenuItem>
          </TextField>
        </Box>
      </Box>

      <Paper
        elevation={0}
        className={`${darkMode}`}
        sx={{
          backgroundColor: alpha("#f8f9fa", 1),
          padding: 2,
          overflowX: "auto",
          boxShadow: "none",
        }}
      >
        {loading ? (
          <Loading2 />
        ) : filteredRequests.length === 0 ? (
          <Box textAlign="center" py={5}>
            <Typography fontSize={18}>
              {t.noRequests?.[language] || "No requests found."}
            </Typography>
          </Box>
        ) : (
          <>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="fw-bold">
                    {t.property?.[language] || "Property"}
                  </TableCell>
                  <TableCell className="fw-bold">
                    {t.student?.[language] || "Student"}
                  </TableCell>
                  <TableCell className="fw-bold">
                    {t.price?.[language] || "Price"}
                  </TableCell>
                  <TableCell className="fw-bold">
                    {t.status?.[language] || "Status"}
                  </TableCell>
                  <TableCell className="fw-bold">
                    {t.createdAt?.[language] || "Created At"}
                  </TableCell>
                  <TableCell className="fw-bold">
                    {t.action?.[language] || "Action"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRequests
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, id) => {
                    const createdTime = new Date(
                      item.createdAt || item.apartment?.createdAt
                    ).toLocaleString();
                    const room = item.apartment?.room || {};
                    const price = room.beds?.[0]?.price || "0";

                    return (
                      <TableRow key={id}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar
                              src={item.apartmentImage}
                              variant="rounded"
                            />
                            <Box display="flex" flexDirection="column">
                              <Typography fontWeight="bold" fontSize={14}>
                                {t.room?.[language] || "Room"}
                              </Typography>
                              <Typography fontSize={13}>
                                {item.apartment?.title || "N/A"}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                              src={`http://45.88.223.182:4000${
                                item.student?.image || ""
                              }`}
                              sx={{ width: 30, height: 30 }}
                            />
                            <Typography
                              fontSize={13}
                            >{`${item.student?.firstName} ${item.student?.lastName}`}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            ${parseFloat(price).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={t[item.status]?.[language] || item.status}
                            color={
                              item.status === "PENDING"
                                ? "warning"
                                : item.status === "ACCEPTED"
                                ? "success"
                                : "error"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{createdTime}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            color=""
                            className="primary-btn"
                            onClick={() =>
                              navigate(`/room_requests/${item.id}`)
                            }
                          >
                            {t.view?.[language] || "View"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>

            <TablePagination
              component="div"
              className="table-pagination"
              count={filteredRequests.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[2, 4, 6, 10]}
            />
          </>
        )}
      </Paper>
    </Box>
  );
}
