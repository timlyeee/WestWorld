
import { _decorator, Component, Node, SpriteComponent, SpriteFrame } from 'cc';
import  {Train} from './Train';
const { ccclass, property,type,requireComponent} = _decorator;
@ccclass('TrackNode')
@requireComponent(SpriteComponent)
export class TrackNode extends Component {
    responeTrain(train:Train){
        train.lastNode = train.currentNode;
        // 不是头节点
        if(train.forwardTrain){
            train.currentNode = train.forwardTrain.lastNode;
        } else {
            train.currentNode = this.linkedNodes.find((node)=>{return node != train.backwardTrain?.currentNode?.node})?.getComponent(TrackNode) as TrackNode;
        }
    }
    @type([Node])
    linkedNodes:Node[]= [];
    @type(SpriteFrame)
    get spriteFrame(){
        return this.getComponent(SpriteComponent)!.spriteFrame;
    };
    set spriteFrame(value){
        this.getComponent(SpriteComponent)!.spriteFrame = value;
    }
}
