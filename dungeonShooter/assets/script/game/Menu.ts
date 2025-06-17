import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {
    start() {

    }

    update(deltaTime: number) {

    }

    onStartGameButtonClick() {
        console.log("Start Game Button Clicked");
    }

    onSkillButtonClick() {
        console.log("Skill Button Clicked");
    }
    onTalentButtonClick() {
        console.log("Talent Button Clicked");
    }
}


