import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import NavBar from "../../components/NavBar/NavBar";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
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
import { setFavorites, updatePropertyFavorite } from "../../slices/propertySlice";

const drawerWidth = 300;

function SearchResults(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const results = useSelector((state) => state.property.results);
  const dispatch = useDispatch();
  const [priceRange, setPriceRange] = React.useState([5000, 500000]);
  const [yearRange, setYearRange] = React.useState([2011, 2024]);

  const handleYearChange = (event, newValue) => {
    setYearRange(newValue);
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(event.target);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
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
    const property = { ...results?.searchResults.find((item) => item.property.zpid === id) };
    if (property?.isFavorite) {
      property.isFavorite = false;
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const updatedFavorites = favorites.filter(
        (item) => item.property.zpid !== id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      dispatch(updatePropertyFavorite(property));
    } else {
      property.isFavorite = true;
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      localStorage.setItem(
        "favorites",
        JSON.stringify([...favorites, property])
      );
      dispatch(updatePropertyFavorite(property));
    }
  };

  React.useEffect(() => {}, []);

  const drawer = (
    <div>
      <Divider />

      <form className="filters-form" onSubmit={handleSearch}>
        <Typography>Refine Your Search</Typography>
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

        <RangeSelector
          label="Year Built"
          name="year"
          marks={[
            { value: 2011, label: 2011 },
            { value: 2024, label: 2024 },
          ]}
          min={2011}
          max={2024}
          step={1}
          value={yearRange}
          setValue={handleYearChange}
        />
        <Button variant="contained" sx={{ width: "100%" }} type="submit">
          Filter
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
      <Box sx={{ display: "flex" }}>
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
            <FormControlLabel control={<Checkbox />} label="Compare" />
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
              Filters
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
            {results?.searchResults.map((item, index) => {
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
                  isFavorite={item?.isFavorite || false}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    </>
  );
}

export default SearchResults;
