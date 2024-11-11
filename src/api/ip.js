import axios from "axios";

  
export async function getIPAddress() {
    try {
        const response = await axios.get('https://ipinfo.io/json?token=dfe3a9193a5aa7');
        return response.data;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return error;
    }
}