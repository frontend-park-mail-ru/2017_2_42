import BaseView from '../modules/baseView';

import AboutView from './aboutView/aboutView';
import GameView from './gameView/gameView';
import LoginView from './loginView/loginView';
import NoInternetView from './noInternetView/noInternet';
import NotFoundView from './notFoundView/notFound';
import OfflineLobbyView from './offlineLobbyView/lobbyView';
import OnlineLobbyView from './onlineLobbyView/lobbyView';
import ViewPaths from './pagePaths';
import ProfileView from './profileView/profileView';
import SignUpView from './signUpView/signUpView';
import StartView from './startView/startView';


interface ViewDetails {
    readonly path?: string;
    readonly class: new (parentElement: HTMLElement) => BaseView;
}

export const about_view: ViewDetails = {
    path: ViewPaths.about,
    class: AboutView,
};

export const online_game_view: ViewDetails = {
    path: ViewPaths.online_game,
    class: GameView,
};

export const offline_game_view: ViewDetails = {
    path: ViewPaths.offline_game,
    class: GameView,
};

export const login_view: ViewDetails = {
    path: ViewPaths.login,
    class: LoginView,
};

export const offline_lobby_view: ViewDetails = {
    path: ViewPaths.offline_lobby,
    class: OfflineLobbyView,
};

export const online_lobby_view: ViewDetails = {
    path: ViewPaths.online_lobby,
    class: OnlineLobbyView,
};

export const sign_up_view: ViewDetails = {
    path: ViewPaths.sign_up,
    class: SignUpView,
};

export const start_view: ViewDetails = {
    path: ViewPaths.start,
    class: StartView,
};

export const not_found_view: ViewDetails = {
    class: NotFoundView,
};

export const no_internet_view: ViewDetails = {
    class: NoInternetView,
};

export const profile_view: ViewDetails = {
    path: ViewPaths.profile,
    class: ProfileView,
};

const Views = {
    about: about_view,
    online_game: online_game_view,
    offline_game: offline_game_view,
    login: login_view,
    offline_lobby: offline_lobby_view,
    online_lobby: online_lobby_view,
    sign_up: sign_up_view,
    start: start_view,
    not_found: not_found_view,
    no_internet: no_internet_view,
    profile: profile_view,
};

export default Views;
