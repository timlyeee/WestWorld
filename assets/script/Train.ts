
import { _decorator, Component, Node, SpriteComponent, SpriteFrame, tween ,math, CCLoader } from 'cc';
import { Cargo } from './Cargo';
import { TrackNode } from './TrackNode';
import { UiManager } from './UiManager';
const { ccclass, property , type ,requireComponent} = _decorator;
enum direction {
    LEFTUP,
    UP,
    RIGHTUP,
    RIGHT,
    RIGHTDOWN,
    DOWN,
    LEFTDOWN,
    LEFT
}

@ccclass('Train')
@requireComponent(SpriteComponent)
export class Train extends Component {
    static speed = 3;
    move(){
        if(this.currentNode?.responeTrain(this)){
            if(this.backwardTrain){
                this.backwardTrain.move();
            }
        } else {
            UiManager.Instance?.OpenMenu();
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
    get spriteFrame(){
        return this.node.getComponent(SpriteComponent)!.spriteFrame
    }
    set spriteFrame(v){
        this.node.getComponent(SpriteComponent)!.spriteFrame = v;
    }
    @type(TrackNode)
    get currentNode(){
        return this._currentNode;
    };
    set currentNode(value){
        if(value){
            this._currentNode = value;
            const deltaVector = math.Vec3.add(new math.Vec3(), math.Vec3.negate(new math.Vec3(),this.node.worldPosition) , value.node.worldPosition)  
                if(deltaVector.x >0) {
                    this.spriteFrame = this.spriteFrameArray[direction.RIGHT]
                } else if (deltaVector.x < 0) {
                    this.spriteFrame = this.spriteFrameArray[direction.LEFT]
                } else if (deltaVector.y > 0 ) {
                    this.spriteFrame = this.spriteFrameArray[direction.UP]
                } else if (deltaVector.y < 0) {
                    this.spriteFrame = this.spriteFrameArray[direction.DOWN]
                }
            tween(this.node)
            .to(1/Train.speed,{
                worldPosition:value.node.worldPosition,
            })
            .start()
        }
    }
    @type([SpriteFrame])
    spriteFrameArray:SpriteFrame[] =[];
    @type(TrackNode)
    lastNode:TrackNode|null=null;
    times=0
    @type(Cargo)
    _cargo:Cargo|null=null;
    @type(Cargo)
    get cargo(){
        return this._cargo;
    }
    set cargo(value){
        if(value){
            this._cargo = value;
            const spriteFrame = value.spriteFrame;
            if(spriteFrame){
                this.corgeSprite!.spriteFrame = spriteFrame;
            }
        } else {
            this.corgeSprite!.spriteFrame = null
        }
    }
    init(trackNode:TrackNode){
        this._currentNode = trackNode;
        this.node.position = trackNode.node.position;
    }
    update(deltaTime:number){
        if(!this.forwardNode && UiManager.Instance?.isInScene){
            this.times += deltaTime;
            if(this.times >= 1/Train.speed +0.01){
                this.move();
                this.times = 0;
            }
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
