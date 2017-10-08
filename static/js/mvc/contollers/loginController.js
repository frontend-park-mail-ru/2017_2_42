import Controller from './controller';
import LoginView from '../views/loginView/loginView';
import LoginPageModel from '../models/loginPageModel';
import router from '../../modules/router';

export default class LoginController extends Controller {
  constructor() {
    super();

    this.view = new LoginView();
    this.model = new LoginPageModel();
    router.register('/login/', this);
  }

  run() {
    super.run();
  }

  stop() {
    super.stop();
  }
}