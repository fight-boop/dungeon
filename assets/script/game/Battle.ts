import { _decorator, Camera, Component, find, Node, Vec3 } from 'cc';
import { Context } from './Context';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
import { EJoystickEvent, Joystick } from './Joystick';
import { EPlayerState, Player } from './Player';
import { BattleCamera } from './BattleCamera';
const { ccclass, property } = _decorator;

@ccclass('Battle')
export class Battle extends Component {
    @property(Node)
    public joystick: Node = null!;
    @property(Node)
    public player: Node = null!;
    @property(Node)
    public BattleBg: Node = null!;

    private localPlayer: Player = null!;
    protected onLoad(): void {
        let battleCamera = find('Canvas/BattleCamera');
        battleCamera.getComponent(BattleCamera).targetNode = this.player;
        battleCamera.getComponent(BattleCamera).limitNode = this.BattleBg;
        this.localPlayer = this.player.getComponent(Player);
    }
    protected onEnable(): void {
        this.joystick.getComponent(Joystick).onJoystick((event: EJoystickEvent, direction?: Vec3) => {
            switch (event) {
                case EJoystickEvent.START:
                    console.log('Joystick Start');
                    this.localPlayer.setState(EPlayerState.WALK)
                    break;
                case EJoystickEvent.MOVE:
                    console.log('Joystick Move', direction);
                    this.localPlayer.setDirection(direction);
                    break;
                case EJoystickEvent.END:
                    this.localPlayer.setState(EPlayerState.IDLE)
                    break;
            }
        }, this)
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


