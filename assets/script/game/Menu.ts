import { _decorator, Component, Node } from 'cc';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {
    @property(Node)
    talentView: Node = null!;
    protected onEnable(): void {
        this.talentView.active = false;
    }
    start() {
    }

    update(deltaTime: number) {

    }

    onStartGameButtonClick() {
        Core.instance.event.emit(EGameEvent.GAME_START);
    }

    onSkillButtonClick() {
        console.log("Skill Button Clicked");
    }
    onTalentButtonClick() {
        this.talentView.active = true;
    }
}


