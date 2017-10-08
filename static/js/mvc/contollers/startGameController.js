import StartGameView from '../views/startView/startView';
import StartGameModel from '../models/startPageModel';
import Controller from './controller';
import eventBus from '../../modules/eventBus';
import UserService from '../../modules/userService';
import router from '../../modules/router'

/**
 * Implements start game controller
 * contains view and model of the page
 */
export default class StartGameController extends Controller {
  constructor() {
    super();

    this.view = new StartGameView();
    this.model = new StartGameModel();

    router.register('/', this);
  }

  run() {
    super.run();
    this.evBusListenerRemovers.push(
      eventBus.on('startOnline', () => {
        UserService.me()
          .then(user => {
            if (user) {
              router.go('/mp/');
            }
            else {
              router.go('/login/');
            }
          })
          .catch(err => console.log(err || 'err'));
      }));
  }

  stop() {
    super.stop();
  }
}
