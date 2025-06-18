import { _decorator, Component, Node } from 'cc';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    onStartGameButtonClick() {
        console.log("Start Game Button Clicked");
        Core.instance.playerData.exp++;
        Core.instance.event.emit(EGameEvent.CHANGE_DATA)
    }

    onSkillButtonClick() {
        console.log("Skill Button Clicked");
    }
    onTalentButtonClick() {
        console.log("Talent Button Clicked1");

        Core.instance.event.emit(EGameEvent.OPEN_TalentView);
        console.log("Talent Button Clicked");
    }
}


