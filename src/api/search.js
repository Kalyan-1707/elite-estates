import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://zillow-working-api.p.rapidapi.com',
    headers: {
        'x-rapidapi-key': 'f332bfb540msh08d50ed1fb0625fp1cae83jsnb947b75db659',
        'x-rapidapi-host': 'zillow-working-api.p.rapidapi.com'
    }
});

export const search = async (location='San Francisco',beds='4', baths='OneHalfPlus', minPrice='5000', maxPrice='10000') => {
    const response = await instance.get('/search/byaddress', {
        params: {
            location: location,
            listingStatus: 'For_Sale',
            bed_min: beds,
            bathrooms: baths,
            listPriceRange: `min:{minPrice},max:{maxPrice}`
        }
    });
    console.log(response.data);
    return response.data;
}
