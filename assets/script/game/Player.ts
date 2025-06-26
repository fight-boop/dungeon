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

    private _speed: number = 100;
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
            this.node.position.x + this._direction.x * this._speed * deltaTime,
            this.node.position.y + this._direction.y * this._speed * deltaTime,
        );
        if (this._direction.x >= 0) {
            this.node.setScale(1, 1)
        } else {
            this.node.setScale(-1, 1);
        }
    }

    setDirection(direction: Vec3) {
        this._direction = direction.normalize(); // 确保方向向量是单位向
    }

    setState(state: EPlayerState, direction: Vec3 = new Vec3()) {
        switch (state) {
            case EPlayerState.IDLE:
                this._isMoving = false;
                this._animation.play('PlayerIdle');
                break;
            case EPlayerState.WALK:
                this._isMoving = true;
                this._direction = direction.normalize(); // 确保方向向量是单位向量
                this._animation.play('PlayerWalk');
                break;
            default:
                console.warn(`Unknown player state: ${state}`);
                break;
        }
    }
}


