import { Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import React, { useState } from "react";
import HouseCard from "../../components/HouseCard/HouseCard";
import NavBar from "../../components/NavBar/NavBar";

function Wishlist() {
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);

  const handleRemoveFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.filter((item) => item.property.zpid !== id);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <>
    <NavBar dark/>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
        sx={{ flexWrap: "wrap" }}
        rowGap={2}
        columnGap={2}
      >
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{ flexWrap: "wrap" }}
        rowGap={2}
        columnGap={2}
      >
        {favorites.map((item) => {
          return (
            <HouseCard
              key={item.property.zpid}
              id={item.property.zpid}
              address={item.property.address.streetAddress}
              city={item.property.address.city}
              state={item.property.address.state}
              zip={item.property.address.zipcode}
              beds={item.property.bedrooms}
              baths={item.property.bathrooms}
              price={item.property.price.value}
              img={item.property.media.propertyPhotoLinks.mediumSizeLink}
              handleToggleFavorite={handleRemoveFavorite}
              isFavorite={true}
            />
          );
        })}
      </Stack>
    </Box>
    </>
  );
}

export default Wishlist;
