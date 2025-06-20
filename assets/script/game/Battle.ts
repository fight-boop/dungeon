import { _decorator, Camera, Component, Node } from 'cc';
import { Context } from './Context';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {
    @property(Node)
    public joystick: Node = null!;
    @property(Node)
    public player: Node = null!;
    protected onLoad(): void {
        this.schedule(() => {
            Core.instance.event.emit(EGameEvent.GAME_SHARK)
        }, 3)
    }
    protected onEnable(): void {
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


