import axios from "axios";
import http from 'http';
import https from 'https';
import qs from "qs";
import AuthService from "../util/AuthService";

/**
 *
 * parse error response
 */
function parseError(response) {
  if (response) {
    const code = parseInt(response.status);
    let errMsg = "";
    switch (code) {
      case 400:
        if (response.data && response.data.errors) {
          Object.entries(response.data.errors)
            .forEach(([key, value]) => {
              errMsg += `${key}: ${value.join(',')}\n`
            });
          errMsg = { message: errMsg, type: "Bad Request" };
        }
        else errMsg = "Bad Request";
        break;
      case 401:
        errMsg = "Unauthorized";
        new AuthService().logOut();
        window.location.href = '/';
        break;
      case 403:
        errMsg = "Forbidden";
        break;
      case 404:
        errMsg = "Not Found";
        break;
      case 409:
        errMsg = "Conflict";
        break;
      case 415:
        errMsg = "Unsupported Media Type";
        break;
      case 500:
        errMsg = "Internal Server Error";
        break;
      case 501:
        errMsg = "Not Implemented";
        break;
      case 502:
        errMsg = "Bad Gateway";
        break;
      case 503:
        errMsg = "Service Unavailable";
        break;
      case 504:
        errMsg = "Gateway Timeout";
        break;
      default:
        errMsg = "Unspecified Error";
    }
    return Promise.reject(errMsg);
  } else {
    return Promise.reject("Network Error");
  }
}

/**
 * parse response
 */
function parseBody(response) {
  return response.data;
}

/**
 * axios instance
 */

// Create instance
let instance = axios.create({
  // baseURL: "http://localhost:1500/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  },
  paramsSerializer: function (params) {
    return qs.stringify(params, { indices: false });
  }
});

// request header
instance.interceptors.request.use(
  config => {
    let auth = new AuthService();
    if (auth.loggedIn()) {
      const apiToken = auth.getToken();
      config.headers.authorization = `Bearer ${apiToken}`;
    }
    config.httpAgent = new http.Agent({ keepAlive: true });
    config.httpsAgent = new https.Agent({ keepAlive: true });
    config.validateStatus = function (status) {
      return status >= 200 && status < 300;
    }
    config.maxRedirects = 5;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// response parse
instance.interceptors.response.use(
  response => {
    return parseBody(response);
  },
  error => {
    return parseError(error.response);
  }
);

export const $http = instance;
