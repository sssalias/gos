import axios from 'axios'
import keycloak from "../auth/keycloack";

export const HOST = 'http://5.145.160.142'
export const PORT = 2000

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