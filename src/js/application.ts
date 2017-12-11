import User from './models/user';
import router from './modules/router';
import Utils from './modules/utils/utils';
import ViewService from './services/ViewService';
import userService from './services/userService';

/**
 * Main class for web application.
 */
export default class Application {
  /**
   * Creates an instance of Application.
   */
  constructor(private rootNode: HTMLElement) {
  }

  /**
   * Starts the application
   * @return {Promise<void>}
   */
  public async start(): Promise<void> {
    router.setRootElement(this.rootNode);
    router.start();

    ViewService.registerAll();

    const location = window.location.pathname;
    await Application.pathDispatcher(location);
  }

  /**
   * Disptches the path incoming
   * @param {string} location
   * @return {Promise<void>}
   */
  private static async pathDispatcher(location: string): Promise<void> {
    if (location === '/vk_ok') {
      console.log('Vk_auth');
      const user = await userService.getUser(true);

      if (user) {
        return router.go(ViewService.ViewPaths.online.lobbyPage);
      } else {
        return router.go(ViewService.ViewPaths.online.loginPage);
      }
    }

    if (location.startsWith(ViewService.OnlinePath)) {
      let user: User | null;

      try {
        user = await userService.getUser();
      } catch (error) {
        Utils.debugWarn('No internet');
        return router.showOverlay(ViewService.OverlayNames.errors.noInternet);
      }

      if (user) {
        return router.go(ViewService.ViewPaths.online.lobbyPage);
      } else {
        if (location !== ViewService.ViewPaths.online.signUpPage) {
          return router.go(ViewService.ViewPaths.online.loginPage);
        }
      }
    }

    if (location.startsWith(ViewService.OfflinePath)) {
      return router.go(ViewService.ViewPaths.offline.lobbyPage);
    }

    return router.go(location);
  }
}
