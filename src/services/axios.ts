import axios from "axios";

const getBaseUrl = (): string => {
  if (process.env.NODE_ENV === "production") {
    return process.env.NEXT_PUBLIC_API_URL || "";
  } else {
    return (
      process.env.NEXT_PUBLIC_API_URL ||
      process.env.NEXT_PUBLIC_API_URL + "/api"
    );
  }
};

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
});

export default axiosInstance;
