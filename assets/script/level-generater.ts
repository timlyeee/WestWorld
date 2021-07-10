
import { _decorator, Component, Node, JsonAsset, SpriteFrame, Sprite, Vec3, Layers, CCInteger, Prefab, instantiate } from 'cc';
import { SwitchNode } from './SwitchNode';
import { TrackNode } from './TrackNode';
const { ccclass, property, type } = _decorator;

declare class LevelConfiguration extends JsonAsset {
    json: {
        tile: Array<Array<number>>; 
        switchers: Record<number, { options: number[], default: number }>;
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
    @type(Prefab)
    public switcherPrefab: Prefab | null = null;

    public tileSize: number = 40;

    public trackMatrix: Array<Array<TrackNode | null>> = [];

    start () {
        const configurations = this.levelConfigurations[this.levelIndex].json;
        const tile = this.levelConfigurations[this.levelIndex].json.tile;
        const firstColumn = tile[0];
        const columnNumber = firstColumn.length;
        const rowNumber = tile.length;
        for (let i = 0; i < rowNumber; i++) {
            this.trackMatrix.push(new Array(columnNumber));
            for (let j = 0; j < columnNumber; ++j) {
                const type = tile[i][j];
                if (type !== 0 && type <= 6) {
                    const track = instantiate(this.trackPrefab!);
                    const trackComp = track.getComponent(TrackNode);
                    this.trackMatrix[i][j] = trackComp;
                    trackComp!.spriteFrame = this.trackSpriteFrames[tile[i][j] - 1];
                    track.setParent(this.node);
                    track.layer = uiLayer;
                    track.position = new Vec3((j - columnNumber / 2) * this.tileSize + this.tileSize / 2, (i - rowNumber / 2) * this.tileSize + this.tileSize / 2, 0 );
                } else if (type > 6) {
                    const switcher = instantiate(this.switcherPrefab!);
                    const switcherComp = switcher.getComponent(SwitchNode);
                    switcherComp!.spriteFrameArray = this.trackSpriteFrames.filter((val, index) => -1 != configurations.switchers[type].options.indexOf(index + 1));
                    switcherComp!.spriteFrame = this.trackSpriteFrames[configurations.switchers[type].default - 1];
                    this.trackMatrix[i][j] = switcherComp;
                    switcher.setParent(this.node);
                    switcher.layer = uiLayer;
                    switcher.position = new Vec3((j - columnNumber / 2) * this.tileSize + this.tileSize / 2, (i - rowNumber / 2) * this.tileSize + this.tileSize / 2, 0 );
                }
            }
        }
        const trackMatrix = this.trackMatrix;
        for (let i = 0; i < rowNumber; i++) {
            for (let j = 0; j < columnNumber; ++j) {
                const track = this.trackMatrix[i][j];
                if (!track) continue;
                if (track instanceof SwitchNode) {
                    const type = tile[i][j];
                    const top = trackMatrix[i - 1]?.[j];
                    const bottom = trackMatrix[i + 1]?.[j];
                    const left = trackMatrix[i]?.[j - 1];
                    const right = trackMatrix[i]?.[j + 1];
                    const switcher = configurations.switchers[type];
                    for (let k = 0; k < switcher.options.length; k++) {
                        const option = switcher.options[k];
                        switch (option) {
                            case 1: {
                                track.switchList.push(left!.node);
                                track.switchList.push(right!.node);
                                break;
                            }
                            case 2: 
                                track.switchList.push(top!.node);
                                track.switchList.push(bottom!.node);
                                break;
                                
                            case 3: 
                                track.switchList.push(right!.node);
                                track.switchList.push(bottom!.node);
                                break; 
                            case 4:
                                track.switchList.push(left!.node);
                                track.switchList.push(bottom!.node);
                                break;
                            case 5:
                                track.switchList.push(top!.node);
                                track.switchList.push(right!.node);
                                break;  
                            case 6:
                                track.switchList.push(top!.node);
                                track.switchList.push(left!.node);
                                break;
                                
                        }
                        track.reconnect();
                    }


                } else {
                    
                    const top = trackMatrix[i - 1]?.[j];
                    const bottom = trackMatrix[i + 1]?.[j];
                    const left = trackMatrix[i]?.[j - 1];
                    const right = trackMatrix[i]?.[j + 1];
                    if (top && !(top instanceof SwitchNode)) {
                        track.linkedNodes.push(top.node);
                    } 
                    if (bottom && !(bottom instanceof SwitchNode)) {
                        track.linkedNodes.push(bottom.node);
                    } 
                    if (left && !(left instanceof SwitchNode)) {
                        track.linkedNodes.push(left.node);
                    } 
                    if (right && !(right instanceof SwitchNode)) {
                        track.linkedNodes.push(right.node);
                    }
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
