import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/tasks",
    headers: {
        "Content-Type": "application/json",
    }
});

export default axiosInstance;