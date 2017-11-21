export const ONLINE_PATH: string = '/online';
export const OFFLINE_PATH: string = '/offline';

export const START_PATH: string = '/';
export const ABOUT_PATH: string = '/path/';
export const OFFLINE_GAME_PATH: string = `${OFFLINE_PATH}/game/`;
export const OFFLINE_LOBBY_PATH: string = `${OFFLINE_PATH}/lobby/`;
export const LOGIN_PATH: string = `${ONLINE_PATH}/login/`;
export const SIGN_UP_PATH: string = `${ONLINE_PATH}/sign_up/`;
export const ONLINE_LOBBY_PATH: string = `${ONLINE_PATH}/lobby/`;
export const ONLINE_GAME_PATH: string = `${ONLINE_PATH}/game/`;
export const PROFILE_PATH: string = `${ONLINE_PATH}/profile/`;
export const RATING_PATH: string = `${ONLINE_PATH}/rating/`;

const ViewPaths = {
  online_path: ONLINE_PATH,
  offline_path: OFFLINE_PATH,

  start: START_PATH,
  about: ABOUT_PATH,
  offline_game: OFFLINE_GAME_PATH,
  offline_lobby: OFFLINE_LOBBY_PATH,
  login: LOGIN_PATH,
  sign_up: SIGN_UP_PATH,
  online_lobby: ONLINE_LOBBY_PATH,
  online_game: ONLINE_GAME_PATH,
  profile: PROFILE_PATH,
  rating: RATING_PATH,
};

export default ViewPaths;
