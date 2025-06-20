import { _decorator, Component, Node } from 'cc';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
import { TalentItem } from './TalentItem';
import { ETalentType, Talent } from './Talent';
const { ccclass, property } = _decorator;

@ccclass('TalentView')
export class TalentView extends Component {
    @property(Node)
    PowerItem: Node = null!;
    @property(Node)
    DefenseItem: Node = null!;
    protected onEnable(): void {
        this.initTalants();
    }
    initTalants() {
        let talentMgr = Core.instance.playerData.talentManager;
        this.PowerItem.getComponent(TalentItem).init(talentMgr.talentList[ETalentType.POWER]);
        this.DefenseItem.getComponent(TalentItem).init(talentMgr.talentList[ETalentType.DEFENSE]);
    }
    onCloseClick() {
        this.node.active = false;
    }
    start() {

    }

    update(deltaTime: number) {

    }
}


