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
        let data = Core.instance.playerData;
        this.labelAP.getComponentInChildren(Label)!.string = `${data.ap}`;
        this.labelDP.getComponentInChildren(Label)!.string = `${data.dp}`;
        this.labelHP.getComponentInChildren(Label)!.string = `${data.hp}`;
        this.labelExp.getComponentInChildren(Label)!.string = `${data.exp}`;
    }

}


