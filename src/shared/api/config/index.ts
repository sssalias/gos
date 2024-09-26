import axios from 'axios'

export const HOST = import.meta.env.VITE_API_HOST


export enum Methods {
    GET='GET',
    POST='POST',
    PUT='PUT',
    DELETE='DELETE'
}

export const axiosInstance = axios.create(
    {
        baseURL: HOST,
        headers: {
             'Content-Type': 'application/json'
        }
    }
)

export const makeRequest = async (token:string, method:Methods, url:string, data:null|object=null, headers:null|object=null) => {
    return await axiosInstance.request({
        url,
        method,
        data,
        headers: {...headers, Authorization: `Bearer ${token}`},
    })
}