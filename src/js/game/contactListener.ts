import {b2ContactImpulse, b2ContactListener} from 'box2d.ts/Box2D/Box2D/Dynamics/b2WorldCallbacks';
import eventBus from './eventBus';
import {BucketBody, CircleBody, KeyBodies} from './body';
import {b2Contact} from 'box2d.ts/Box2D/Box2D/Dynamics/Contacts/b2Contact';
import {b2Manifold} from 'box2d.ts/Box2D/Box2D/Collision/b2Collision';
import {Game} from './gameLogic/game';
import {InitState} from './gameLogic/gameState';

// let MyListener = new b2ContactListener();

export class MyListener extends b2ContactListener {
    public _game: Game;

    constructor(game: Game) {
        super();
        this._game = game;
    }

    BeginContact(contact: b2Contact) {
        let bodyA = contact.GetFixtureA().GetBody().GetUserData();
        let bodyB = contact.GetFixtureB().GetBody().GetUserData();
        let A = contact.GetFixtureA().GetFilterData().categoryBits;
        let B = contact.GetFixtureB().GetFilterData().categoryBits;
        if (A === KeyBodies.KEY_BODY_1 && B === KeyBodies.KEY_BODY_1) {
            console.log('HELLO');
            if (contact.GetFixtureA().GetBody().GetUserData() instanceof CircleBody) {
                bodyA.isDeleted = true;
                // bodyA.body.SetActive(false);
                // bodyA.body.GetWorld().DestroyBody(bodyA);
                // this._game.changeState(new InitState(this._game));
            } else {
                bodyB.isDeleted = true;
                // bodyB.body.SetActive(false);
                // bodyB.body.GetWorld().DestroyBody(bodyB);
                // this._game.changeState(new InitState(this._game));
            }
            eventBus.emit('game', 'finish', {});
        }
    }

    PreSolve(contact: b2Contact, oldManifold: b2Manifold) {

    }

    PostSolve(contact: b2Contact, oldManifold: b2ContactImpulse) {

    }

    EndContact(contact: b2Contact) {

    }
}


// MyListener.PreSolve = (contact: b2Contact, oldManifold: b2Manifold) => {
    // let bodyA = contact.GetFixtureA().GetBody().GetUserData();
    // let bodyB = contact.GetFixtureB().GetBody().GetUserData();
    // let A = contact.GetFixtureA().GetFilterData().categoryBits;
    // let B = contact.GetFixtureB().GetFilterData().categoryBits;
    // if (A === KeyBodies.KEY_BODY_1 && B === KeyBodies.KEY_BODY_1) {
    //     console.log('HELLO');
    //     if (contact.GetFixtureA().GetBody().GetUserData() instanceof CircleBody) {
    //         bodyA.isDeleted = true;
    //         bodyA.body.SetActive(false);
    //         bodyA.body.GetWorld().DestroyBody(bodyA);
    //     } else {
    //         bodyB.isDeleted = true;
    //         bodyB.body.SetActive(false);
    //         bodyB.body.GetWorld().DestroyBody(bodyB);
    //     }
    //     // eventBus.emit('game', 'finish', {});
    // }
// };

// MyListener.BeginContact = (contact) => {
//     let bodyA = contact.GetFixtureA().GetBody().GetUserData();
//     let bodyB = contact.GetFixtureB().GetBody().GetUserData();
//     let A = contact.GetFixtureA().GetFilterData().categoryBits;
//     let B = contact.GetFixtureB().GetFilterData().categoryBits;
//     if (A === KeyBodies.KEY_BODY_1 && B === KeyBodies.KEY_BODY_1) {
//         console.log('HELLO');
//         if (contact.GetFixtureA().GetBody().GetUserData() instanceof CircleBody) {
//             bodyA.isDeleted = true;
//             bodyA.body.SetActive(false);
//             bodyA.body.GetWorld().DestroyBody(bodyA);
//         } else {
//             bodyB.isDeleted = true;
//             bodyB.body.SetActive(false);
//             bodyB.body.GetWorld().DestroyBody(bodyB);
//         }
//         eventBus.emit('game', 'finish', {});
//     }
// };
//
// MyListener.EndContact = contact => {
//     // let A = contact.GetFixtureA().GetFilterData().categoryBits;
//     // let B = contact.GetFixtureB().GetFilterData().categoryBits;
//     // if (A == 0x0004 && B == 0x0002 || A == 0x0002 && B == 0x0004) {
//     //     console.log("GOODBYE");
//     // }
//
// };

export default MyListener;
