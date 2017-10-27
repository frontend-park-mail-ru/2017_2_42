const PATHS = {
  BACKEND_SERVER: (window.location.host === 'localhost:8000' ||
    window.location.host === '127.0.0.1:8000') ? 'https://back42end.herokuapp.com' : 'https://back42end.herokuapp.com',

  SIGNUP_PATH: '/api/auth/signup',
  LOGIN_PATH: '/api/auth/login',
  ME_PATH: '/api/auth/me',
  GET_MAPS_PATH: '/api/maps/get',
  GET_MAP: '/api/maps',
};

export default PATHS;
