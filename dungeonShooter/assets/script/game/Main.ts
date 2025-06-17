import { _decorator, Component, Node } from 'cc';
import { Core } from '../core/Core';
const { ccclass, property } = _decorator;

@ccclass('Main')
export class Main extends Component {
    @property(Node)
    nodeMenu: Node = null!;
    @property(Node)
    nodeBattle: Node = null!;

    start() {
        //TODO
        this.nodeMenu.active = true;
        this.nodeBattle.active = false;
        Core.instance.save();


    }


    update(deltaTime: number) {

    }
}


