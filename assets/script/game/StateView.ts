import { _decorator, Component, Label, Node } from 'cc';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
const { ccclass, property } = _decorator;

@ccclass('StateView')
export class StateView extends Component {
    @property(Node)
    labelAP: Node = null!;
    @property(Node)
    labelDP: Node = null!;
    @property(Node)
    labelHP: Node = null!;
    @property(Node)
    labelExp: Node = null!;

    protected onEnable(): void {
        Core.instance.event.on(EGameEvent.CHANGE_DATA, this.changePlayerData, this);
        this.bindPlayerData();
    }
    protected onDisable(): void {

    }
    start() {

    }

    update(deltaTime: number) {

    }

    private changePlayerData() {
        this.bindPlayerData();
    }

    bindPlayerData() {
        this.labelAP.getComponentInChildren(Label)!.string = `${Core.instance.playerData.ap}`;
        this.labelDP.getComponentInChildren(Label)!.string = `${Core.instance.playerData.dp}`;
        this.labelHP.getComponentInChildren(Label)!.string = `${Core.instance.playerData.hp}`;
        this.labelExp.getComponentInChildren(Label)!.string = `${Core.instance.playerData.exp}`;
    }

}


