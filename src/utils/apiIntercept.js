import axios from 'axios';

export const setupInterceptors = () => {
  axios.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line
      config.headers = {
        ...config.headers,
        'access-token': localStorage.getItem(['access-token']),
        client: localStorage.getItem(['client']),
        uid: localStorage.getItem(['uid']),
      };
      console.log(config.headers)
      return config;
    },
    error =>
      // Do something with request error
      Promise.reject(error),
  );

  axios.interceptors.response.use(
    (response) => {
      if (response.headers['access-token']) {
        localStorage.setItem("access-token", response.headers['access-token'])
      }

      return response;
    },
    (error) => {
      if (error.config.headers['access-token'] && error.config.headers['access-token'] !== localStorage.getItem(['access-token'])) {
        localStorage.setItem("access-token", error.config.headers['access-token'])
      }
    }
  );
};  
