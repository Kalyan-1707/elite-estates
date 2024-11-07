import React, { useState } from "react";
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
  TextField,
  Typography,
} from "@mui/material";
import SelectMenu from "../../components/SelectMenu/SelectMenu";
import RangeSelector from "../../components/RangeSelector/RangeSelector";
import { search } from "../../api/search";
import { BATHS_DEFAULT_VALUE, BATHS_SELECT_OPTIONS, BEDS_DEFAULT_VALUE, BEDS_SELECT_OPTIONS } from "../../utils/constants";
import { formatCurrency } from "../../utils/helpers";
import { useSelector, useDispatch } from 'react-redux'
import { setResults } from "../../slices/propertySlice";
import { useNavigate } from 'react-router-dom';




function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [priceRange, setPriceRange] = useState([5000, 500000]);

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

    try{
        const response = await search(location, beds, baths, minPrice, maxPrice);
        console.log(response);
        dispatch(setResults(response));
        navigate('/search');
    }
    catch(error){
        console.log(error);
    }
  };
  return (
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
  );
}

export default Home;
