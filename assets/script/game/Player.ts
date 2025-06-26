import { _decorator, Animation, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;


export enum EPlayerState {
    IDLE = 'idle',
    WALK = 'walk',
}
@ccclass('Player')
export class Player extends Component {
    @property(Node)
    animationNode: Node = null!;

    private _speed: number = 3;
    private _direction: Vec3 = new Vec3();
    private _animation: Animation = null!;
    private _isMoving: boolean = false;
    protected onLoad(): void {
        this._animation = this.animationNode.getComponent(Animation);
    }
    start() {

    }

    update(deltaTime: number) {
        if (!this._isMoving) {
            return;
        }
        this.node.setPosition(
            this.node.position.add(
                this._direction.multiplyScalar(this._speed * deltaTime)
            )
        );

    }

    setState(state: EPlayerState, direction: Vec3 = new Vec3()) {
        switch (state) {
            case EPlayerState.IDLE:
                this._isMoving = false;
                this._animation.play('idle');
                break;
            case EPlayerState.WALK:
                this._isMoving = true;
                this._direction = direction.normalize(); // 确保方向向量是单位向量
                this._animation.play('walk');
                break;
            default:
                console.warn(`Unknown player state: ${state}`);
                break;
        }
    }
}


