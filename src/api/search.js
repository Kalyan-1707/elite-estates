import axios from "axios";
import { getIPAddress } from "./ip";

const instance = axios.create({
  baseURL: "https://zillow-working-api.p.rapidapi.com",
  headers: {
    "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
    "x-rapidapi-host": "zillow-working-api.p.rapidapi.com",
  },
});

const search = async (
  location = "San Francisco",
  beds = "4",
  baths = "OneHalfPlus",
  minPrice = "5000",
  maxPrice = "10000"
) => {
  try {
    const response = await instance.get("/search/byaddress", {
      params: {
        location: location,
        listingStatus: "For_Sale",
        bed_min: beds,
        bathrooms: baths,
        listPriceRange: `min:{minPrice},max:{maxPrice}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getLatestHouses = async () => {
 
    const IP = await getIPAddress();
    const city = IP?.city;
    try {
    const response = await instance.get("/search/byaddress", {
      params: {
        location: city || "New York",
        listingStatus: "For_Sale",
        sortOrder: "Newest",
      },
    });
    console.log(response.data);
    return {
      title: `Latest Houses in ${city}`,
      searchResults: response.data?.searchResults.splice(0, 4),
    };
  } catch (error) {
    console.log(error);
    // throw error;
  }
};

const getPropertyDetail = async (zpid) => {
  const response = await instance.get("/pro/byzpid", {
    params: {
      zpid: zpid,
    },
  });
  console.log(response.data);
  return response.data;
};

export { search, getLatestHouses, getPropertyDetail };
