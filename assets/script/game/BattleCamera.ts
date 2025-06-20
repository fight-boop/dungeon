import { _decorator, Component, Node, tween, Vec3 } from 'cc';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
const { ccclass, property } = _decorator;

@ccclass('BattleCamera')
export class BattleCamera extends Component {
    @property(Node)
    public target: Node = null!;

    private _isShaking: boolean = false;
    start() {
        Core.instance.event.on(EGameEvent.GAME_SHARK, this.onShake, this);
    }

    /**屏幕震动 */
    onShake() {
        if (this._isShaking) return;
        this._isShaking = true;
        const shakeTimes = 5; // 震动次数
        const shakeMagnitude = 50; // 震动幅度
        const originalPosition = this.node.position.clone();
        tween(this.node)
            .repeat(
                shakeTimes, // 震动次数
                tween(this.node)
                    .set({ position: originalPosition.add(new Vec3(Math.random() * shakeMagnitude, Math.random() * shakeMagnitude, 0)) })
                    .delay(0.05)
            )
            .call(() => {
                this.node.setPosition(originalPosition);
                this._isShaking = false;
            })
            .start();
    }

    update(deltaTime: number) {
        this.node.setPosition(this.target.position);
    }
}


