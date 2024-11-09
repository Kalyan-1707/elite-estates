import React, { useEffect, useState } from "react";
import "./Home.css";
import NavBar from "../../components/NavBar/NavBar";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import RangeSelector from "../../components/RangeSelector/RangeSelector";
import { getLatestHouses, search } from "../../api/search";
import {
  BATHS_DEFAULT_VALUE,
  BATHS_SELECT_OPTIONS,
  BEDS_DEFAULT_VALUE,
  BEDS_SELECT_OPTIONS,
} from "../../utils/constants";
import { formatCurrency } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { setResults } from "../../slices/propertySlice";
import { useNavigate } from "react-router-dom";
import HouseCard from "../../components/HouseCard/HouseCard";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState([5000, 500000]);
  const [latestHouses, setLatestHouses] = useState(null);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const beds = e.target.beds.value;
    const baths = e.target.baths.value;
    const minPrice = priceRange[0];
    const maxPrice = priceRange[1];

    try {
      const response = await search(location, beds, baths, minPrice, maxPrice);
      console.log(response);
      dispatch(setResults(response));
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      const response = await getLatestHouses();
      setLatestHouses(response);
    })();
  }, []);

  return (
    <>
      <div className="home-page-container">
        <NavBar />
        <section className="hero-section-container">
          <span className="title">Elite Estates</span>
          <span className="subtitle">Dream Home .</span>
        </section>
        <section className="search-section">
          <form className="search-form" onSubmit={handleSearch}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <TextField
                id="location"
                label="Location"
                variant="standard"
                name="location"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </FormControl>
            <Divider orientation="vertical" flexItem />
            <div style={{ flexGrow: 1, width: "90%" }}>
              <RangeSelector
                label="Price"
                name="price"
                marks={[
                  { value: 5000, label: formatCurrency(5000) },
                  { value: 500000, label: formatCurrency(500000) },
                ]}
                min={5000}
                max={500000}
                step={1000}
                defaultValue={[5000, 500000]}
                formatFunc={(value) => formatCurrency(value)}
                value={priceRange}
                setValue={handlePriceChange}
              />
            </div>
            <Divider orientation="vertical" flexItem />
            <SelectMenu
              label="Beds"
              defaultValue={BEDS_DEFAULT_VALUE}
              selectOptions={BEDS_SELECT_OPTIONS}
              name="beds"
            />
            <SelectMenu
              label="Baths"
              defaultValue={BATHS_DEFAULT_VALUE}
              selectOptions={BATHS_SELECT_OPTIONS}
              name="baths"
            />
            <Divider orientation="vertical" flexItem />
            <Button variant="contained" sx={{ width: "100%" }} type="submit">
              Search
            </Button>
          </form>
        </section>
      </div>
      <Box sx={{ width: "100%", px: { xs: 4, sm: 8 }, py: 4 }}>
        <Typography variant="h4" component="div" sx={{ flexGrow: 1, mb: 2 }}>
          {latestHouses?.title}
        </Typography>
        <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ flexWrap: "wrap" }}
        rowGap={2}
        columnGap={2}
      >
        {latestHouses?.searchResults.map((item) => {
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
              //   handleToggleFavorite={handleToggleFavorite}
              isFavorite={item?.isFavorite || false}
            />
          );
        })}
      </Stack>
      </Box>
    </>
  );
}

export default Home;
