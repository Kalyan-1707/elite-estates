import axios from "axios";

  
export async function getIPAddress() {
    try {
        const token = import.meta.env.VITE_IP_TOKEN; 
        const response = await axios.get('https://ipinfo.io/json?token='+token);
        return response.data;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return error;
    }
}
