import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Pagination,
  Chip,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { useNavigate } from "react-router-dom";
import "./Requests.scss";
import { LoginContext } from "../../../Context/Login/Login";
import { t } from "./translations";
import api from "../../../utils/axiosInstance";
import Loading2 from "../../../Components/Loading2/Loading2";
const ITEMS_PER_PAGE = 6;

function Requests() {
  const [page, setPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { language, darkMode } = useContext(LoginContext);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const res = await api.get("/admin/pending-requests");
        const fetchedRequests = res.data.data.filter(
          (item) =>
            item.type === "CREATE_APARTMENT" || item.type === "UPDATE_APARTMENT"
        );
        setRequests(fetchedRequests);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    }
    fetchRequests();
  }, []);

  const handleStatusChange = async (requestId, newStatus) => {
    try {
      await api.patch(`/admin/request-approval`, {
        requestId,
        status: newStatus,
      });
      setRequests((prev) =>
        prev.map((req) =>
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setLoading(false);
    }
  };

  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const displayedRequests = requests.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  if (loading) {
    return <Loading2 />;
  }

  return (
    <Box className={`requests-container px-4 pt-4 ${darkMode} `}>
      <Typography variant="h4" gutterBottom className="page-title">
        {t.apartmentRequests[language]}
      </Typography>

      {loading ? (
        <Loading2 />
      ) : requests.length === 0 ? (
        <Box textAlign="center" py={5}>
          <Typography color="textSecondary" fontSize={18}>
            {t.noRequests?.[language] || "No requests found."}
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {displayedRequests.map((request) => {
            const apartmentItem = request.items.find(
              (item) =>
                item.entityType === "APARTMENT" ||
                item.entityType === "ROOM" ||
                item.entityType === "BED"
            );

            return (
              <Grid item xs={12} sm={6} md={4} key={request.id}>
                <Card className="apartment-card shadow-sm">
                  <Carousel navButtonsAlwaysInvisible>
                    {(
                      apartmentItem?.images?.map((img) => img.url) || [
                        "/placeholder.jpg",
                      ]
                    ).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Apartment ${index + 1}`}
                        className="carousel-image"
                        style={{
                          height: 200,
                          width: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ))}
                  </Carousel>

                  <CardContent>
                    <Typography
                      variant="h6"
                      className="apartment-title mb-1 "
                      onClick={() => navigate(`/requests/${request.id}`)}
                      sx={{ cursor: "pointer" }}
                    >
                      {apartmentItem?.data?.title || "Apartment"}
                    </Typography>

                    {language === "EN" ? (
                      <Typography
                        variant="body2"
                        color=""
                        className="apartment-description"
                      >
                        {apartmentItem?.data?.descriptionEn ||
                          t.noDescription[language]}
                      </Typography>
                    ) : (
                      <Typography
                        variant="body2"
                        color=""
                        className="apartment-description"
                      >
                        {apartmentItem?.data?.descriptionAr ||
                          t.noDescription[language]}
                      </Typography>
                    )}

                    <Chip
                      label={
                        request.status === "PENDING"
                          ? t.pending[language]
                          : request.status === "ACCEPTED"
                          ? t.accepted[language]
                          : t.rejected[language]
                      }
                      color={
                        request.status === "PENDING"
                          ? "warning"
                          : request.status === "ACCEPTED"
                          ? "success"
                          : "error"
                      }
                      size="small"
                      className="mb-2 mt-2"
                    />

                    {request.status === "PENDING" && (
                      <Box className="d-flex gap-2 mt-2 ">
                        <Button
                          variant="contained"
                          color="success"
                          fullWidth
                          onClick={() =>
                            handleStatusChange(request.id, "ACCEPTED")
                          }
                        >
                          {t.accept[language]}
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          fullWidth
                          onClick={() =>
                            handleStatusChange(request.id, "REJECTED")
                          }
                        >
                          {t.reject[language]}
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}

      <Box className="pagination-container mt-4 d-flex justify-content-center">
        <Pagination
          count={Math.ceil(requests.length / ITEMS_PER_PAGE)}
          page={page}
          onChange={(event, value) => setPage(value)}
          color="primary"
        />
      </Box>
    </Box>
  );
}

export default Requests;
