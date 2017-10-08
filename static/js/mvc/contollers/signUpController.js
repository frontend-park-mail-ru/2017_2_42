import Controller from './controller';
import router from '../../modules/router';
import SignUpView from '../views/signUpView/signUpView';
import SignUpModel from '../models/signUpModel';

export default class SignUpController extends Controller {
  constructor() {
    super();

    this.view = new SignUpView();
    this.model = new SignUpModel();

    router.register('/signup/', this);
  }

  run() {
    super.run();
  }

  stop() {
    super.stop();
  }
}