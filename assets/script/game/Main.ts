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
        this.onEndGame();
        Core.instance.event.on(EGameEvent.GAME_SAVE, this.onGameSave, this);


        Core.instance.playerData.loginTime = Date.now();
        Core.instance.event.emit(EGameEvent.GAME_SAVE);
    }
    protected onDisable(): void {
        Core.instance.event.off(EGameEvent.GAME_START, this.onStartGame, this);
        Core.instance.event.off(EGameEvent.GAME_END, this.onEndGame, this);
    }
    start() {

    }

    onStartGame() {
        //TODO
        this.nodeMenu.active = false;
        this.nodeBattle.active = true;
    }
    onEndGame() {
        //TODO
        this.nodeMenu.active = true;
        this.nodeBattle.active = false;
    }


    update(deltaTime: number) {

    }

    onGameSave() {
        Core.instance.save();
    }
}


