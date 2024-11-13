import { Box, Checkbox, FormControlLabel, Stack } from "@mui/material";
import React, { useState } from "react";
import HouseCard from "../../components/HouseCard/HouseCard";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );


  const handleRemoveFavorite = (id) => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const updatedFavorites = favorites.filter(
      (item) => item.property.zpid !== id
    );
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  if (favorites.length === 0) {
    return (
      <>
        <NavBar dark />
        <div class="w-full h-screen flex items-center flex-wrap justify-center gap-10">
          <div class="grid gap-4 w-60">
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
                
              </h2>
              <p class="text-center text-black text-base font-normal leading-relaxed pb-4">
                No favorites yet! Start adding some.
              </p>
              <div class="flex gap-3">
                <button class="w-full px-3 py-2 rounded-full border border-gray-300 text-white text-xs font-semibold leading-4 bg-gray-700" onClick={() => navigate("/search") }>
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar dark />
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
        ></Stack>

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
