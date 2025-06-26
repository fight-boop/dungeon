import { _decorator, Component, EventTouch, Node, UITransform, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

const tempVec2 = new Vec2();
const tempVec3 = new Vec3();
const tempPos = new Vec3();
const finalVector = new Vec3();

export enum EJoystickEvent {
    START = 'joystick_start',
    MOVE = 'joystick_move',
    END = 'joystick_end',
}
@ccclass('Joystick')
export class Joystick extends Component {
    @property(Node)
    Panel: Node = null!;
    @property(Node)
    Handle: Node = null!;

    private maxSquaredDistance: number = 0;
    private maxDistance: number = 0;
    private _UITransform: UITransform = null!;
    private _isTouching: boolean = false;
    private _onJoystick: (event: EJoystickEvent, direction?: Vec3) => void = null!;
    private _target: any;
    public get isTouching(): boolean {
        return this._isTouching;
    }
    public set isTouching(value: boolean) {
        this._isTouching = value;
        this.Panel.active = value;
        this.Handle.active = value;
    }


    protected onLoad(): void {
        this._UITransform = this.node.getComponent(UITransform);
        this.maxDistance = this.Panel.getComponent(UITransform).contentSize.width / 2;
        this.maxSquaredDistance = Math.pow(this.maxDistance, 2);
    }
    protected onEnable(): void {
        this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
        this.isTouching = false;
    }
    protected onDisable(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchEnd, this);
    }
    onTouchStart(event: EventTouch) {
        this.isTouching = true;
        event.getUILocation(tempVec2);
        this._UITransform.convertToNodeSpaceAR(tempVec3.set(tempVec2.x, tempVec2.y, 0), tempPos);
        this.Panel.setPosition(tempPos);
        this.Handle.setPosition(tempPos);
        this._onJoystick?.call(this._target, EJoystickEvent.START);
    }
    /**频繁调用的地方 一定要优化*/
    onTouchMove(event: any) {
        event.getUILocation(tempVec2);
        this._UITransform.convertToNodeSpaceAR(tempVec3.set(tempVec2.x, tempVec2.y, 0), tempPos);
        // 计算Handle与Panel的距离
        const squaredDistance = Vec3.squaredDistance(this.Panel.position, tempPos);
        if (squaredDistance <= this.maxSquaredDistance) {
            this.Handle.setPosition(tempPos);
        } else {
            let rad = Math.atan2(tempPos.y - this.Panel.position.y, tempPos.x - this.Panel.position.x);
            tempPos.x = this.Panel.position.x + Math.cos(rad) * this.maxDistance;
            tempPos.y = this.Panel.position.y + Math.sin(rad) * this.maxDistance;
            this.Handle.setPosition(tempPos);
        }
        finalVector.set(tempPos.x - this.Panel.position.x, tempPos.y - this.Panel.position.y, 0);
        this._onJoystick?.call(this._target, EJoystickEvent.MOVE, finalVector);
    }
    onTouchEnd() {
        this.isTouching = false;
        this._onJoystick?.call(this._target, EJoystickEvent.END);
    }



    start() {

    }

    update(deltaTime: number) {

    }
    onJoystick(onJoystick: (event: EJoystickEvent, direction?: Vec3) => void, target?: any) {
        this._onJoystick = onJoystick;
        this._target = target;
    }
}


