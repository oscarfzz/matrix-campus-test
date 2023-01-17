import axios from "axios";

const ITUNES_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
    baseURL: `${ITUNES_BASE_URL}`,
    headers: {
      accept: 'application/json',
    },
  })

export default axiosInstance