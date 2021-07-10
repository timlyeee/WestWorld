
import { _decorator, Component, Node, CCInteger, SpriteFrame, SpriteComponent } from 'cc';
import { TrackNode } from './TrackNode';
const { ccclass, property , type,requireComponent } = _decorator;

@ccclass('SwitchNode')
@requireComponent(SpriteComponent)
export class SwitchNode extends TrackNode {
    @type([TrackNode])
    switchList:TrackNode[]=[];
    @type([SpriteFrame])
    spriteFrameArray:SpriteFrame[] = [];
    @type(CCInteger)
    currentIndex=0;
    @type(TrackNode)
    currentTrackNode:TrackNode|null = null;
    switch(event:Event){
        this.currentIndex ++;
        this.currentIndex %= this.switchList.length;
        this.currentTrackNode = this.switchList[this.currentIndex];
        this.spriteFrame = this.spriteFrameArray[this.currentIndex];
        this.linkedNodes = this.switchList.slice(2 *this.currentIndex,2 *(this.currentIndex +1))
    }
    onEnable(){
        this.node.on(Node.EventType.MOUSE_DOWN, this.switch);
    }
    onDisable(){
        this.node.off(Node.EventType.MOUSE_DOWN, this.switch);
    }
}
