
import { _decorator, Component, Node, SpriteComponent, SpriteFrame } from 'cc';
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
            this.node.position = value.node.position
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
            const spriteFrame = this.spriteFrameArray.find((frame,index)=>{ index +1 === value.type});
            if(spriteFrame){
                this.getComponent(SpriteComponent)!.spriteFrame = spriteFrame;
            }
        } else {
            const spriteFrame = this.spriteFrameArray[0];
            this.getComponent(SpriteComponent)!.spriteFrame = spriteFrame;
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
