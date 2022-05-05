import axios, { Method } from 'axios';
import Cookie from 'js-cookie';
import Router from 'next/router';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Global request function for handling all HTTP calls
 * @param method
 * @param url
 * @param options {params: <for query params>, payload: <for data to be sent>'}
 */

const request = (method: Method, url: string, options = { params: {}, payload: {} }) => {
  const request = {
    url,
    method,
    params: options.params,
    data: options.payload,
  };

  return new Promise((resolve, reject) => {
    axios
      .request(request)
      .then(res => resolve(res))
      .catch(err => reject(err));
  });
};

export const POST = (path: string, payload: any) => {
  return request('POST', path, {
    payload,
    params: {}
  });
};

export const UPLOAD = (path: string, payload: any) => {
  return axios.post(path, payload, {
    onUploadProgress: ProgressEvent => (ProgressEvent.loaded / ProgressEvent.total) * 100,
  });
};

export const GET = (path: string, params: any) => {
  return request('GET', path, {
    params,
    payload: undefined
  });
};

export const GETALL = (path: string, filters: any) => {
  return request('GET', path, {
    params: filters,
    payload: undefined
  });
};

export const PUT = (path: string, payload: any) => {
  return request('PUT', path, { payload });
};

export const PATCH = (path: string, payload: any) => {
  return request('PATCH', path, {
    payload: payload,
    params: undefined
  });
};

export const DELETE = (path: string) => {
  return request('DELETE', path);
};

axios.interceptors.request.use(request => {
  const token = Cookie.get('s_TxgKyE');
  let headers = {};
  if (token) {
    headers['x-auth-token'] = `${token}`;
  }

  request.headers = headers;

  return request;
});

/**
 * RESPONSE INTERCEPTOR
 */
axios.interceptors.response.use(
  response => {
    // Do something with response data
    return response.data;
  },
  error => {
    if (error.response.status === 401) {
      Cookie.remove('s_TxgKyE');
      Router.push('/');
    }
    // else if (error.response.status === 400) {
    //   return error.response.data;
    // }
    return Promise.reject(error.response.data);
  },
);
