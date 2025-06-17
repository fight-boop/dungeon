import { _decorator, Component, director, Node } from 'cc';
import { Core } from '../core/Core';
const { ccclass, property } = _decorator;

@ccclass('Start')
export class Start extends Component {
    start() {
        //TODO 
        Core.instance.init(() => {
            Core.instance.playerData.loginTime = Date.now();
            Core.instance.save();
            director.loadScene('Main');
        });
    }

    update(deltaTime: number) {

    }
}


