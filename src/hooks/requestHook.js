import {useKeycloak} from "@react-keycloak/web";
import {useEffect, useState} from "react";
import axios from "axios";

/*
    This is a custom react request hook - useRequest
    TODO: make a normal doc for this hook
*/

export const HOST = 'http://localhost'
export const PORT = 2000

export const useRequest = (config) => {

    const {method, url, data, headers} = config

    const {keycloak, initialized} = useKeycloak()
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (initialized) {

            const axiosConfig = {
                baseURL: `${HOST}:${PORT}`,
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                    "Content-Type": 'application/json'
                }
            }

            const fetchData = async (instance, method, url, data, headers) => {
                return instance.request(
                    {
                        method,
                        url,
                        data,
                        headers
                    }
                )
            }

            const axiosInstance = axios.create(axiosConfig)

            fetchData(axiosInstance, method, url, data, headers)
                .then(res => {
                    setResponse(res)
                    setLoaded(true)
                })
                .catch(err => setError(err))

        }
    }, [initialized]);

    return {
        loaded,
        response,
        error
    }
}