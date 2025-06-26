import { _decorator, Component, Node, tween, UITransform, Vec3, view } from 'cc';
import { Core } from '../core/Core';
import { EGameEvent } from '../core/Config';
const { ccclass, property } = _decorator;

@ccclass('BattleCamera')
export class BattleCamera extends Component {
    targetNode: Node = null!;

    limitNode: Node = null!;
    private limitLeft: number = 0;
    private limitRight: number = 0;
    private limitTop: number = 0;
    private limitBottom: number = 0;
    protected onLoad(): void {
        // 方法2: 通过 view 获取设计分辨率
        const designSize = view.getDesignResolutionSize();
        console.log('Design Resolution Size:', designSize);
        this.limitLeft = this.limitNode.scale.x * this.limitNode.getComponent(UITransform).width / 2 - designSize.width / 2;
        this.limitRight = this.limitNode.scale.x * this.limitNode.getComponent(UITransform).width / 2 + designSize.width / 2;
        this.limitTop = this.limitNode.scale.y * this.limitNode.getComponent(UITransform).height / 2 + designSize.height / 2;
        this.limitBottom = this.limitNode.scale.y * this.limitNode.getComponent(UITransform).height / 2 - designSize.height / 2;
    }
    start() {

    }

    update(deltaTime: number) {
        if (!this.targetNode) { return; }
        // 限制摄像机移动范围
        this.node.setPosition(this.targetNode.position);
        if (this.node.x > this.limitRight) {
            this.node.x = this.limitRight;
        } else if (this.node.x < this.limitLeft) {
            this.node.x = this.limitLeft;
        }
        if (this.node.y > this.limitTop) {
            this.node.y = this.limitTop;
        } else if (this.node.y < this.limitBottom) {
            this.node.y = this.limitBottom;
        }
    }
}


