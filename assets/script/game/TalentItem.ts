import { _decorator, Component, Label, Node } from 'cc';
import { Core } from '../core/Core';
import { ETalentType, Talent } from './Talent';
const { ccclass, property } = _decorator;

@ccclass('TalentItem')
export class TalentItem extends Component {
    @property(Node)
    icon: Node = null;
    @property(Node)
    nameLabel: Node = null;
    @property(Node)
    descriptionLabel: Node = null;
    private _talent: Talent;
    start() {
    }
    init(talent: Talent) {
        this._talent = talent;
        this.nameLabel.getComponent(Label).string = talent.getData().name;
        this.descriptionLabel.getComponent(Label).string = talent.getData().description;
    }

    update(deltaTime: number) {

    }
}


