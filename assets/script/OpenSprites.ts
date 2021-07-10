
import { _decorator, Component, Node, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OpenSprites')
export class OpenSprites extends Component {
    @property(Sprite)
    public s1: Sprite|null = null;
    @property(Sprite)
    public s2: Sprite|null = null;
    @property(Sprite)
    public s3: Sprite|null = null;
    @property(Sprite)
    public s4: Sprite|null = null;
    @property(Sprite)
    public s5: Sprite|null = null;
    @property(Sprite)
    public s6: Sprite|null = null;
    @property(Sprite)
    public s7: Sprite|null = null;
    
    start () {
            
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
