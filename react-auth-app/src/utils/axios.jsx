import React, { useEffect } from 'react';
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { useHistory } from 'react-router-dom';

const axiosService = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosService.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');

    if (token !== null) {
        config.headers.Authorization = 'Bearer ' + token;
        console.debug('[Request]', config.baseURL + config.url, JSON.stringify(token));
    }
    return config;
});

axiosService.interceptors.response.use(
    (res) => {
        console.debug('[Response]', res.config.baseURL + res.config.url, res.status, res.data);
        return Promise.resolve(res);
    },
    (err) => {
        console.debug(
            '[Response]',
            err.config.baseURL + err.config.url,
            err.response.status,
            err.response.data
        );
        return Promise.reject(err);
    }
);

const refreshAuthLogic = async (failedRequest) => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken !== null) {
        return axios
            .post(
                '/auth/refresh/',
                {
                    refresh: refreshToken,
                },
                {
                    baseURL: process.env.REACT_APP_API_URL
                }
            )
            .then((resp) => {
                const { access, refresh } = resp.data;
                failedRequest.response.config.headers.Authorization = 'Bearer ' + access;
                localStorage.setItem('token', access);
                localStorage.setItem('refreshToken', refresh);
            })
            .catch((err) => {
                if (err.response && err.response.status === 401) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';  // Redirect to login page
                }
            });
    }
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

const ApiService = () => {
    const history = useHistory();

    useEffect(() => {
        // Simulating an API request on component mount
        axiosService.get('/example-endpoint')
            .then((response) => {
                console.log('API Response:', response.data);
            })
            .catch((error) => {
                console.error('API Error:', error);
            });
    }, []);

    return (
        <div>
            <h1>API Service Component</h1>
            <p>This component demonstrates API calls with Axios and token handling.</p>
        </div>
    );
};

export function fetcher(url) {
    return axiosService.get(url).then((res) => res.data);
}

export default ApiService;
