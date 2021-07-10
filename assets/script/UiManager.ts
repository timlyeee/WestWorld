
import { _decorator, Component, Node,Animation, Camera, Button, Canvas, Layout} from 'cc';
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


    @property(Layout)
    public menuLayout: Layout|null = null;

    @property(Button)
    public menuButton: Button|null = null;

    public isUi:boolean = true;

    start () {
        //const leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        this.isUi = true;
        this.rightAnim =  this.rightNodeToMove!.getComponent(Animation);
        this.leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        window.onclick=(event)=>{
            if(this.isUi){
                this.openScene();
                this.isUi=false;
            }
                
        };
    }
    openScene(){
        
        this.rightAnim =  this.rightNodeToMove!.getComponent(Animation);
        this.leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        console.log("open scene");
        this.leftAnim!.play();
        this.rightAnim!.play();
        this.menuButton!.node.active = true;
    }
    OpenMenu(){
        this.menuLayout!.node.active = true;

    }
    continue(){
        this.menuLayout!.node.active = false;
    }
    goHome(){
        this.menuButton!.node.active = false;
        this.le
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
