import axios from 'axios'
import keycloak from "../auth/keycloack";

export const HOST = `${process.env.REACT_APP_API_HOST}`
export const PORT = process.env.REACT_APP_API_PORT

export const axiosInstance = axios.create(
    {
        baseURL: `${HOST}:${PORT}`,
        headers: {
            Authorization: `Bearer ${keycloak.token}`,
            "Content-Type": 'application/json'
        }
    }
)


export const makeRequestOld = (method, url, data=null, headers=null) => {
    return axiosInstance.request({
        url,
        method,
        data,
        headers,
    })
}

export const makeRequest = (token, method, url, data=null, headers=null) => {
    return axiosInstance.request({
        url,
        method,
        data,
        headers: {...headers, Authorization: `Bearer ${token}`},
    })
}