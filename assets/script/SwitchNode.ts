
import { _decorator, Component, Node, CCInteger, SpriteFrame, SpriteComponent } from 'cc';
import { TrackNode } from './TrackNode';
import { Train } from './Train';
const { ccclass, property , type,requireComponent } = _decorator;

@ccclass('SwitchNode')
@requireComponent(SpriteComponent)
export class SwitchNode extends TrackNode {
    @type([Node])
    switchList:Node[]=[];
    @type([SpriteFrame])
    spriteFrameArray:SpriteFrame[] = [];
    @type(CCInteger)
    currentIndex=0;
    switch(event:Event){
        if(!this.hasTrain){
            this.linkedNodes.map(node=>{node.getComponent(TrackNode)?.linkedNodes.filter(trackNode => trackNode!=this.node)});
            this.currentIndex ++;
            this.currentIndex %= this.switchList.length/2;
            this.spriteFrame = this.spriteFrameArray[this.currentIndex];
            this.linkedNodes.map(node=>{node.getComponent(TrackNode)?.linkedNodes.filter(trackNode => trackNode!=this.node)});
            this.linkedNodes.map(node=>{node.getComponent(TrackNode)?.linkedNodes.push(this.node)}); 
        }
    }
    @property({override:true})
    get linkedNodes(){
        return this.switchList.slice(2 *this.currentIndex,2 *(this.currentIndex +1))
    }
    onEnable(){
        this.node.on(Node.EventType.MOUSE_DOWN, this.switch,this);
    }
    onDisable(){
        this.node.off(Node.EventType.MOUSE_DOWN, this.switch,this);
    }
}
