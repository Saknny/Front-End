import "./UsersAccounts.scss";
import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { fetchUsersList, deleteUserById } from "../../../Api/api";
import { useContext } from "react";
import { LoginContext } from "../../../Context/Login/Login";
import Loading2 from "../../../Components/Loading2/Loading2";

const headCells = [
  { id: "name", numeric: false, disablePadding: true, label: "Name" },
  { id: "email", numeric: false, disablePadding: false, label: "Email" },
  { id: "age", numeric: true, disablePadding: false, label: "Age" },
  { id: "city", numeric: false, disablePadding: false, label: "City" },
  {
    id: "university",
    numeric: false,
    disablePadding: false,
    label: "University",
  },
  { id: "faculty", numeric: false, disablePadding: false, label: "Faculty" },
  { id: "year", numeric: true, disablePadding: false, label: "Year" },
  { id: "gender", numeric: false, disablePadding: false, label: "Gender" },
];

const rowsPerPageOptions = [5, 10, 25];

function UsersAccounts() {
  const [users, setUsers] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery, setSearchQuery] = React.useState("");
  const { darkMode } = useContext(LoginContext);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await fetchUsersList();
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [users]);

  const deleteUser = async (id) => {
    try {
      await deleteUserById(id);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Failed to delete user", error);
      toast.error("Failed to delete user");
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (order === "asc") {
        return a[orderBy] < b[orderBy] ? -1 : 1;
      }
      return a[orderBy] > b[orderBy] ? -1 : 1;
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  if (loading) {
    return <Loading2 />;
  }
  return (
    <Box
      className={`users-accounts ${darkMode === "dr" ? "dark" : ""}`}
      sx={{ width: "100%" }}
    >
      <Paper sx={{ backgroundColor: alpha("#f5f5f5", 1), padding: 2 }}>
        <Toolbar className="toolbar">
          <Typography variant="h4" sx={{ flex: "1 1 100%" }}>
            User Accounts
          </Typography>
          <TextField
            variant="outlined"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2, width: "100%" }}
          />
          {selected.length > 0 && (
            <Tooltip title="Delete">
              <IconButton
                onClick={() => selected.forEach((id) => deleteUser(id))}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    onChange={(event) => {
                      setSelected(
                        event.target.checked ? users.map((u) => u.id) : []
                      );
                    }}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : "asc"}
                      onClick={(event) => handleRequestSort(event, headCell.id)}
                    >
                      {headCell.label}
                      {orderBy === headCell.id && (
                        <Box component="span" sx={visuallyHidden}>
                          {order === "desc"
                            ? "sorted descending"
                            : "sorted ascending"}
                        </Box>
                      )}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={headCells.length + 1} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={selected.includes(user.id)}
                        onChange={() => {
                          setSelected((prev) =>
                            prev.includes(user.id)
                              ? prev.filter((id) => id !== user.id)
                              : [...prev, user.id]
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>{user.city}</TableCell>
                    <TableCell>{user.university}</TableCell>
                    <TableCell>{user.faculty}</TableCell>
                    <TableCell>{user.year}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {filteredUsers.length > 0 && (
          <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Paper>
    </Box>
  );
}

export default UsersAccounts;
