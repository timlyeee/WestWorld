
import { _decorator, Component, Node, Sprite, Canvas, Prefab, instantiate, math, Vec3,Animation } from 'cc';
const { ccclass, property, type } = _decorator;




const uiLayer = 1 << 25;
@ccclass('AddRandomDecorator')
export class AddRandomDecorator extends Component {


    @property(Canvas)
    public GameCanvas: Canvas | null = null;

    public AllNodes: Node[] = [];

    @property(Prefab)
    public GrassModel: Prefab[] = [];

    start() {
        this.addRandomGrass(0);
        this.addRandomGrass(1);
    }

    addRandomGrass(grassIndex: number) {
        for (var i = 0; i < 15; i++) {
            const bush = instantiate(this.GrassModel[grassIndex]);
            bush.name = `Bush ${i}`;
            this.AllNodes.push(bush);
            bush.setParent(this.node);
            bush.setPosition(new Vec3(math.random() * 960, math.random() * 640, 0));
            bush.layer = uiLayer;
        }

    }
    
    
    clear() {
        for (var deco of this.AllNodes) {
            deco.destroy();
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
