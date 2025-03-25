import { useState } from "react";
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Pagination,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import "./Requests.scss";
import apartmentsData from "../../Data/apartmentsData";
import { useNavigate } from "react-router-dom";
const ITEMS_PER_PAGE = 6;

function Requests() {
  const [page, setPage] = useState(1);
  const [apartments, setApartments] = useState(apartmentsData);
  const navigate = useNavigate();
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayedApartments = apartments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handleStatusChange = (id, newStatus) => {
    setApartments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  return (
    <Box className="requests-container">
      <Typography variant="h4" className="page-title">
        Apartment Requests
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {displayedApartments.map((apartment) => (
          <Grid item xs={12} sm={6} md={4} key={apartment.id}>
            <Card className="apartment-card">
              <Carousel className="carousel">
                {apartment.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Apartment ${index + 1}`}
                    className="carousel-image"
                  />
                ))}
              </Carousel>
              <CardContent>
                <Typography
                  variant="h6"
                  className="apartment-title  "
                  onClick={() => navigate(`/requests/${apartment.id}`)}
                >
                  {apartment.title}
                </Typography>
                <Typography variant="body2" className="apartment-description">
                  {apartment.description}
                </Typography>
                <Typography variant="h6" className="apartment-price">
                  {apartment.price}
                </Typography>

                {/* Status Display */}
                <Typography
                  variant="body2"
                  className={`status-text ${apartment.status}`}
                >
                  {apartment.status === "pending"
                    ? "Pending Approval"
                    : apartment.status === "accepted"
                    ? "Accepted "
                    : "Rejected "}
                </Typography>

                {/* Buttons for Approval / Rejection */}
                {apartment.status === "pending" && (
                  <Box className="button-group">
                    <Button
                      variant="contained"
                      className="accept-button"
                      onClick={() =>
                        handleStatusChange(apartment.id, "accepted")
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      className="reject-button"
                      onClick={() =>
                        handleStatusChange(apartment.id, "rejected")
                      }
                    >
                      Reject
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Controls */}
      <Box className="pagination-container">
        <Pagination
          count={Math.ceil(apartments.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default Requests;
