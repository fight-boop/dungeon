import { _decorator, Component, Node } from 'cc';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property(Node)
    nodeMenu: Node = null!;
    @property(Node)
    nodeBattle: Node = null!;

    protected onEnable(): void {
        Core.instance.event.on(EGameEvent.GAME_START, this.onStartGame, this);
        Core.instance.event.on(EGameEvent.GAME_END, this.onEndGame, this);
        this.onStartGame();
    }
    protected onDisable(): void {
        Core.instance.event.off(EGameEvent.GAME_START, this.onStartGame, this);
        Core.instance.event.off(EGameEvent.GAME_END, this.onEndGame, this);
    }
    start() {

    }

    onStartGame() {
        //TODO
        this.nodeMenu.active = true;
        this.nodeBattle.active = false;
    }
    onEndGame() {
        //TODO
        this.nodeMenu.active = false;
        this.nodeBattle.active = true;
    }


    update(deltaTime: number) {

    }
}


