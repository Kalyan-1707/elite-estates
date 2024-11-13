import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Stack, Grid } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import "./PropertyDetail.css";

const getLatitudeLongitude = (property) => {
  const latitude = property?.latitude;
  const longitude = property?.longitude;
  return { latitude, longitude };
};

const getNearbyPlaces = async (property, categories, setPlaces) => {
  const { latitude, longitude } = getLatitudeLongitude(property);
  if (!latitude || !longitude) {
    return;
  }
  const key = import.meta.env.VITE_GEO_KEY;
  const url = `https://api.geoapify.com/v2/places?categories=${categories.join(',')}&filter=circle:${longitude},${latitude},5000&bias=proximity:${longitude},${latitude}&limit=4&apiKey=${key}`;

  try {
    const response = await axios.get(url);
    setPlaces(response.data.features);
    console.log("Nearby places:", response.data);
  } catch (error) {
    console.error("Error fetching nearby places:", error);
  }
};

const NearbyPlaces = ({ property, categories }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    getNearbyPlaces(property, categories, setPlaces);
  }, [property, categories]);
  return (
    <Grid container spacing={2} className="nearby-places">
      {places.slice(0, 4).map((place, index) => (
        <Grid item xs={6} key={index}>
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
            <StoreIcon
              sx={{  mr: 2 }}
               className="nearby-icon"
            />
            {place.properties.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
};
export default NearbyPlaces;