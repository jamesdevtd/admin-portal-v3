import axios, { Method } from 'axios';
import Router from 'next/router';
import { getSession } from 'next-auth/react';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

/**
 * Global request function for handling all HTTP calls
 * @param method
 * @param url
 * @param options {params: <for query params>, payload: <for data to be sent>'}
 */

const request = (
  method: Method,
  url: string,
  options = { params: {}, payload: {} }
) => {
  const request = {
    url,
    method,
    params: options.params,
    data: options.payload,
  };

  return new Promise((resolve, reject) => {
    axios
      .request(request)
      .then((res) => resolve(res))
      .catch((err) => reject(err));
  });
};

export const POST = (path: string, payload: any) => {
  return request('POST', path, {
    payload,
    params: {},
  });
};

export const UPLOAD = (path: string, payload: any) => {
  return axios.post(path, payload, {
    onUploadProgress: (ProgressEvent) =>
      (ProgressEvent.loaded / ProgressEvent.total) * 100,
  });
};

export const GET = (path: string, params: any) => {
  return request('GET', path, {
    params,
    // TODO: add typed payload if possible
    payload: {} as any,
  });
};

export const GETALL = (path: string, filters: any) => {
  return request('GET', path, {
    params: filters,
    payload: {} as any,
  });
};

export const PUT = (path: string, payload: any) => {
  return request('PUT', path, { ...payload });
};

export const PATCH = (path: string, payload: any) => {
  return request('PATCH', path, {
    payload: payload,
    // TODO: add typed payload if possible
    params: {} as any,
  });
};

export const DELETE = (path: string) => {
  return request('DELETE', path);
};

axios.interceptors.request.use(async request => {
  const headers: any = {};
  const session: any = await getSession()

  if (session) {
    headers['Authorization'] = `Bearer ${session.user.accessToken}`;
  }

  request.headers = headers;

  return request;
});

/**
 * RESPONSE INTERCEPTOR
 */
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      Router.push('/');
    }
    else if (error.response.status === 500) {
      return Promise.reject(error);
    }
    return Promise.reject(error.response.data);
  }
);
