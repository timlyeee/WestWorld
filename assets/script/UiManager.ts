
import { _decorator, Component, Node,Animation, Camera} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UiManager')
export class UiManager extends Component {
    @property(Node)
    public leftNodeToMove:Node | null = null;
    @property(Node)
    public rightNodeToMove:Node | null = null;
    @property(Camera)
    public moveInOutCamera:Camera | null = null;

    private leftAnim :Animation|null = null;
    private rightAnim :Animation|null = null;
    private moveInAnim: Animation|null = null;
    start () {
        //const leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        
        this.moveInAnim = this.moveInOutCamera!.getComponent(Animation);
    }
    openScene(){
        
        this.rightAnim =  this.rightNodeToMove!.getComponent(Animation);
        this.leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        console.log("open scene");
        this.leftAnim!.play();
        this.rightAnim!.play();
        this.moveInAnim!.play();
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
