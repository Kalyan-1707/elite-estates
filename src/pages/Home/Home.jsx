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

  const [priceRange, setPriceRange] = useState([5000, 1000000]);
  const [latestHouses, setLatestHouses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const language = useSelector((state) => state.app.language);
  const [langMapping, setLangMapping] = useState({});
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    // Change the source file based on the language
    axios
      .get(`/localization/${language}.json`)
      .then((response) => {
        const data = response.data;
        setLangMapping(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [language]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  // initialize wishlist from local storage
  useEffect(() => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    favs = favs?.map((item) => item.property.zpid);
    setWishlist(favs);
  }, []);

  // toggle favorite
  const handleToggleFavorite = (id) => {
    if (wishlist?.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // on wishlist save to local storage
  useEffect(() => {
    if (wishlist?.length >= 0) {
      const favs = latestHouses?.searchResults?.filter((item) =>
        wishlist.includes(item.property.zpid)
      );
      if (favs?.length >= 0)
        localStorage.setItem("favorites", JSON.stringify(favs));
    }
  }, [wishlist]);

  // handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const beds = e.target.beds.value;
    const baths = e.target.baths.value;
    const minPrice = priceRange[0];
    var maxPrice = priceRange[1];
    if ((maxPrice = 1000000)) {
      maxPrice = "max:No_Max";
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

  // get latest houses on page load
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
        {/* Navbar */}
        <NavBar />
        {/* Hero Section */}
        <section className="hero-section-container">
          <span className="title">Elite Estates</span>
          <span className="subtitle">Dream Home.</span>
        </section>
        {/* Search Section */}
        <section className="search-section">
          <form className="search-form" onSubmit={handleSearch}>
            <FormControl variant="standard" sx={{ width: "100%" }}>
              <TextField
                id="location"
                label={langMapping["Location"]}
                variant="standard"
                name="location"
                InputLabelProps={{ shrink: true }}
                placeholder="location, city or zip"
                required
              />
            </FormControl>
            <RangeSelector
              label={langMapping["Price"]}
              name="price"
              marks={[
                { value: 5000, label: "$ " + formatCurrency(5000) },
                { value: 1000000, label: `$ 1M+` },
              ]}
              min={5000}
              max={1000000}
              step={10000}
              defaultValue={[5000, 1000000]}
              formatFunc={(value) => "$" + formatCurrency(value)}
              value={priceRange}
              setValue={handlePriceChange}
            />
            <SelectMenu
              label={langMapping["Beds"]}
              defaultValue={BEDS_DEFAULT_VALUE}
              selectOptions={BEDS_SELECT_OPTIONS}
              name="beds"
            />
            <SelectMenu
              label={langMapping["Baths"]}
              defaultValue={BATHS_DEFAULT_VALUE}
              selectOptions={BATHS_SELECT_OPTIONS}
              name="baths"
            />
            <Button variant="contained" type="submit">
              {langMapping["Search"]}
            </Button>
          </form>
        </section>
      </div>
      {/* trending houses */}
      <Box sx={{ width: "100%", px: { xs: 4, sm: 8 }, py: 4 }}>
        {!isLoading && latestHouses?.title && (
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, mb: 2 }}>
            {langMapping["Latest Houses in"] + " " + latestHouses?.title}
          </Typography>
        )}
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
                handleToggleFavorite={handleToggleFavorite}
                isFavorite={wishlist?.includes(item.property.zpid)}
                label={langMapping["Learn More"]}
              />
            );
          })}
          {isError && <>Something went wrong, please try again</>}
          {!isLoading && !latestHouses && (
            <>
              <div class="w-full flex items-center flex-wrap justify-center gap-10">
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
                      Try refershing page after sometime
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}

export default Home;
