import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import IosShareIcon from "@mui/icons-material/IosShare";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import axios from "axios";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

import "./PropertyDetail.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Skeleton,
  ClickAwayListener,
  Button,
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { formatCurrency } from "../../utils/helpers";
import { useParams } from "react-router-dom";
import { getPropertyDetail } from "../../api/search";
import NearbyPlaces from "./NearbyPlaces";
import { ShareSocial } from "react-share-social";

export default function PropertyDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const params = useParams();
  const propertyId = params.id;
  const [topImages, setTopImages] = useState([]);
  const mainSwiperRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [property, setProperty] = useState({});
  const [selectedCategories, setSelectedCategories] = useState(["education"]);
  const [showShareModal, setShowShareModal] = useState(false);

  const possibleCategories = [
    "commercial",
    "education",
    "catering",
    "service",
    "healthcare",
  ];

  const [isLoading, setIsLoading] = useState(false);

  // fetch property details
  useEffect(() => {
    setIsLoading(true);
    const fetchPropertyDetails = async () => {
      const response = await getPropertyDetail(propertyId);
      setProperty(response?.propertyDetails);
      setIsLoading(false);
      setTopImages(getTopImageURL(response?.propertyDetails?.originalPhotos));
    };

    fetchPropertyDetails();
  }, [propertyId]);

  // get top 10 images
  const getTopImageURL = (photosArray) => {
    const images = photosArray?.splice(0, 10)?.map((photo) => {
      return photo?.mixedSources?.jpeg[0]?.url;
    });

    return images;
  };

  // handle category change
  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  // handle scroll to top
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <>
        <NavBar dark />
        <Stack
          direction="row"
          sx={{
            width: "100%",
            justifyContent: "space-between",
            p: 4,
            flexWrap: { xs: "wrap", sm: "nowrap" },
            gap: "20px",
            height: "100vh - 64px",
          }}
        >
          <Box
            sx={{
              width: { xs: "100%", sm: "50%", md: "50%", lg: "50%", xl: "50%" },
              display: "flex",
              flexDirection: "column",
              rowGap: 1,
            }}
          >
            <Skeleton
              variant="rect"
              width="100%"
              height={100}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              variant="rect"
              width="100%"
              height={150}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              variant="rect"
              width="100%"
              height={200}
              sx={{ borderRadius: 2 }}
            />
            <Skeleton
              variant="rect"
              width="100%"
              height={200}
              sx={{ borderRadius: 2 }}
            />
          </Box>
          <Box
            sx={{
              width: { xs: "100%", sm: "50%", md: "50%", lg: "50%", xl: "50%" },
              display: "flex",
              flexDirection: "column",
              rowGap: 1,
            }}
          >
            <Skeleton
              variant="rect"
              width="100%"
              height={350}
              sx={{ borderRadius: 2, flexGrow: 1 }}
            />
            <Skeleton
              variant="rect"
              width="100%"
              height={150}
              sx={{ borderRadius: 2 }}
            />
          </Box>
        </Stack>
        <Skeleton
          variant="rect"
          width="100%"
          height={1200}
          sx={{ borderRadius: 2 }}
        />

      </>
    );
  }

  return (
    <>
      <NavBar dark />
      {/* scroll to top button */}
      <IconButton
        onClick={handleScrollToTop}
        size="large"
        aria-label="scroll to top"
        sx={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 5,
          color: "white",
          background: "#293A48",
        }}
      >
        <ArrowUpwardOutlinedIcon />
      </IconButton>
      {/* property details */}
      <Stack
        direction="row"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          p: 4,
          flexWrap: { xs: "wrap", sm: "nowrap" },
          gap: "20px",
          height: "100vh - 64px",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "50%", md: "50%", lg: "50%", xl: "50%" },
            display: "flex",
            flexDirection: "column",
            rowGap: 1,
          }}
        >
          {/* Address */}
          <Typography
            sx={{
              color: "#293A48",
              fontFamily: "POI Carbonic Trial",
              fontSize: { xs: 24.07, sm: 39.4 },
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            {property?.address?.streetAddress}
            {", "}
            {property?.address?.city}
            {", "}
            {property?.address?.state}
            {", "}
            {property?.address?.zipcode}
          </Typography>
          {/* Price | Area | Year */}
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              columnGap: 2,
            }}
          >
            <Typography
              sx={{
                color: "#293A48",
                fontFamily: "POI Carbonic Trial",
                fontSize: { xs: 15.482, sm: 28.456 },
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AttachMoneyIcon sx={{ fontSize: { xs: 15.482, sm: 28.456 } }} />
              {formatCurrency(property?.price)}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              sx={{
                color: "#293A48",
                fontFamily: "POI Carbonic Trial",
                fontSize: { xs: 15.482, sm: 28.456 },
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              {property?.livingArea} sqft
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              sx={{
                color: "#293A48",
                fontFamily: "POI Carbonic Trial",
                fontSize: { xs: 15.482, sm: 28.456 },
                fontStyle: "normal",
                fontWeight: 300,
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              Built {property?.yearBuilt}
            </Typography>
          </Stack>
          {/* Bedrooms | Bathrooms */}
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              columnGap: 3,
            }}
          >
            <Typography
              sx={{
                color: "#293A48",
                fontFamily: "POI Carbonic Trial",
                fontSize: { xs: 13.924, sm: 25.592 },
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              <HotelOutlinedIcon
                sx={{ fontSize: { xs: 15.482, sm: 28.456 }, mr: 2 }}
              />
              {property?.bedrooms} Bedrooms
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography
              sx={{
                color: "#293A48",
                fontFamily: "POI Carbonic Trial",
                fontSize: { xs: 13.924, sm: 25.592 },
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                display: "flex",
                alignItems: "center",
              }}
            >
              <BathtubOutlinedIcon
                sx={{ fontSize: { xs: 15.482, sm: 28.456 }, mr: 2 }}
              />
              {property?.bathrooms} Bathrooms
            </Typography>
          </Stack>
          {/* Description */}
          <Typography
            sx={{
              color: "#293A48",
              fontFamily: "POI Carbonic Trial",
              fontSize: { xs: 14.259, sm: 26.209 },
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              display: "flex",
              alignItems: "center",
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{
              color: "#293A48",
              fontFamily: "POI Carbonic Trial",
              fontSize: { xs: 14.259, sm: 26.209 },
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "normal",
            }}
          >
            {property?.description}
          </Typography>
          {/* Home Insights */}
          <Typography
            sx={{
              color: "#293A48",
              fontFamily: "POI Carbonic Trial",
              fontSize: { xs: 14.259, sm: 26.209 },
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              display: "flex",
              alignItems: "center",
            }}
          >
            Home Insights
          </Typography>
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              columnGap: 3,
              flexWrap: "wrap",
            }}
          >
            {property?.homeInsights?.[0]?.insights?.[0]?.phrases.map(
              (value, index) => {
                return (
                  <Typography
                    key={index}
                    sx={{
                      color: "#293A48",
                      fontFamily: "POI Carbonic Trial",
                      fontSize: { xs: 15.482, sm: 28.456 },
                      fontStyle: "normal",
                      fontWeight: 300,
                      lineHeight: "normal",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ArrowForwardOutlinedIcon
                      sx={{ fontSize: { xs: 15.482, sm: 28.456 } }}
                    />
                    {value}
                  </Typography>
                );
              }
            )}
          </Stack>
          {/* Multi-Select Categories */}
          <Typography
            sx={{
              color: "#293A48",
              fontFamily: "POI Carbonic Trial",
              fontSize: { xs: 14.259, sm: 26.209 },
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              display: "flex",
              alignItems: "center",
            }}
          >
            Nearby Places
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            className="nearby-label"
          >
            <Typography
              sx={{
                color: "#293A48",
                fontFamily: "POI Carbonic Trial",
                fontSize: { xs: 14.259, sm: 18.259 },
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
              }}
            >
              Find
            </Typography>
            <FormControl variant="standard" sx={{ minWidth: 200 }}>
              {!selectedCategories.length && (
                <InputLabel id="categories-label" shrink={false}>
                  Nearby Places
                </InputLabel>
              )}
              <Select
                labelId="categories-label"
                id="categories"
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {possibleCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    <Checkbox
                      checked={selectedCategories.indexOf(category) > -1}
                    />
                    <ListItemText primary={category} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            Near this property
          </Stack>
          {selectedCategories.length > 0 && (
            <NearbyPlaces property={property} categories={selectedCategories} />
          )}
          {/* Agent Details */}
          <div className="actionButtons">
            <Card sx={{ width: "100%" }} className="agentCard">
              <CardContent>
                {/* Agent */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <SupportAgentIcon
                    sx={{ height: "100%", width: "auto", maxWidth: "100px" }}
                  />
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="inherit" sx={{}} className="agentName">
                      {property?.attributionInfo?.agentName || "N/A"}
                    </Typography>
                    <Typography
                      variant="inherit"
                      sx={{ fontSize: { xs: 12, sm: 18 } }}
                    >
                      Agent
                    </Typography>
                    <Box
                      sx={{ display: "flex", flexDirection: "column" }}
                      className="agentContact"
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {property?.attributionInfo?.agentPhoneNumber || "N/A"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        {property?.attributionInfo?.agentEmail || "N/A"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
            {showShareModal && (
              <ClickAwayListener onClickAway={() => setShowShareModal(false)}>
                <div
                  style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2000,
                  }}
                >
                  <ShareSocial
                    className="sharePopup"
                    url={`${window.location.origin}/property/${property?.zpid}`}
                    title={property?.address?.streetAddress}
                    socialTypes={[
                      "facebook",
                      "twitter",
                      "whatsapp",
                      "telegram",
                      "email",
                    ]}
                    style={{
                      root: {
                        backgroundColor: "#C4D4E3",
                        borderRadius: 3,
                        border: 0,
                        boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                        color: "black",
                      },
                      copyContainer: {
                        border: "1px solid blue",
                        background: "rgb(0,0,0,0.7)",
                      },
                      title: {
                        color: "black",
                        fontStyle: "bold",
                        FontFace: "Selvia Genatu",
                      },
                    }}
                  />
                </div>
              </ClickAwayListener>
            )}
            <Card
              sx={{ width: "100%", maxWidth: 450 }}
              className="saveButton"
              onClick={() => setShowShareModal(true)}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <IosShareIcon className="saveIcon" sx={{ height: "100%" }} />
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Share
                </Typography>
              </Box>
            </Card>
          </div>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "50%", md: "50%", lg: "50%", xl: "50%" },
          }}
        >
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            loop={true}
            spaceBetween={10}
            navigation={true}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {topImages?.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={image} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={10}
            slidesPerView={2}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {topImages?.map((image, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={image} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Box>
      </Stack>
      {/* Virtual Tour */}
      {property?.virtualTourUrl && (
        <iframe
          src={property?.virtualTourUrl}
          width="100%"
          height="1200px"
          allowFullScreen
        ></iframe>
      )}
    </>
  );
}
