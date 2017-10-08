import StartGameController from './mvc/contollers/startGameController'
import LoginController from './mvc/contollers/loginController';
import SignUpController from './mvc/contollers/signUpController';
import router from './modules/router';

export default class Application {
  constructor() {
    new StartGameController();
    new LoginController();
    new SignUpController();
  }

  run() {
    router.go('/');
  }
}
