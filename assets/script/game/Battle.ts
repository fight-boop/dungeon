import { _decorator, Camera, Component, Node, Vec3 } from 'cc';
import { Context } from './Context';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
import { EJoystickEvent, Joystick } from './Joystick';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {
    @property(Node)
    public joystick: Node = null!;
    @property(Node)
    public player: Node = null!;
    protected onLoad(): void {

    }
    protected onEnable(): void {
        this.joystick.getComponent(Joystick).onJoystick((event: EJoystickEvent, direction?: Vec3) => {
            switch (event) {
                case EJoystickEvent.START:
                    console.log('Joystick started');
                    break;
                case EJoystickEvent.MOVE:
                    console.log('Joystick moved', direction);
                    break;
                case EJoystickEvent.END:
                    console.log('Joystick ended');
                    break;
            }
        }, this)
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


