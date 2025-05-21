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
import api from "../../../utils/axiosInstance";
import { LoginContext } from "../../../Context/Login/Login";
import "./ReservationRequests.scss";
import { useNavigate } from "react-router-dom";
const DEFAULT_AVATAR = "https://cdn-icons-png.flaticon.com/512/149/149071.png";
import Loading2 from "../../../Components/Loading2/Loading2";
import { t } from "../../../translate/requestDetails";

const getApartmentImage = async (apartmentId) => {
  if (!apartmentId) return DEFAULT_AVATAR;

  try {
    const res = await api.get(`/image/apartments/${apartmentId}/images`);
    const rooms = res?.data?.data?.rooms || [];

    if (
      rooms.length > 0 &&
      rooms[0].beds?.length > 0 &&
      rooms[0].beds[0].bedImages?.length > 0
    ) {
      return rooms[0].beds[0].bedImages[0].imageUrl;
    }
  } catch (err) {
    console.error("Error fetching apartment image:", err);
  }

  return DEFAULT_AVATAR;
};

export default function ReservationRequests() {
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
        const res = await api.get("/rental-requests/provider");

        if (!res.data.success) return;

        const requestsData = res.data.data;
        const formatted = await Promise.all(
          requestsData.map(async (item) => {
            const apartmentId = item.bed?.room?.apartment?.id || "";
            const apartmentImage = await getApartmentImage(apartmentId);

            return {
              id: item.id,
              apartmentId,
              apartmentTitle: item.bed?.room?.apartment?.title || "N/A",
              apartmentImage,
              price: Number(item.bed?.price) || 0,
              status: item.status || "UNKNOWN",
              createdAt: item.createdAt,
              student: {
                name: `${item.student?.firstName || ""} ${
                  item.student?.lastName || ""
                }`.trim(),
                image: item.student?.image || DEFAULT_AVATAR,
              },
            };
          })
        );

        setRequests(formatted);
      } catch (error) {
        console.error("Error fetching rental requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(
    (item) =>
      item.apartmentTitle.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
        <Typography variant="h5" fontWeight="bold">
          {t.reservationRequests?.[language] || "Reservation Requests"}
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
            <MenuItem value="APPROVED">
              {t.APPROVED?.[language] || "Approved"}
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
            <Typography color="textSecondary" fontSize={18}>
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
                      item.createdAt
                    ).toLocaleString();

                    return (
                      <TableRow key={id}>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={2}>
                            <Avatar
                              src={item.apartmentImage}
                              variant="rounded"
                            />
                            <Box display="flex" flexDirection="column">
                              <Typography
                                className="Bed"
                                fontWeight="bold"
                                color="textPrimary"
                                fontSize={14}
                              >
                                {t.bed?.[language] || "Bed"}
                              </Typography>
                              <Typography
                                color="textSecondary"
                                fontSize={13}
                                className="apartmentTitle"
                              >
                                {item.apartmentTitle}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar
                              src={item.student.image}
                              sx={{ width: 30, height: 30 }}
                            />
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography>
                            ${parseFloat(item.price || 0).toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={t[item.status]?.[language] || item.status}
                            color={
                              item.status === "PENDING"
                                ? "warning"
                                : item.status === "APPROVED"
                                ? "success"
                                : "default"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{createdTime}</TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={() => navigate(`/requests/${item.id}`)}
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
