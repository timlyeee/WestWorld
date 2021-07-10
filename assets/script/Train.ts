
import { _decorator, Component, Node, SpriteComponent, SpriteFrame, tween } from 'cc';
import { Cargo } from './Cargo';
import { TrackNode } from './TrackNode';
const { ccclass, property , type ,requireComponent} = _decorator;
@ccclass('Train')
@requireComponent(SpriteComponent)
export class Train extends Component {
    move(){
        this.currentNode?.responeTrain(this);
        if(this.backwardTrain){
            this.backwardTrain.move();
        }
    }
    get forwardTrain(){
        return this.forwardNode?.getComponent(Train)
    };
    get backwardTrain(){
        return this.backwardNode?.getComponent(Train)
    }
    @type(SpriteComponent)
    corgeSprite:SpriteComponent | null =null;
    @type(Node)
    forwardNode:Node|null = null;
    @type(Node)
    backwardNode:Node|null = null;
    @type(TrackNode)
    _currentNode:TrackNode|null =null;
    @type(TrackNode)
    get currentNode(){
        return this._currentNode;
    };
    set currentNode(value){
        if(value){
            this._currentNode = value;
            // 0 ~ 7 左上 上 右上 右 右下 下 左下 左  
            tween(this.node)
            .to(1,{
                worldPosition:value.node.worldPosition,
            })
            .start()
        }
    }
    @type([SpriteFrame])
    spriteFrameArray:SpriteFrame[] =[];
    @type(TrackNode)
    lastNode:TrackNode|null=null;
    @type(Cargo)
    _cargo:Cargo|null=null;
    @type(Cargo)
    get cargo(){
        return this._cargo;
    }
    set cargo(value){
        if(value){
            this._cargo = value;
            const spriteFrame = this.spriteFrameArray.find((frame,index)=>{ index +1 === value.type});
            if(spriteFrame){
                this.getComponent(SpriteComponent)!.spriteFrame = spriteFrame;
            }
        } else {
            const spriteFrame = this.spriteFrameArray[0];
            tween(this.corgeSprite!.node.worldPosition)
            .by(1,{y:20})
            .hide()
            this.getComponent(SpriteComponent)!.spriteFrame = spriteFrame;
        }
    }
    init(trackNode:TrackNode){
        this._currentNode = trackNode;
        this.node.position = trackNode.node.position;
    }
    onEnable(){
        this.node.on(Node.EventType.MOUSE_UP, this.move,this);
    }
    onDisable(){
        this.node.off(Node.EventType.MOUSE_UP, this.move,this);
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
