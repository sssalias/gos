import axios from 'axios'



const axiosInstance = axios.create(
    {
        headers: {
            // Authorization: `Bearer ${}`
        }
    }
)

export default axiosInstance;