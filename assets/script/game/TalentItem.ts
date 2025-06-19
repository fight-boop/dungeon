import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TalentItem')
export class TalentItem extends Component {
    @property(Node)
    icon: Node = null;
    @property(Node)
    nameLabel: Node = null;
    @property(Node)
    descriptionLabel: Node = null;
    start() {

    }

    update(deltaTime: number) {

    }
}


