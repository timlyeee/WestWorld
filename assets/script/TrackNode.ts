
import { _decorator, Component, Node, SpriteComponent, SpriteFrame } from 'cc';
import  {Train} from './Train';
const { ccclass, property,type,requireComponent} = _decorator;
@ccclass('TrackNode')
@requireComponent(SpriteComponent)
export class TrackNode extends Component {
    responeTrain(train:Train){
        train.lastNode = train.currentNode;
        this.hasTrain = true;
        // 不是头节点
        if(train.forwardTrain){
            train.currentNode = train.forwardTrain.lastNode;
        } else {
            train.currentNode = this.linkedNodes.find((node)=>{return node != train.backwardTrain?.currentNode?.node})?.getComponent(TrackNode) as TrackNode;
        }
        // 如果是尾节点认为当前节点不存在火车
        if(!train.backwardNode){    
            this.hasTrain = false;
        }
    }
    @type([Node])
    _linkedNodes:Node[]= [];
    @property
    hasTrain :boolean = false;
    @type([Node])
    get linkedNodes(){
        return this._linkedNodes;
    }
    set linkedNodes(v){
        this._linkedNodes = v;
    }
    @type(SpriteFrame)
    get spriteFrame(){
        return this.getComponent(SpriteComponent)!.spriteFrame;
    };
    set spriteFrame(value){
        this.getComponent(SpriteComponent)!.spriteFrame = value;
    }
}
