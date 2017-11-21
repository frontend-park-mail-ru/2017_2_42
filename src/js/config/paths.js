const PATHS = {
  BACKEND_SERVER: (
    window.location.host === 'localhost:8000' ||
    window.location.host === '127.0.0.1:8000' ||
    window.location.host === '127.0.0.1:8001' ||
    window.location.host === 'localhost:8001') ? 'http://localhost:8080' : 'https://back42end.herokuapp.com',

  SIGNUP_PATH: '/api/auth/signup',
  LOGIN_PATH: '/api/auth/login',
  ME_PATH: '/api/auth/me',
  GET_MAPS_PATH: '/api/game/maps',
  GET_MAP: '/api/maps',
};

export default PATHS;
