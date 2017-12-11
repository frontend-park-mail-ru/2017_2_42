import {BaseOverlayCtor} from '../modules/BaseOverlay';
import {ExtendedViewCtor} from '../modules/BaseView';
import router from '../modules/router';
import NoInternet from '../views/Overlays/NoInternet/NoInternet';
import AboutView from '../views/Pages/aboutView/aboutView';
import GameView from '../views/Pages/gameView/gameView';
import LoginView from '../views/Pages/loginView/loginView';
import NotFoundView from '../views/Pages/notFoundView/notFound';
import OfflineLobbyView from '../views/Pages/offlineLobbyView/lobbyView';
import OnlineLobbyView from '../views/Pages/onlineLobbyView/lobbyView';
import SignUpView from '../views/Pages/signUpView/signUpView';
import StartView from '../views/Pages/startView/startView';
import MapLoading from '../views/Overlays/MapLoading/MapLoading';
import WaitingTeammates from '../views/Overlays/WaitingTeammates/WaitingTeammates';
import WinOverlay from '../views/Overlays/Win/Win';
import Lose from '../views/Overlays/Lose/Lose';
import UserProfile from '../views/Overlays/UserProfile/UserProfile';
import Settings from '../views/Overlays/Settings/Settings';
import Loading from '../views/Overlays/Loading/Loading';

interface ViewPageInfo {
  name: string;
  path: string;
  view: ExtendedViewCtor;
}

interface OverlayInfo {
  name: string;
  overlay: BaseOverlayCtor;
}


export default class ViewService {
  public static registerAll() {
    ViewService.registerAllViews();
    ViewService.registerAllOverlays();
    router.registerNotFoundView(NotFoundView);
  }

  private static registerAllViews() {
    return ViewService.ViewPage_Path.forEach((vpi: ViewPageInfo) => {
      router.register(vpi.path, vpi.view);
    });
  }

  private static registerAllOverlays() {
    return ViewService.Overlay_Name.forEach((oi: OverlayInfo) => {
      router.registerOverlay(oi.name, oi.overlay);
    });
  }

  public static OnlinePath = '/online';
  public static OfflinePath = '/offline';

  public static ViewPaths = {
    startPage: '/',
    aboutPage: '/about',
    online: {
      loginPage: `${ViewService.OnlinePath}/login`,
      signUpPage: `${ViewService.OnlinePath}/sign_up`,
      lobbyPage: `${ViewService.OnlinePath}/lobby`,
      gamePage: `${ViewService.OnlinePath}/game`,
    },
    offline: {
      lobbyPage: `${ViewService.OfflinePath}/lobby`,
      gamePage: `${ViewService.OfflinePath}/game`,
    },
  };

  public static OverlayNames = {
    errors: {
      noInternet: 'No Internet',
    },
    game: {
      mapLoading: 'Map loading',
      waitingTeammates: 'Waiting teammates',
      win: 'Win',
      lose: 'Lose',
    },
    application: {
      userProfile: 'User profile',
      settings: 'Settings',
      loading: 'Loading',
    },
  };

  private static ViewPage_Path: ViewPageInfo[] = [
    {
      name: 'Start page',
      path: ViewService.ViewPaths.startPage,
      view: StartView,
    }, {
      name: 'Login page',
      path: ViewService.ViewPaths.online.loginPage,
      view: LoginView,
    }, {
      name: 'Sign up page',
      path: ViewService.ViewPaths.online.signUpPage,
      view: SignUpView,
    }, {
      name: 'Online lobby',
      path: ViewService.ViewPaths.online.lobbyPage,
      view: OnlineLobbyView,
    }, {
      name: 'Online game',
      path: ViewService.ViewPaths.online.gamePage,
      view: GameView,
    }, {
      name: 'About page',
      path: ViewService.ViewPaths.aboutPage,
      view: AboutView,
    }, {
      name: 'Offline lobby',
      path: ViewService.ViewPaths.offline.lobbyPage,
      view: OfflineLobbyView,
    }, {
      name: 'Offline game',
      path: ViewService.ViewPaths.offline.gamePage,
      view: GameView,
    },
  ];

  private static Overlay_Name: OverlayInfo[] = [
    {
      name: ViewService.OverlayNames.errors.noInternet,
      overlay: NoInternet,
    }, {
      name: ViewService.OverlayNames.game.mapLoading,
      overlay: MapLoading,
    }, {
      name: ViewService.OverlayNames.game.waitingTeammates,
      overlay: WaitingTeammates,
    }, {
      name: ViewService.OverlayNames.game.win,
      overlay: WinOverlay,
    }, {
      name: ViewService.OverlayNames.game.lose,
      overlay: Lose,
    }, {
      name: ViewService.OverlayNames.application.userProfile,
      overlay: UserProfile,
    }, {
      name: ViewService.OverlayNames.application.settings,
      overlay: Settings,
    }, {
      name: ViewService.OverlayNames.application.loading,
      overlay: Loading,
    },
  ];
}