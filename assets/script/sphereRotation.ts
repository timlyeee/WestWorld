
import { _decorator, Component, Node, SphereCollider, math, quat, tiledLayerAssembler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Rotation')
export class Rotation extends Component {
    public rotates: math.Quat | null = null;
    public timer:number=0;
    start () {
        this.rotates = new math.Quat(0,0.1,1,0);
    }
    update() {
        this.timer ++;
        if(this.timer == 10){
            this.timer =0;
            this.node.parent?.rotate(this.rotates!);
        }
    }
    
    
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */
