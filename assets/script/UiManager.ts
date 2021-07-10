
import { _decorator, Component, Node,Animation, Camera, Button, Canvas, Layout, EventHandler, Font} from 'cc';
import { LevelGenerater } from './level-generater';
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

    @property(Button)
    public levelButtons:Button[]=[];

    @property(Layout)
    public menuLayout: Layout|null = null;

    @property(Button)
    public menuButton: Button|null = null;

    public isUi:boolean = true;

    @property(Canvas)
    public levelCanvas:Canvas|null = null;

    public levelGenerater :LevelGenerater|null=null;
    start () {
        //const leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        this.isUi = true;
        this.rightAnim =  this.rightNodeToMove!.getComponent(Animation);
        this.leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        this.levelGenerater = this.levelCanvas!.getComponent(LevelGenerater);
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
    }   
    
    //饶了，不然有bug
    changeLevel1( ){
        this.levelGenerater?.clear();
        this.levelGenerater!.loadScene(0);
        this.openScene();
        const buttonAnimation = this.levelButtons[0].getComponent(Animation);
        buttonAnimation?.play("1Lv1");
        this.levelButtons[1].getComponent(Animation)?.play("2Lvn");
        this.levelButtons[2].getComponent(Animation)?.play("3Lvn");
        this.levelButtons[3].getComponent(Animation)?.play("4Lvn");
    }
    changeLevel2( ){
        this.levelGenerater?.clear();
        this.levelGenerater!.loadScene(1);
        this.openScene();
        const buttonAnimation = this.levelButtons[1].getComponent(Animation);
        buttonAnimation?.play("2Lv2");
        this.levelButtons[0].getComponent(Animation)?.play("1Lvn");
        this.levelButtons[2].getComponent(Animation)?.play("3Lvn");
        this.levelButtons[3].getComponent(Animation)?.play("4Lvn");
    }changeLevel3( ){
        this.levelGenerater?.clear();
        this.levelGenerater!.loadScene(2);
        this.openScene();
        const buttonAnimation = this.levelButtons[2].getComponent(Animation);
        buttonAnimation?.play("3Lv3");
        this.levelButtons[1].getComponent(Animation)?.play("2Lvn");
        this.levelButtons[0].getComponent(Animation)?.play("1Lvn");
        this.levelButtons[3].getComponent(Animation)?.play("4Lvn");
    }changeLevel4( ){
        this.levelGenerater?.clear();
        this.levelGenerater!.loadScene(3);
        this.openScene();
        const buttonAnimation = this.levelButtons[3].getComponent(Animation);
        buttonAnimation?.play("4Lv4");
        this.levelButtons[1].getComponent(Animation)?.play("2Lvn");
        this.levelButtons[2].getComponent(Animation)?.play("3Lvn");
        this.levelButtons[0].getComponent(Animation)?.play("1Lvn");
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
