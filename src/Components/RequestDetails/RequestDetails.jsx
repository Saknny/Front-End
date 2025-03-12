import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import BedIcon from "@mui/icons-material/Bed";
import HotelIcon from "@mui/icons-material/Hotel";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import "./RequestDetails.scss";

// Mock data (same as Requests page)
const apartmentsData = [
  {
    id: 1,
    title: "Luxury Apartment in New Damietta",
    location: "New Damietta, Egypt",
    description:
      "Spacious 3-bedroom apartment with a sea view and modern design.",
    price: "$1200/month",
    rooms: 3,
    beds: 4,
    images: ["/apartment2.jpeg", "/apartment.jpeg", "/apartment2.jpeg"],
    status: "pending",
  },
  {
    id: 2,
    title: "Cozy Studio in Ras El Bar",
    location: "Ras El Bar, Egypt",
    description:
      "Modern and stylish studio apartment, close to the beach with amazing views.",
    price: "$850/month",
    rooms: 1,
    beds: 1,
    images: ["/apartment2.jpeg", "/apartment.jpeg", "/apartment2.jpeg"],
    status: "pending",
  },
];

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(
    apartmentsData.find((apt) => apt.id === parseInt(id))
  );

  if (!request) {
    return (
      <Typography variant="h6" align="center">
        Request not found.
      </Typography>
    );
  }

  const handleStatusChange = (newStatus) => {
    setRequest((prev) => ({ ...prev, status: newStatus }));
  };

  return (
    <Box className="request-details-container">
      <Grid container className="details-grid">
        {/* Left: Images */}
        <Grid item xs={12} md={6} className="carousel-section">
          <Carousel className="carousel">
            {request.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Apartment ${index + 1}`}
                className="carousel-image"
              />
            ))}
          </Carousel>
        </Grid>

        {/* Right: Apartment Details */}
        <Grid item xs={12} md={6} className="details-section">
          <Button
            startIcon={<ArrowBackIcon />}
            className="back-button"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>

          <Typography variant="h4" className="apartment-title">
            {request.title}
          </Typography>

          <Typography variant="body1" className="apartment-location">
            <LocationOnIcon className="icon" /> {request.location}
          </Typography>

          <Typography variant="h6" className="apartment-price">
            <MonetizationOnIcon className="icon" /> {request.price}
          </Typography>

          <Box className="features">
            <Typography variant="body1" className="feature-item">
              <HotelIcon className="icon" /> {request.rooms} Rooms
            </Typography>
            <Typography variant="body1" className="feature-item">
              <BedIcon className="icon" /> {request.beds} Beds
            </Typography>
          </Box>

          <Typography
            variant="body1"
            className={`status-text ${request.status}`}
          >
            {request.status === "pending"
              ? "Pending Approval"
              : request.status === "accepted"
              ? "Accepted ✅"
              : "Rejected ❌"}
          </Typography>

          {/* Accept & Reject Buttons */}
          {request.status === "pending" && (
            <Box className="button-group">
              <Button
                variant="contained"
                className="accept-button"
                startIcon={<CheckCircleIcon />}
                onClick={() => handleStatusChange("accepted")}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                className="reject-button"
                startIcon={<CancelIcon />}
                onClick={() => handleStatusChange("rejected")}
              >
                Reject
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default RequestDetails;
