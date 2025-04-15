import axios from "axios";

const baseURL = "http://137.184.193.47/api/v1";

var headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
};

const options = {
    headers,
    baseURL,
};

const Axios = axios.create(options);

Axios.interceptors.request.use(
    function (config) {
        const tokenStore = localStorage.getItem("auth-token");
        if (tokenStore) {
            config.headers.Accept = "application/json";
            config.headers.Authorization = "Bearer " + tokenStore;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

Axios.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        if (error.response) {
            if (error.response.data.message == 'Unauthenticated.') {
                localStorage.removeItem("auth-token");
                window.location.replace('/login');
                return null;
            }
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error);
        }
    }
);

export default Axios;
