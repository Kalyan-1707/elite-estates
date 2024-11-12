
import React, { useEffect, useState } from "react";
import "./Home.css";
import "../SearchResults/SearchResults.css";
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
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [priceRange, setPriceRange] = useState([5000, 5000000]);
  const [latestHouses, setLatestHouses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const language = useSelector((state) => state.app.language);
  const [langMapping, setLangMapping] = useState({});

  useEffect(() => {
    // Change the source file based on the language
      axios.get(`/localization/${language}.json`)
      .then(response => {
        const data = response.data;
        // Use the data
        setLangMapping(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [language]);


  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const beds = e.target.beds.value;
    const baths = e.target.baths.value;
    const minPrice = priceRange[0];
    var maxPrice = priceRange[1];
    if (maxPrice = 1000000) {
      maxPrice = 'max:No_Max';
    }
    const params = new URLSearchParams();
    params.append("location", e.target.location.value);
    params.append("beds", e.target.beds.value);
    params.append("baths", e.target.baths.value);
    params.append("minPrice", priceRange[0]);
    params.append("maxPrice", priceRange[1]);

    // You can then use the params object to construct a URL
    const url = `/search?${params.toString()}`;

    try {
      const response = await search(location, beds, baths, minPrice, maxPrice);
      console.log(response);
      dispatch(setResults(response));
      navigate(url);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await getLatestHouses();
        setLatestHouses(response);
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.log(error);
      }
      setIsLoading(false);
      setIsError(false);
    })();
  }, []);

  return (
    <>
      <div className="home-page-container">
        <NavBar />
        <section className="hero-section-container">
          <span className="title">Elite Estates</span>
          <span className="subtitle">Dream Home.</span>
        </section>
        <section className="search-section">
          <form className="search-form" onSubmit={handleSearch}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <TextField
                id="location"
                label="Location"
                variant="standard"
                name="location"
               
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
                  { value: 1000000, label: ` ${formatCurrency(1000000)}+` },
                ]}
                min={5000}
                max={1000000}
                step={10000}
                defaultValue={[5000, 1000000]}
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
          {langMapping["Latest Houses in"]+ " "+latestHouses?.title}
        </Typography>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ flexWrap: "wrap" }}
          rowGap={2}
          columnGap={2}
        >
          {isLoading && (
            <>
              <HouseCard isLoading />
              <HouseCard isLoading />
              <HouseCard isLoading />
              <HouseCard isLoading />
              <HouseCard isLoading />
              <HouseCard isLoading />
            </>
          )}
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
          {isError && <>Something went wrong, please try again</>}
          {!latestHouses && <>No houses found.</>}
        </Stack>
      </Box>
    </>
  );
}

export default Home;
