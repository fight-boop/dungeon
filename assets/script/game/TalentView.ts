import { _decorator, Component, Node } from 'cc';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
const { ccclass, property } = _decorator;

@ccclass('TalentView')
export class TalentView extends Component {
    @property(Node)
    PowerItem: Node = null!;
    @property(Node)
    DefenseItem: Node = null!;
    protected onEnable(): void {
    }
    onCloseClick() {
        this.node.active = false;
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


