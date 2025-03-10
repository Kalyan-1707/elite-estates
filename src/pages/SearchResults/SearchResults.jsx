import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import NavBar from "../../components/NavBar/NavBar";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Button,
  Checkbox,
  Fab,
  FormControl,
  FormControlLabel,
  Modal,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import RangeSelector from "../../components/RangeSelector/RangeSelector";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import {
  BATHS_DEFAULT_VALUE,
  BATHS_SELECT_OPTIONS,
  BEDS_DEFAULT_VALUE,
  BEDS_SELECT_OPTIONS,
} from "../../utils/constants";
import "./SearchResults.css";
import { formatCurrency } from "../../utils/helpers";
import HouseCard from "../../components/HouseCard/HouseCard";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useSelector, useDispatch } from "react-redux";
import {
  setFavorites,
  setResults,
  updatePropertyFavorite,
} from "../../slices/propertySlice";
import { useSearchParams } from "react-router-dom";
import { search } from "../../api/search";
import axios from "axios";
const drawerWidth = 300;

function SearchResults(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const results = useSelector((state) => state.property.results);
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = React.useState([5000, 1000000]);
  const [yearRange, setYearRange] = React.useState([1980, 2024]);
  const [showCompare, setShowCompare] = React.useState(false);
  const [compareProperties, setCompareProperties] = React.useState([]);
  const [disableCompare, setDisableCompare] = React.useState(false);
  const [showCompareModal, setShowCompareModal] = React.useState(false);
  const [wishlist, setWishlist] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchParams] = useSearchParams();

  const language = useSelector((state) => state.app.language);
  const [langMapping, setLangMapping] = React.useState({});

  // Change the source file based on the language
  React.useEffect(() => {
    // Change the source file based on the language
    axios
      .get(`/localization/${language}.json`)
      .then((response) => {
        const data = response.data;
        // Use the data
        setLangMapping(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [language]);

  // get URL Params, get house list
  React.useEffect(() => {
    (async () => {
      // get URL params
      if (searchParams.size === 0) return;
      setIsLoading(true);
      const beds = searchParams.get("beds");
      const baths = searchParams.get("baths");
      const minPrice = searchParams.get("minPrice");
      const maxPrice = searchParams.get("maxPrice");
      const location = searchParams.get("location");

      setPriceRange([minPrice, maxPrice]);
      try {
        const response = await search(
          location,
          beds,
          baths,
          minPrice,
          maxPrice
        );
        dispatch(setResults(response));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  // initialize wishlist from local storage
  React.useEffect(() => {
    let favs = JSON.parse(localStorage.getItem("favorites")) || [];
    favs = favs?.map((item) => item.property.zpid);
    setWishlist(favs);
  }, []);

  // handle price and year change
  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };


  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

/**
 * Handles the search event by preventing the default form submission,
 * extracting search parameters from the event, and performing a search
 * request using these parameters. It updates the loading state during
 * the request, and dispatches the search results to the store upon success.
 * Logs any errors encountered during the search process.
 *
 * @param {Object} event - The event object from the form submission.
 */
  const handleSearch = async (event) => {
    event.preventDefault();
    console.log(event.target);
    const location = event.target.location.value;
    const beds = event.target.beds.value;
    const baths = event.target.baths.value;
    const minPrice = priceRange[0];
    var maxPrice = priceRange[1];
    const minYear = yearRange[0];
    const maxYear = yearRange[1];
    if ((maxPrice = 1000000)) {
      maxPrice = "max:No_Max";
    }
    setIsLoading(true);

    try {
      const response = await search(
        location,
        beds,
        baths,
        minPrice,
        maxPrice,
        minYear,
        maxYear
      );
      dispatch(setResults(response));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const toggleCompare = () => {
    setShowCompare(!showCompare);
    setCompareProperties([]);
    setDisableCompare(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleToggleFavorite = (id) => {
    if (wishlist?.includes(id)) {
      setWishlist(wishlist.filter((item) => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // update local storage
  React.useEffect(() => {
    if (wishlist?.length >= 0) {
      const favs = results?.searchResults?.filter((item) =>
        wishlist.includes(item.property.zpid)
      );
      if (favs?.length >= 0)
        localStorage.setItem("favorites", JSON.stringify(favs));
    }
  }, [wishlist]);

  // update compare properties
  const updateCompareProperties = (id, checked) => {
    let updateCompareProperties;
    if (checked) {
      updateCompareProperties = [...compareProperties, id];
      setCompareProperties(updateCompareProperties);
    } else {
      updateCompareProperties = compareProperties.filter((item) => item !== id);
      setCompareProperties(updateCompareProperties);
    }
    // check if two values are set and disable compare button
    if (updateCompareProperties.length >= 2) {
      setDisableCompare(true);
    } else {
      setDisableCompare(false);
    }
  };

  // create drawer
  const drawer = (
    <div>
      <Divider />

      <form className="filters-form" onSubmit={handleSearch}>
        <Typography className="filters-title">
          {langMapping["Refine Your Search"]}
        </Typography>
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <TextField
            id="location"
            label={langMapping["Location"]}
            variant="standard"
            name="location"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={searchParams.get("location") || ""}
            placeholder="Search by location"
            required
          />
        </FormControl>
        <RangeSelector
          label={langMapping["Price"]}
          name="price"
          marks={[
            { value: 5000, label: "$" + formatCurrency(5000) },
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
          defaultValue={searchParams.get("beds") || BEDS_DEFAULT_VALUE}
          selectOptions={BEDS_SELECT_OPTIONS}
          name="beds"
        />
        <SelectMenu
          label={langMapping["Baths"]}
          defaultValue={searchParams.get("baths") || BATHS_DEFAULT_VALUE}
          selectOptions={BATHS_SELECT_OPTIONS}
          name="baths"
        />

        <RangeSelector
          label={langMapping["Year Built"]}
          name="year"
          marks={[
            { value: 1980, label: 1980 },
            { value: 2024, label: 2024 },
          ]}
          min={1980}
          max={2024}
          step={1}
          value={yearRange}
          setValue={handleYearChange}
        />
        <Button variant="contained" sx={{ width: "100%" }} type="submit">
          {langMapping["Filter"]}
        </Button>
      </form>
      <Divider />
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <NavBar dark />
      <Box className="search-results-container" sx={{ display: "flex" }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                position: "relative",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
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
            <FormControlLabel
              control={<Checkbox />}
              onChange={toggleCompare}
              label={langMapping["Compare"]}
            />
            {disableCompare && (
              <Button
                variant="contained"
                sx={{ position: "fixed", right: 20, bottom: 20, zIndex: 5 }}
                onClick={() => {
                  setShowCompareModal(true);
                }}
              >
                {langMapping["Compare"]}
              </Button>
            )}
            <Button
              startIcon={<FilterAltOutlinedIcon />}
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                textTransform: "capitalize",
              }}
            >
              {langMapping["Filter"]}
            </Button>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            sx={{ flexWrap: "wrap" }}
            rowGap={2}
            columnGap={2}
          >
            {isLoading && (
              <>
                {Array(9)
                  .fill()
                  .map((_, index) => (
                    <HouseCard key={index} isLoading />
                  ))}
              </>
            )}
            {!isLoading && (results.length === 0 || results?.searchResults?.length === 0) && (
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
                      There are no properties here
                    </h2>
                    <p class="text-center text-black text-base font-normal leading-relaxed pb-4">
                      Try changing your filters to <br />
                      see more properties{" "}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {!isLoading &&
              results?.searchResults?.map((item) => {
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
                    handleToggleFavorite={handleToggleFavorite}
                    isFavorite={wishlist?.includes(item.property.zpid)}
                    showCompare={showCompare}
                    disableCompare={disableCompare}
                    updateCompareProperties={updateCompareProperties}
                    checked={compareProperties.includes(item.property.zpid)}
                    label={langMapping["Learn More"]}
                  />
                );
              })}
          </Stack>
        </Box>
      </Box>
      <Modal
        open={showCompareModal}
        onClose={() => setShowCompareModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          {/* close icon to left */}
          <Stack direction={"row"} justifyContent={"flex-end"} mb={2}>
            <IconButton
              aria-label="close-modal"
              onClick={() => setShowCompareModal(false)}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Stack>

          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="right" colSpan={2}>
                    <img
                      src={
                        results?.searchResults?.find(
                          (item) => item.property.zpid === compareProperties[0]
                        )?.property.media.propertyPhotoLinks.mediumSizeLink
                      }
                      width={"100%"}
                    />
                  </TableCell>
                  <TableCell align="right" colSpan={2}>
                    <img
                      src={
                        results?.searchResults?.find(
                          (item) => item.property.zpid === compareProperties[1]
                        )?.property.media.propertyPhotoLinks.mediumSizeLink
                      }
                      width={"100%"}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Address</TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[0]
                      )?.property.address.streetAddress
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[1]
                      )?.property.address.streetAddress
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Built</TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[0]
                      )?.property.yearBuilt
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[1]
                      )?.property.yearBuilt
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell align="right">
                    ${" "}
                    {formatCurrency(
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[0]
                      )?.property.price.value
                    )}
                  </TableCell>
                  <TableCell align="right">
                    ${" "}
                    {formatCurrency(
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[1]
                      )?.property.price.value
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sq Ft</TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[0]
                      )?.property.livingArea
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[1]
                      )?.property.livingArea
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Beds</TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[0]
                      )?.property.bedrooms
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[1]
                      )?.property.bedrooms
                    }
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Baths</TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[0]
                      )?.property.bathrooms
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      results?.searchResults?.find(
                        (item) => item.property.zpid === compareProperties[1]
                      )?.property.bathrooms
                    }
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Modal>
    </>
  );
}

export default SearchResults;
