
import { _decorator, Component, Node, JsonAsset, SpriteFrame, Sprite, Vec3, Layers, CCInteger, Prefab, instantiate } from 'cc';
import { TrackNode } from './TrackNode';
const { ccclass, property, type } = _decorator;

declare class LevelConfiguration extends JsonAsset {
    json: {
        tile: Array<Array<number>>;
    }
}

const uiLayer = 1 << 25;

@ccclass('LevelGenerated')
export class LevelGenerater extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @type(CCInteger)
    public levelIndex = 0;

    @type(JsonAsset)
    public levelConfigurations: LevelConfiguration[] = [];

    @type([SpriteFrame])
    public trackSpriteFrames: SpriteFrame[] = [];

    @type(Prefab)
    public trackPrefab: Prefab | null = null;

    start(){
        this.loadScene(this.levelIndex);
    }

    loadScene (index : number) {
        this.levelIndex = index;
        const tile = this.levelConfigurations[index].json.tile;
        const firstColumn = tile[0];
        const columnNumber = firstColumn.length;
        const rowNumber = tile.length;
        for (let i = 0; i < rowNumber; i++) {
            for (let j = 0; j < columnNumber; ++j) {
                if (tile[i][j] !== 0) {
                    const track = instantiate(this.trackPrefab!);
                    track.getComponent(TrackNode)!.spriteFrame = this.trackSpriteFrames[tile[i][j] - 1];
                    track.setParent(this.node);
                    track.layer = uiLayer;
                    track.position = new Vec3((j - columnNumber / 2) * 40 + 20, (i - rowNumber / 2) * 40 + 20, 0 );
                }
            }
        }
        
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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
