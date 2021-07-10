
import { _decorator, Component, Node, SpriteComponent, SpriteFrame, tween ,math, CCLoader } from 'cc';
import { Cargo } from './Cargo';
import { TrackNode } from './TrackNode';
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
    get spriteFrame(){
        return this.node.getComponent(SpriteComponent)!.spriteFrame
    }
    set spriteFrame(v){
        this.node.getComponent(SpriteComponent)!.spriteFrame = v;
    }
    lastDeltaVector:math.Vec3 = math.v3();
    @type(TrackNode)
    get currentNode(){
        return this._currentNode;
    };
    set currentNode(value){
        if(value){
            this._currentNode = value;
            const deltaVector = math.Vec3.add(new math.Vec3(), math.Vec3.negate(new math.Vec3(),this.node.worldPosition) , value.node.worldPosition)  
            if(deltaVector.x < -1){
                if(this.lastDeltaVector.y > 0){
                    this.spriteFrame = this.spriteFrameArray[direction.LEFTUP]
                } else if(this.lastDeltaVector.y < 0){
                    this.spriteFrame = this.spriteFrameArray[direction.LEFTDOWN]
                } else {
                    this.spriteFrame = this.spriteFrameArray[direction.LEFT]
                }
            } else if (deltaVector.x > 1) {
                if(this.lastDeltaVector.y > 0){
                    this.spriteFrame = this.spriteFrameArray[direction.RIGHTUP]
                } else if(this.lastDeltaVector.y < 0){
                    this.spriteFrame = this.spriteFrameArray[direction.RIGHTDOWN]
                } else {
                    this.spriteFrame = this.spriteFrameArray[direction.RIGHT]
                }
            } else if (deltaVector.y < -1) {
                if(this.lastDeltaVector.x > 0){
                    this.spriteFrame = this.spriteFrameArray[direction.RIGHTDOWN]
                } else if(this.lastDeltaVector.x < 0){
                    this.spriteFrame = this.spriteFrameArray[direction.LEFTDOWN]
                } else {
                    this.spriteFrame = this.spriteFrameArray[direction.DOWN]
                }
            } else if (deltaVector.y > 1) {
                if(this.lastDeltaVector.x > 0){
                    this.spriteFrame = this.spriteFrameArray[direction.RIGHTUP]
                } else if(this.lastDeltaVector.x < 0){
                    this.spriteFrame = this.spriteFrameArray[direction.LEFTUP]
                } else {
                    this.spriteFrame = this.spriteFrameArray[direction.UP]
                }
            }
            tween(this.node)
            .to(1,{
                worldPosition:value.node.worldPosition,
            })
            .call(()=>{
                this.lastDeltaVector = deltaVector;
                if(deltaVector.x >0) {
                    this.spriteFrame = this.spriteFrameArray[direction.RIGHT]
                } else if (deltaVector.x < 0) {
                    this.spriteFrame = this.spriteFrameArray[direction.LEFT]
                } else if (deltaVector.y > 0 ) {
                    this.spriteFrame = this.spriteFrameArray[direction.UP]
                } else if (deltaVector.y < 0) {
                    this.spriteFrame = this.spriteFrameArray[direction.DOWN]
                }
            })
            .start()
        }
    }
    @type([SpriteFrame])
    spriteFrameArray:SpriteFrame[] =[];
    @type([SpriteFrame])
    cargoSpriteFrameArray:SpriteFrame[] =[];
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
            const spriteFrame = this.cargoSpriteFrameArray[value.type];
            if(spriteFrame){
                this.corgeSprite!.spriteFrame = spriteFrame;
                this.corgeSprite!.visibility = 255;
            }
        } else {
            this.corgeSprite!.visibility = 0;
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
