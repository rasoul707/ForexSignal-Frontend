import axios from "axios";

const baseUrl = 'http://195.248.242.210:8000/api/';
// const baseUrl = 'http://127.0.0.1:8000/api/';
const headers = () => { return { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } } }


export const POST = (withToken = true, config = {}) => async (url = '', data = {}) => {
    if (!config) config = {}
    if (withToken) config = { ...config, ...headers() }
    return await axios.post(`${baseUrl}${url}`, data, config).catch((error) => { throw error.response })
}

export const GET = (withToken = true, config = {}) => async (url = '') => {
    if (!config) config = {}
    if (withToken) config = { ...config, ...headers() }
    return await axios.get(`${baseUrl}${url}`, config).catch((error) => { throw error.response })
}

export const PUT = (withToken = true, config = {}) => async (url = '', data = {}) => {
    if (!config) config = {}
    if (withToken) config = { ...config, ...headers() }
    return await axios.put(`${baseUrl}${url}`, data, config).catch((error) => { throw error.response })
}

export const PATCH = (withToken = true, config = {}) => async (url = '', data = {}) => {
    if (!config) config = {}
    if (withToken) config = { ...config, ...headers() }
    return await axios.patch(`${baseUrl}${url}`, data, config).catch((error) => { throw error.response })
}

export const DELETE = (withToken = true, config = {}) => async (url = '') => {
    if (!config) config = {}
    if (withToken) config = { ...config, ...headers() }
    return await axios.delete(`${baseUrl}${url}`, config).catch((error) => { throw error.response })
}




