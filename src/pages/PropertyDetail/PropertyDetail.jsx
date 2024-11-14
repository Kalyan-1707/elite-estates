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
import { useNavigate, useParams } from "react-router-dom";
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
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();


  // fetch property details
  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    const fetchPropertyDetails = async () => {
      const response = await getPropertyDetail(propertyId);
      setProperty(response?.propertyDetails);
      if (
        !response?.propertyDetails ||
        response?.propertyDetails.length === 0
      ) {
        setIsError(true);
        setIsLoading(false);
        return;
      }
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

  if (!isLoading && isError) {
    return (
      <>
        <NavBar dark />
        <div class="w-full flex items-center flex-wrap justify-center gap-10 h-screen">
          <div class="grid gap-4 w-full">
            <div class="w-20 h-20 mx-auto bg-gray-50 rounded-full shadow-sm justify-center items-center inline-flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
              >
                <g id="File Serch">
                  <path
                    id="Vector"
                    d="M19.9762 4V8C19.9762 8.61954 19.9762 8.92931 20.0274 9.18691C20.2379 10.2447 21.0648 11.0717 22.1226 11.2821C22.3802 11.3333 22.69 11.3333 23.3095 11.3333H27.3095M18.6429 19.3333L20.6429 21.3333M19.3095 28H13.9762C10.205 28 8.31934 28 7.14777 26.8284C5.9762 25.6569 5.9762 23.7712 5.9762 20V12C5.9762 8.22876 5.9762 6.34315 7.14777 5.17157C8.31934 4 10.205 4 13.9762 4H19.5812C20.7604 4 21.35 4 21.8711 4.23403C22.3922 4.46805 22.7839 4.90872 23.5674 5.79006L25.9624 8.48446C26.6284 9.23371 26.9614 9.60833 27.1355 10.0662C27.3095 10.524 27.3095 11.0253 27.3095 12.0277V20C27.3095 23.7712 27.3095 25.6569 26.138 26.8284C24.9664 28 23.0808 28 19.3095 28ZM19.3095 16.6667C19.3095 18.5076 17.8171 20 15.9762 20C14.1352 20 12.6429 18.5076 12.6429 16.6667C12.6429 14.8257 14.1352 13.3333 15.9762 13.3333C17.8171 13.3333 19.3095 14.8257 19.3095 16.6667Z"
                    stroke="#2E4053"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </div>
            <div>
              <h2 class="text-center text-black text-xl font-semibold leading-loose pb-2">
                Something went wrong
              </h2>
              <p class="text-center text-black text-base font-normal leading-relaxed pb-4">
                Might be Invalid Property ID, please search again
              </p>
              <div class="flex gap-3 justify-center">
                <button
                  class="w-full max-w-[100px] px-3 py-2 rounded-full border border-gray-300 text-white font-semibold leading-4 bg-gray-700"
                  onClick={() => navigate("/search")}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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
