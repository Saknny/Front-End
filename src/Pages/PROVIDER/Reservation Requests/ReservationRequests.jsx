import React, { useState } from "react";
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
import { useContext } from "react";
import "./ReservationRequests.scss";
const requestData = [
  {
    title: "Wood Wall Shelf",
    category: "Office Issues",
    image: "/images/shelf.jpg",
    users: ["/avatars/user1.jpg"],
    status: "Pending",
    price: "$295",
    date: "Nov 6, 2019",
    time: "10:56",
  },
  {
    title: "Netflix subscription",
    category: "Entertainment",
    image: "/images/netflix.jpg",
    users: ["/avatars/user2.jpg", "/avatars/user3.jpg"],
    status: "Approved",
    price: "$28",
    date: "Nov 5, 2019",
    time: "15:42",
  },
  {
    title: "Team photo shoot",
    category: "Marketing",
    image: "/images/photoshoot.jpg",
    users: ["/avatars/user4.jpg"],
    status: "Approved",
    price: "$508",
    date: "Nov 5, 2019",
    time: "16:24",
  },
  {
    title: "Bangbang subscription",
    category: "Education",
    image: "/images/bangbang.jpg",
    users: ["/avatars/user5.jpg", "/avatars/user6.jpg"],
    status: "Approved",
    price: "$270",
    date: "Nov 4, 2019",
    time: "11:06",
  },
  {
    title: "MacBook Dock",
    category: "Office Issues",
    image: "/images/dock.jpg",
    users: ["/avatars/user1.jpg"],
    status: "Pending",
    price: "$90",
    date: "Nov 3, 2019",
    time: "12:49",
  },
  {
    title: "Charging Pad",
    category: "Office Issues",
    image: "/images/pad.jpg",
    users: ["/avatars/user7.jpg", "/avatars/user8.jpg", "/avatars/user9.jpg"],
    status: "Pending",
    price: "$140",
    date: "Nov 3, 2019",
    time: "14:18",
  },
];

const statusColor = {
  Approved: "success",
  Pending: "warning",
  Postponed: "default",
};

export default function ReservationRequests() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const { darkMode } = useContext(LoginContext);

  const filteredRequests = requestData.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "" || item.status === statusFilter)
    );
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
          Reservation Requests
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            size="small"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <TextField
            size="small"
            select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            displayEmpty
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Approved">Approved</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Postponed">Postponed</MenuItem>
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="fw-bold">Subject and category</TableCell>
              <TableCell className="fw-bold">Users</TableCell>
              <TableCell className="fw-bold">Status</TableCell>
              <TableCell className="fw-bold">Price</TableCell>
              <TableCell className="fw-bold">Date created</TableCell>
              <TableCell className="fw-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRequests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar src={item.image} variant="rounded" />
                      <Box>
                        <Typography fontWeight="medium">
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          className="category"
                        >
                          {item.category}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex">
                      {item.users.map((img, i) => (
                        <Avatar
                          key={i}
                          src={img}
                          sx={{ width: 28, height: 28, ml: i === 0 ? 0 : -1 }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={statusColor[item.status]}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>
                    {item.date} at {item.time}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      onClick={() => alert(`Navigate to: ${item.title}`)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          className="table-pagination"
          component="div"
          count={filteredRequests.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[2, 4, 6, 10]}
        />
      </Paper>
    </Box>
  );
}
