
import { _decorator, Component, Node,Animation, Camera, Button, Canvas, Layout, EventHandler, Font, BlockInputEvents, game, Label} from 'cc';
import { LevelGenerater } from './level-generater';
import { Reposition } from './reposition';
const { ccclass, property } = _decorator;

@ccclass('UiManager')
export class UiManager extends Component {
    static Instance : UiManager | null = null;
    @property(Node)
    public leftNodeToMove:Node | null = null;
    @property(Node)
    public rightNodeToMove:Node | null = null;
    @property(Camera)
    public moveInOutCamera:Camera | null = null;

    private leftAnim :Animation|null = null;
    private rightAnim :Animation|null = null;

    public currentFunctionCall: Function = this.changeLevel1;

    @property(Button)
    public levelButtons:Button[]=[];

    @property(Layout)
    public menuLayout: Layout|null = null;

    @property(Button)
    public menuButton: Button|null = null;

    public isInScene:boolean = false;

    @property(Canvas)
    public levelCanvas:Canvas|null = null;

    @property(Node)
    public BlockNode:Node|null = null;

    public levelGenerater :LevelGenerater|null=null;

    @property(Label)
    public infoLabel: Label|null  =null;
    start () {
        UiManager.Instance = this;
        //const leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        this.isInScene = false;
        this.rightAnim =  this.rightNodeToMove!.getComponent(Animation);
        this.leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        this.levelGenerater = this.levelCanvas!.getComponent(LevelGenerater);
        this.rightAnim =  this.rightNodeToMove!.getComponent(Animation);
        this.leftAnim =  this.leftNodeToMove!.getComponent(Animation);
        for(var b of this.levelButtons){
            b.addComponent(Reposition);
        }
        for(var v of this.leftNodeToMove!.children)
        {
            v.addComponent(Reposition);
        }
        for(var v of this.rightNodeToMove!.children)
        {
            v.addComponent(Reposition);
        }


    }
    openScene(){
        
        this.leftAnim!.play();
        this.rightAnim!.play();
        this.menuButton!.node.active = true;
        this.isInScene=true;
        this.BlockNode!.active=false;
    }
    //Pause
    OpenMenu(info: string="Pause"){
        this.infoLabel!.string = info;
        this.menuLayout!.node.active = true;
        this.BlockNode!.active=true;
        //todo: stop train move
        
    }
    //
    continue(){
        this.menuLayout!.node.active = false;
        this.BlockNode!.active=false;
    }
    goHome(){
        this.rightAnim!.getState("RightMove").speed = -1;
        this.rightAnim!.play();
        this.rightAnim!.once(Animation.EventType.FINISHED,()=>{
            this.rightAnim!.getState("RightMove").speed = 1;
        })
        this.leftAnim!.getState("MoveToLeft").speed = -1;
        this.leftAnim!.play();
        this.leftAnim!.once(Animation.EventType.FINISHED,()=>{
            this.leftAnim!.getState("MoveToLeft").speed = 1;
        })
        for(var i =0;i<4;i++){
            this.levelButtons[i].getComponent(Animation)?.play();
        }

        this.menuLayout!.node.active=false;
        this.BlockNode!.active=true;
        this.isInScene = false;
    }   
    
    //饶了，不然有bug
    changeLevel1( ){
        // if(this.currentFunctionCall !=this.changeLevel1 )
        //     this.currentFunctionCall = this.changeLevel1;
        this.levelGenerater?.clear();
        this.levelGenerater!.loadScene(0);
        
        if(!this.isInScene){
        const buttonAnimation = this.levelButtons[0].getComponent(Animation);
        buttonAnimation?.play("1Lv1");
        this.levelButtons[1].getComponent(Animation)?.play("2Lvn");
        this.levelButtons[2].getComponent(Animation)?.play("3Lvn");
        this.levelButtons[3].getComponent(Animation)?.play("4Lvn");}
        this.openScene();
    }
    changeLevel2( ){
        if(this.currentFunctionCall !=this.changeLevel2 )
            this.currentFunctionCall = this.changeLevel2;
        this.levelGenerater?.clear();
        this.levelGenerater!.loadScene(1);
        
        if(!this.isInScene){
        const buttonAnimation = this.levelButtons[1].getComponent(Animation);
        buttonAnimation?.play("2Lv2");
        this.levelButtons[0].getComponent(Animation)?.play("1Lvn");
        this.levelButtons[2].getComponent(Animation)?.play("3Lvn");
        this.levelButtons[3].getComponent(Animation)?.play("4Lvn");}
        this.openScene();
    }changeLevel3( ){
        if(this.currentFunctionCall !=this.changeLevel3 )
            this.currentFunctionCall = this.changeLevel3;
        this.levelGenerater?.clear();
        this.levelGenerater!.loadScene(2);
        
        if(!this.isInScene){
        const buttonAnimation = this.levelButtons[2].getComponent(Animation);
        buttonAnimation?.play("3Lv3");
        this.levelButtons[1].getComponent(Animation)?.play("2Lvn");
        this.levelButtons[0].getComponent(Animation)?.play("1Lvn");
        this.levelButtons[3].getComponent(Animation)?.play("4Lvn");}
        this.openScene();
    }changeLevel4( ){
        if(this.currentFunctionCall !=this.changeLevel4 )
            this.currentFunctionCall = this.changeLevel4;
        this.levelGenerater?.clear();
        this.levelGenerater!.loadScene(3);
        
        if(!this.isInScene){
        const buttonAnimation = this.levelButtons[3].getComponent(Animation);
        buttonAnimation?.play("4Lv4");
        this.levelButtons[1].getComponent(Animation)?.play("2Lvn");
        this.levelButtons[2].getComponent(Animation)?.play("3Lvn");
        this.levelButtons[0].getComponent(Animation)?.play("1Lvn");}
        this.openScene();
    }

    restart(){
        this.currentFunctionCall();
        this.continue();
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
