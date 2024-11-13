import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HotelOutlinedIcon from "@mui/icons-material/HotelOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import axios from "axios";

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
} from "@mui/material";
import NavBar from "../../components/NavBar/NavBar";
import { formatCurrency } from "../../utils/helpers";
import { useParams } from "react-router-dom";
import { getPropertyDetail } from "../../api/search";
import NearbyPlaces from "./NearbyPlaces";

export default function PropertyDetail() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const params = useParams();
  const propertyId = params.id;
  const [topImages, setTopImages] = useState([]);
  const mainSwiperRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [property, setProperty] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  const possibleCategories = ['commercial', 'education', 'catering', 'service', 'healthcare'];

  console.log(propertyId);

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      const response = await getPropertyDetail(propertyId);
      setProperty(response?.propertyDetails);
      setTopImages(getTopImageURL(response?.propertyDetails?.originalPhotos));
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const getTopImageURL = (photosArray) => {
    const images = photosArray?.splice(0, 10)?.map((photo) => {
      return photo?.mixedSources?.jpeg[0]?.url;
    });

    return images;
  };

  const handleCategoryChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <>
      <NavBar dark />
      <Stack
        direction="row"
        sx={{
          width: "100%",
          justifyContent: "space-between",
          p: 2,
          flexWrap: { xs: "wrap", sm: "nowrap" },
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
          {/* Multi-Select Categories */}
          <Stack direction="row" alignItems="center" spacing={2} className="nearby-label">
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
          <InputLabel id="categories-label" shrink={false}>Nearby Places</InputLabel>
        )}
          <Select
            labelId="categories-label"
            id="categories"
            multiple
            value={selectedCategories}
            onChange={handleCategoryChange}
            renderValue={(selected) => selected.join(', ')}
          >
            {possibleCategories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
            </FormControl>
            Near this property
          </Stack>
          {/* Nearby Places */}
          {selectedCategories.length > 0 && <NearbyPlaces property={property} categories={selectedCategories} />}
          {/* Description */}
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
          <Stack
            direction="row"
            sx={{
              alignItems: "center",
              columnGap: 3,
              flexWrap: "wrap",
            }}
          >
            {property?.homeInsights?.[0]?.insights?.[0]?.phrases.map((value, index) => {
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
            })}
          </Stack>
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
        <Box sx={{ display: "flex", flexDirection: "column" }} className="agentContact">
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {property?.attributionInfo?.agentPhoneNumber || "N/A"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {property?.attributionInfo?.agentEmail || "N/A"}
          </Typography>
        </Box>
      </Box>
    </Box>
  </CardContent>
</Card>
<Card sx={{ width: "100%", maxWidth: 450 }} className="saveButton">
  <Box sx={{ display: "flex", flexDirection: "column" }}>
    <LibraryAddIcon className="saveIcon" sx={{ height: "100%" }} />
    <Typography variant="body2" sx={{ color: "text.secondary" }}>
      Save
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
      {/* open this link in iframe https://www.zillow.com/view-imx/bf8d5927-5568-4448-9ca4-e717c06c0cc4?setAttribution=mls&wl=true&initialViewType=pano&utm_source=dashboard */}
      {property?.virtualTourUrl && (
        <iframe
          src={property?.virtualTourUrl}
          width="100%"
          height="800px"
          allowFullScreen
        ></iframe>
      )}
    </>
  );
}