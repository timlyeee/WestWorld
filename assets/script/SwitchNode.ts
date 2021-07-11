
import { _decorator, Component, Node, CCInteger, SpriteFrame, SpriteComponent, AudioSource } from 'cc';
import { TrackNode } from './TrackNode';
import { Train } from './Train';
const { ccclass, property , type,requireComponent } = _decorator;

@ccclass('SwitchNode')
@requireComponent(SpriteComponent)
export class SwitchNode extends TrackNode {
    public audioEffect: AudioSource | null = null;
    @type([Node])
    switchList:Node[]=[];
    @type([SpriteFrame])
    spriteFrameArray:SpriteFrame[] = [];
    @type(CCInteger)
    _currentIndex=0;
    @type(CCInteger)
    get currentIndex(){return this._currentIndex}
    set currentIndex(index){this._currentIndex = index, this.linkedNodes = this.switchList.slice(2 *this._currentIndex,2 *(this._currentIndex +1))}
    switch(event:Event){
        if(!this.hasTrain){
            this.audioEffect?.playOneShot(this.audioEffect!.clip!);
            this.disconnect();
            this.currentIndex ++;
            this.currentIndex %= this.switchList.length/2;
            this.spriteFrame = this.spriteFrameArray[this.currentIndex];
            this.reconnect();
        }
    }
    disconnect(){
        this.linkedNodes.map(node=>{node.getComponent(TrackNode)!.linkedNodes = node.getComponent(TrackNode)!.linkedNodes.filter(trackNode => trackNode!=this.node)});
    }
    connect(){
        this.linkedNodes.map(node=>{node.getComponent(TrackNode)?.linkedNodes.push(this.node)}); 
    }
    reconnect(){
        this.disconnect();
        this.connect();
    }
    start(){
        this.audioEffect = this.getComponent(AudioSource);
        this.spriteFrame = this.spriteFrameArray[this.currentIndex];
        this.linkedNodes = this.switchList.slice(2 *this._currentIndex,2 *(this._currentIndex +1));
    }
    onEnable(){
        this.node.on(Node.EventType.MOUSE_UP, this.switch,this);
    }
    onDisable(){
        this.node.off(Node.EventType.MOUSE_UP, this.switch,this);
    }
}
