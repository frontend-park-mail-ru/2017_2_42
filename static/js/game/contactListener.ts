import {b2ContactListener} from './Box2D/Dynamics/b2WorldCallbacks';
import eventBus from '../modules/eventBus';

let MyListener = new b2ContactListener();

MyListener.BeginContact = (contact) => {
  let A = contact.GetFixtureA().GetFilterData().categoryBits;
  let B = contact.GetFixtureB().GetFilterData().categoryBits;
  if (A == 0x0004 && B == 0x0002 || A == 0x0002 && B == 0x0004) {
    console.log('HELLO');
    contact.GetFixtureA().GetBody().GetUserData().isDeleted = true;
    contact.GetFixtureB().GetBody().GetUserData().isDeleted = true;
    eventBus.emit('game', 'finish', {});
  }
};

MyListener.EndContact = contact => {
  // let A = contact.GetFixtureA().GetFilterData().categoryBits;
  // let B = contact.GetFixtureB().GetFilterData().categoryBits;
  // if (A == 0x0004 && B == 0x0002 || A == 0x0002 && B == 0x0004) {
  //     console.log("GOODBYE");
  // }

};

export default MyListener;
